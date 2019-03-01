import { fetchEventsAndGroupings, fetchLinkedInProfiles } from '../common/event-sheet';
import * as fs from 'fs';
import * as path from 'path';
require('dotenv').config();

const {
  GOOGLE_KEY
} = process.env;

if (!GOOGLE_KEY) {
  throw new Error('GOOGLE_KEY must be specified as an environment variable');
} else {
  fetchAndSaveSchedule(GOOGLE_KEY);
}

async function fetchAndSaveSchedule(googleKey: string) {
  const [eventsAndGroupings, linkedInProfiles] = await Promise.all(
    [
      fetchEventsAndGroupings(googleKey), fetchLinkedInProfiles(googleKey)
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
