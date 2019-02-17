require('dotenv').config();
const fs = require('fs');
const path = require('path');
const moment = require('moment-timezone');

const fetch = require('isomorphic-unfetch');

const {
  STEER_CO_PATH = 'steerco',
  GOOGLE_KEY = 'AIzaSyAUMihCUtNS35espxycitPYrTE_78W93Ps'
} = process.env;


fetchAndSaveSchedule();

async function fetchAndSaveSchedule() {
  const [eventsAndGroupings, linkedInProfiles] = await Promise.all(
    [
      fetchEventsAndGroupings(), fetchLinkedInProfiles()
    ]
  );

  fs.writeFileSync(
    path.join(__dirname, '..', 'tdls', 'static', 'data', `events.json`),
    JSON.stringify(eventsAndGroupings, null, 2)
  );
  console.log("Events written to disk.");

  fs.writeFileSync(
    path.join(__dirname, '..', 'tdls', 'static', 'data', `profiles.json`),
    JSON.stringify(linkedInProfiles, null, 2)
  );
  console.log("Profiles written to disk.");
}

async function getRawEventData() {
  const SHEET_ID = '1WghUEANwzE1f8fD_sdTvM9BEmr1C9bZjPlFSIJX9iLE';
  const SHEET_VALUE_URL = `https://sheets.googleapis.com/v4/spreadsheets/${SHEET_ID}/values/Schedule?key=${GOOGLE_KEY}`;

  // get raw sheet data in JSON
  const resp = await fetch(SHEET_VALUE_URL, {
    method: 'GET',
    cache: 'default'
  });
  const raw = await resp.json();
  return raw;
}

async function getRawLinkedInData() {
  const SHEET_ID = '1WghUEANwzE1f8fD_sdTvM9BEmr1C9bZjPlFSIJX9iLE';
  const SHEET_VALUE_URL = `https://sheets.googleapis.com/v4/spreadsheets/${SHEET_ID}/values/Profiles?key=${GOOGLE_KEY}`;

  // get raw sheet data in JSON
  const resp = await fetch(SHEET_VALUE_URL, {
    method: 'GET',
    cache: 'default'
  });
  const raw = await resp.json();
  return raw;
}

function rawRowToRow(rawHeader, rawRow) {
  const title = rawRow[rawHeader.indexOf('Title')];
  const why = rawRow[rawHeader.indexOf('Why')];
  const venue = rawRow[rawHeader.indexOf('Venue')];
  const lead = rawRow[rawHeader.indexOf('Lead')];
  const video = rawRow[rawHeader.indexOf('Youtube Link')];
  const paper = rawRow[rawHeader.indexOf('Paper Reference')];
  const slides = rawRow[rawHeader.indexOf('Slides Link')];
  const facilitators = [];
  const fac1 = rawRow[rawHeader.indexOf('Facilitator 1')];
  const fac2 = rawRow[rawHeader.indexOf('Facilitator 2')];
  // broadly speaking, a question mark indicates uncertainty
  if (fac1 && fac1.indexOf('?') < 0) { facilitators.push(fac1) }
  if (fac2 && fac2.indexOf('?') < 0) { facilitators.push(fac2) }

  const dataset1 = rawRow[rawHeader.indexOf('Dataset Link 1')];
  const dataset2 = rawRow[rawHeader.indexOf('Dataset Link 2')];
  const code_official = rawRow[rawHeader.indexOf('Official Github Link')];
  const code_unofficial = rawRow[rawHeader.indexOf('Unofficial Github Link')];
  const reddit = rawRow[rawHeader.indexOf('Reddit Link')];
  const type = rawRow[rawHeader.indexOf('Stream')];
  const subjects = (rawRow[rawHeader.indexOf('Subject Matter Area')] || '').split(',').map(s => s.trim()).filter(s => s);

  const dateAtMidnight = moment.tz((rawRow[rawHeader.indexOf('Date')] || '').replace(/\./g, '').replace(/\-/g, ' '), "UTC").toDate();
  const dateAtSixThirty = new Date(dateAtMidnight.getTime() + ((5 + 18) * 60 + 30) * 60 * 1000);

  return {
    title,
    why,
    date: dateAtSixThirty.getTime(),
    lead,
    venue,
    facilitators,
    subjectMatterArea: rawRow[rawHeader.indexOf('Subject Matter Area')],
    video,
    type,
    paper,
    slides,
    subjects,
    dataset1,
    dataset2,
    code_unofficial,
    code_official,
    reddit
  }
}


function splitEvents(events) {
  // split into the past and future
  let past = [];
  let future = [];
  events.forEach(e => {
    if (!eventExpired(e)) { future.push(e); }
    else { past.push(e); }
  });
  past = past.sort((e1, e2) => e2.date - e1.date);
  future = future.sort((e1, e2) => e1.date - e2.date);
  // hide venue
  future = future.map(({ venue, ...hiddenEv }) => hiddenEv);
  return [past, future];
}

function eventExpired(ev) {
  return ev && ev.date < new Date().getTime();
}


async function fetchLinkedInProfiles() {
  const data = await getRawLinkedInData();
  const linkedInProfileByName = {};
  const [rawHeader, ...rawRows] = data.values;
  rawRows.forEach(r => {
    const name = r[rawHeader.indexOf('Name')];
    const link = r[rawHeader.indexOf('LinkedIn')];
    if (link) {
      linkedInProfileByName[name.trim()] = link.trim();
    }
  });
  return linkedInProfileByName;
};

async function fetchEventsAndGroupings() {
  const data = await getRawEventData();
  const [rawHeader, ...rawRows] = data.values;

  // convert raw JSON rows to our own event data type
  const events = rawRows.map(
    rawR => rawRowToRow(rawHeader, rawR)).filter(
      //only care about rows that have both title and lead
      e => e.title && e.lead
    );
  const [pastEvents, futureEvents] = splitEvents(events);

  const subjects = pastEvents.reduce((subjects, ev) => {
    const newSubjects = [];
    for (let sub of ev.subjects) {
      if (subjects.indexOf(sub) < 0) {
        newSubjects.push(sub);
      }
    }
    return subjects.concat(newSubjects);
  }, []);

  const streams = pastEvents.reduce((streams, ev) => {
    const newStreams = [];
    if (streams.indexOf(ev.type) < 0) {
      newStreams.push(ev.type);
    }
    return streams.concat(newStreams);
  }, []);

  return { pastEvents, futureEvents, subjects, streams };
}
