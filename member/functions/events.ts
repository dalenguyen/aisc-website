import { fetchEventsAndGroupings } from './common/event-sheet';
import { AllEvents, PublicEvent } from './common/types';
import * as functions from 'firebase-functions';
import * as admin from 'firebase-admin';
import * as LRU from 'lru-cache';
import { EventId } from '../../common/types';
import assert from 'assert';
import { getEventId } from '../../common/event';

const cache = new LRU<string, AllEvents>({
  max: 1,
  maxAge: 1000 * 30
});

async function getUserProfile(uid: string): Promise<any> {
  const db = admin.firestore();
  const profile = await db.collection("users").doc(uid).get();
  return profile.data() || {};
}

export const fetchEvents = functions.https.onCall(async (_, context) => {
  await assertAuth(context);
  return await getMaybeCachedAllEvents();
});

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

export const fetchSingleEvent = functions.https.onCall(async ({ id }: { id: string }, context) => {
  await assertAuth(context);
  assert(id, "Event ID is required");
  const allEvents = await getMaybeCachedAllEvents();
  return extractEvent(id, allEvents);
});


function extractEvent(id: EventId, allEvents: AllEvents) {
  const { pastEvents, futureEvents } = allEvents;
  const idMatch = (ev: PublicEvent) => getEventId(ev) === id;
  return pastEvents.find(idMatch) || futureEvents.find(idMatch);
}

async function assertAuth(context: functions.https.CallableContext) {
  if (!context.auth) {
    throw new functions.https.HttpsError(
      'unauthenticated', 'The function must be called while authenticated.'
    );
  } else {
    const profile = await getUserProfile(context.auth.uid);
    if (!profile.roles || profile.roles.indexOf('member') < 0) {
      throw new functions.https.HttpsError(
        'unauthenticated', 'Non-members cannot view event details.'
      );
    }
  }
}
