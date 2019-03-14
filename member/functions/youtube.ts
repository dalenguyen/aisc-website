import * as functions from 'firebase-functions';
import { assertRole } from './utils/auth';
import * as assert from 'assert';
import { fetchSingleEvent } from './events';

export const createLiveStreamEvent = async (
  { event_id: eventId }: { event_id: string }, context: functions.https.CallableContext) => {
  await assertRole(context, "admin");
  assert(eventId, "Event ID is required");
  const event = await fetchSingleEvent({ id: eventId }, context);
  console.log(event);
};