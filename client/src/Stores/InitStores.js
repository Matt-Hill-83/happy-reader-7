import firebase from "@firebase/app";
import "@firebase/firestore";
import { initFirestorter, Collection, Document } from "firestorter";

firebase.initializeApp({
  // apiKey: "AIzaSyAslt8cmAwctNGvaf6BZLRwxINbtycf78I90210",
  // authDomain: "happy-reader-4.firebaseapp.com",
  // databaseURL: "https://happy-reader-4.firebaseio.com",
  projectId: "happy-reader-4"
  // storageBucket: "happy-reader-4.appspot.com"
});

initFirestorter({ firebase: firebase });


// This ensures that the stores are initiated first.
const test = 4;
export { test };
