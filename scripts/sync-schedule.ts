import { fetchEventsAndGroupings, fetchLinkedInProfiles } from '../common/event-sheet';
import * as fs from 'fs';
import * as path from 'path';
require('dotenv').config();

const {
  GOOGLE_KEY, EVENT_SHEET_ID
} = process.env;

if (!GOOGLE_KEY) {
  throw new Error('GOOGLE_KEY must be specified as an environment variable');
} else if (!EVENT_SHEET_ID) {
  throw new Error('Sheet ID is required.');
} else {
  fetchAndSaveSchedule(GOOGLE_KEY, EVENT_SHEET_ID);
}

async function fetchAndSaveSchedule(googleKey: string, sheetId: string) {
  const [eventsAndGroupings, linkedInProfiles] = await Promise.all(
    [
      fetchEventsAndGroupings(googleKey, sheetId),
      fetchLinkedInProfiles(googleKey, sheetId)
    ]
  );

  fs.writeFileSync(
    path.join(__dirname, '..', 'aisc', 'static', 'data', `events.json`),
    JSON.stringify(eventsAndGroupings, null, 2)
  );
  console.log("Events written to disk.");

  fs.writeFileSync(
    path.join(__dirname, '..', 'aisc', 'static', 'data', `profiles.json`),
    JSON.stringify(linkedInProfiles, null, 2)
  );
  console.log("Profiles written to disk.");
}
