import firebase from 'firebase/app';
import 'firebase/functions';
import 'firebase/auth';
import 'firebase/firestore';
import getConfig from 'next/config'
const { publicRuntimeConfig: { FB_BASE } } = getConfig()

// if (!FB_BASE) {
//   throw new Error("FB_BASE variable must be specified.");
// }

export const ensureFirebase = () => {
  if (firebase.apps.length === 0) {

    const config = {
      apiKey: "AIzaSyBtiVuEp_B46gEiI-O3aGjt_5Rx_CCwnfQ",
      authDomain: "central-splice-231701.firebaseapp.com",
      databaseURL: "https://central-splice-231701.firebaseio.com",
      projectId: "central-splice-231701",
      storageBucket: "central-splice-231701.appspot.com",
      messagingSenderId: "885891444833"
    };
    firebase.initializeApp(config);
    if (typeof window !== 'undefined') {
      if (FB_BASE) {
        firebase.functions().useFunctionsEmulator(FB_BASE);
      }
      firebase.auth().setPersistence(firebase.auth.Auth.Persistence.SESSION);
    }
  }

  return firebase;
}

export const authStateChecker = () => {
  let userLoaded = false;
  const firebase = ensureFirebase();
  return (auth: firebase.auth.Auth) => {
    return new Promise<firebase.auth.Auth | null>((resolve, reject) => {
      if (userLoaded) {
        const auth = firebase.auth();
        resolve(auth);
      }
      const unsubscribe = auth.onAuthStateChanged(() => {
        userLoaded = true;
        unsubscribe();
        resolve(firebase.auth());
      }, reject);
    });
  }
}

