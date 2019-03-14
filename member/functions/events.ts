import { fetchEventsAndGroupings } from './common/event-sheet';
import { AllEvents, PublicEvent } from './common/types';
import * as functions from 'firebase-functions';
import * as LRU from 'lru-cache';
import { EventId } from '../../common/types';
import * as assert from 'assert';
import { getEventId } from '../../common/event';
import { assertRole as assertRole } from './utils/auth';

const cache = new LRU<string, AllEvents>({
  max: 1,
  maxAge: 1000 * 30
});

export const fetchEvents = async (
  _, context: functions.https.CallableContext) => {
  await assertRole(context, "member");
  return await getMaybeCachedAllEvents();
};

export const fetchSingleEvent = async (
  { id }: { id: string },
  context: functions.https.CallableContext) => {
  await assertRole(context, "admin");
  assert(id, "Event ID is required");
  const allEvents = await getMaybeCachedAllEvents();
  return extractEvent(id, allEvents);
};

async function getMaybeCachedAllEvents() {
  const cached = cache.get('default');
  if (cached) {
    return cached;
  } else {
    console.info("Fetching event info...");
    const googleKey = functions.config().global_env.google_key;
    const sheetId = functions.config().global_env.event_sheet_id;
    if (!googleKey) {
      throw new Error("Google key is missing.");
    }
    const allEvents = await fetchEventsAndGroupings(googleKey, sheetId, false);
    cache.set('default', allEvents);
    return allEvents;
  }
}


function extractEvent(id: EventId, allEvents: AllEvents) {
  const { pastEvents, futureEvents } = allEvents;
  const idMatch = (ev: PublicEvent) => getEventId(ev) === id;
  return pastEvents.find(idMatch) || futureEvents.find(idMatch);
}
