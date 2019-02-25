import { PublicEvent, MemberEvent } from './types';
require('dotenv').config();
import * as moment from 'moment-timezone';
const fetch = require('isomorphic-unfetch');


const {
  // STEER_CO_PATH = 'steerco',
  GOOGLE_KEY
} = process.env;


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


function splitEvents(events: MemberEvent[]): PublicEvent[][] {
  // split into the past and future
  let past: PublicEvent[] = [];
  let future: MemberEvent[] = [];
  events.forEach(e => {
    if (!eventExpired(e)) { future.push(e); }
    else { past.push(e); }
  });
  past = past.sort((e1, e2) => e2.date - e1.date);
  future = future.sort((e1, e2) => e1.date - e2.date);
  // hide venue
  const futurePublic: PublicEvent[] = future.map(({ venue, ...hiddenEv }) => hiddenEv);
  return [past, futurePublic];
}


function eventExpired(ev: PublicEvent) {
  return ev && ev.date < new Date().getTime();
}


export async function fetchEventsAndGroupings() {
  const data = await getRawEventData();
  const [rawHeader, ...rawRows]:
    [string[], ...{ [k: string]: string }[]] = data.values;

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
  }, [] as string[]);

  const streams = pastEvents.reduce((streams, ev) => {
    const newStreams = [];
    if (streams.indexOf(ev.type) < 0) {
      newStreams.push(ev.type);
    }
    return streams.concat(newStreams);
  }, [] as string[]);


  return { pastEvents, futureEvents, subjects, streams };
}


export async function fetchLinkedInProfiles() {
  const data = await getRawLinkedInData();
  const linkedInProfileByName: { [k: string]: string } = {};
  const [rawHeader, ...rawRows] = data.values;
  rawRows.forEach((r: { [k: string]: string }) => {
    const name = r[rawHeader.indexOf('Name')];
    const link = r[rawHeader.indexOf('LinkedIn')];
    if (link) {
      linkedInProfileByName[name.trim()] = link.trim();
    }
  });
  return linkedInProfileByName;
};


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


function rawRowToRow(rawHeader: string[], rawRow: { [k: string]: string }): MemberEvent {
  const title = rawRow[rawHeader.indexOf('Title')];
  const acronym = rawRow[rawHeader.indexOf('Memorable Acronym')];
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
    video,
    type,
    paper,
    slides,
    subjects,
    dataset1,
    dataset2,
    code_unofficial,
    code_official,
    reddit,
    acronym
  }
}

