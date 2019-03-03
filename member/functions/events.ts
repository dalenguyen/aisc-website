import { fetchEventsAndGroupings } from './common/event-sheet';
import * as functions from 'firebase-functions';


export const fetchEvents = functions.https.onCall(async (data, context) => {
  const googleKey = functions.config().global_env.google_key;
  const allEvents = await fetchEventsAndGroupings(googleKey);
  return allEvents;
});