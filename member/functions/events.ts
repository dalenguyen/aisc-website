import { fetchEventsAndGroupings } from '../../common/event-sheet';
import * as functions from 'firebase-functions';

export const fetchEvents = functions.https.onRequest(async (req, res) => {
  const googleKey = functions.config().global_env.google_key;
  const allEvents = await fetchEventsAndGroupings(googleKey);
  res.json(allEvents);
});