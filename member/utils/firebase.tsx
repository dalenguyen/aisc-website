import firebase from 'firebase/app';
import 'firebase/functions';
import 'firebase/auth';
import Firebase from 'firebase';

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
    firebase.functions().useFunctionsEmulator('http://localhost:3600');
    firebase.auth().setPersistence(firebase.auth.Auth.Persistence.LOCAL);
  }

  return firebase;
}

export const authStateChecker = () => {
  let userLoaded = false;
  const firebase = ensureFirebase();
  return (auth: firebase.auth.Auth) => {
    return new Promise<firebase.User | null>((resolve, reject) => {
      if (userLoaded) {
        resolve(firebase.auth().currentUser);
      }
      const unsubscribe = auth.onAuthStateChanged(user => {
        userLoaded = true;
        unsubscribe();
        resolve(user);
      }, reject);
    });
  }
}

