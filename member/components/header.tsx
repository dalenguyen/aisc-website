import { Fragment, useEffect } from "react";
import firebase from 'firebase/app';
import 'firebase/auth'

import '../scss/sb-admin-2.scss';

export default () => {
  useEffect(() => {
    const config = {
      apiKey: "AIzaSyBtiVuEp_B46gEiI-O3aGjt_5Rx_CCwnfQ",
      authDomain: "central-splice-231701.firebaseapp.com",
      databaseURL: "https://central-splice-231701.firebaseio.com",
      projectId: "central-splice-231701",
      storageBucket: "central-splice-231701.appspot.com",
      messagingSenderId: "885891444833"
    };
    if (firebase.apps.length === 0) {
      firebase.initializeApp(config);
    }
  }, []);

  return null;
}