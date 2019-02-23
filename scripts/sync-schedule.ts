const { fetchEventsAndGroupings, fetchLinkedInProfiles } = require('../common/event-sheet');

const fs = require('fs');
const path = require('path');


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
