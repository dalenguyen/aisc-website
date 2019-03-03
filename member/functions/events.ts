import { fetchEventsAndGroupings } from './common/event-sheet';
import * as functions from 'firebase-functions';
import * as admin from 'firebase-admin';

async function getUserProfile(uid: string): Promise<any> {
  const db = admin.firestore();
  const profile = await db.collection("users").doc(uid).get();
  return profile.data() || {};
}

export const fetchEvents = functions.https.onCall(async (data, context) => {
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

    const googleKey = functions.config().global_env.google_key;
    if (!googleKey) {
      throw new Error("Google key is missing.");
    }
    const allEvents = await fetchEventsAndGroupings(googleKey, false);
    return allEvents;
  }
});