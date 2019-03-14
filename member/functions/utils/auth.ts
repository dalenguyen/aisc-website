import * as functions from 'firebase-functions';
import * as admin from 'firebase-admin';

export type Role = "member" | "admin" | "general";

export async function assertAuth(context: functions.https.CallableContext) {
  if (!context.auth) {
    throw new functions.https.HttpsError(
      'unauthenticated', 'The function must be called while authenticated.'
    );
  }
}

export async function assertRole(context: functions.https.CallableContext, role: Role) {
  assertAuth(context);
  const profile = await getUserProfile(context.auth.uid);
  if (!profile.roles || profile.roles.indexOf(role) < 0) {
    throw new functions.https.HttpsError(
      'unauthenticated', `Only users with ${role} is allowed.`
    );
  }
}

async function getUserProfile(uid: string): Promise<any> {
  const db = admin.firestore();
  const profile = await db.collection("users").doc(uid).get();
  return profile.data() || {};
}