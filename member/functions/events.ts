import { fetchEventsAndGroupings } from '../../common/event-sheet';
import * as functions from 'firebase-functions';

export const fetchEvents = functions.https.onRequest(async (req, res) => {
  const allEvents = await fetchEventsAndGroupings();
  res.json(allEvents);
});