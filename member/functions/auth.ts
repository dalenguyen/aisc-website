import * as functions from 'firebase-functions';
import * as admin from 'firebase-admin';

const UID = "123456";


export const initializeAuth = functions.https.onRequest(async (req, res) => {
  admin.initializeApp();
  const token = await admin.auth().createCustomToken(UID);
  res.json({
    token
  });
});