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
      apiKey: "AIzaSyDKE-KzqzCm97SO4tUbtdQmoa1pgGMUQwc",
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
      firebase.auth().setPersistence(firebase.auth.Auth.Persistence.LOCAL);
    }
  }

  return firebase;
}

export const authStateChecker = () => {
  let currUser: firebase.User | null = null;
  const firebase = ensureFirebase();

  firebase.auth().onAuthStateChanged((user) => {
    currUser = user;
  }, (error) => {
    console.error(error);
  });

  const waitOnAuth = () => {
    return new Promise<firebase.User | null>((resolve, reject) => {
      if (currUser) {
        resolve(currUser);
      } else {
        const unsubscribe = firebase.auth().onAuthStateChanged((user) => {
          unsubscribe();
          resolve(user);
        }, reject);
      }
    });
  }

  const getAuth = async () => {
    return firebase.auth();
  }

  const logout = async () => {
    await firebase.auth().signOut();
  }

  return { waitOnAuth, getAuth, logout }
}

