import { fetchEventsAndGroupings } from './common/event-sheet';
import * as functions from 'firebase-functions';


export const fetchEvents = functions.https.onCall(async (data, context) => {
  if (!context.auth) {
    throw new functions.https.HttpsError(
      'unauthenticated', 'The function must be called while authenticated.'
    );
  } else {
    const googleKey = functions.config().global_env.google_key;
    const allEvents = await fetchEventsAndGroupings(googleKey, false);
    return allEvents;
  }
});