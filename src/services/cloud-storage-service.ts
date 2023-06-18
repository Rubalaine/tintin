import { initializeApp } from "firebase/app";
import { getDatabase, ref, set, get, push } from "firebase/database";
import dotenv from "dotenv";
import { TODAY } from "../constant/any-constant";
import { IResult } from "../types/result";
import { FIREBASE } from "../constant/firebase-constant";

dotenv.config();

const firebaseConfig = {
  apiKey: process.env.FIREBASE_API_KEY,
  authDomain: process.env.FIREBASE_AUTH_DOMAIN,
  projectId: process.env.FIREBASE_PROJECT_ID,
  storageBucket: process.env.FIREBASE_STORAGE_BUCKET,
  messagingSenderId: process.env.FIREBASE_MESSAGING_SENDER_ID,
  appId: process.env.FIREBASE_APP_ID,
};

// Initialize Firebase
initializeApp(firebaseConfig);
const db = getDatabase();
const urlsRef = ref(db, FIREBASE.URLS);
const keywordsRef = ref(db, FIREBASE.KEYWORDS);
const resultsRef = ref(db, `${FIREBASE.RESULTS}/${TODAY}`);

export const getUrls = (): Promise<string[]> => {
  return get(urlsRef).then((snapshot) => {
    if (snapshot.exists()) {
      return snapshot.val()
    } else {
      return [];
    }
  });
};

export const getKeywords =(): Promise<string[]> => {
  return get(keywordsRef).then((snapshot) => {
    if (snapshot.exists()) {
      return snapshot.val()
    } else {
      return [];
    }
  });
};

export const saveResult = (result: IResult) =>{
  const newResultRef = push(resultsRef);
  set(newResultRef, result)
}
export const getTodayResults = (): Promise<IResult[]> =>{
  return get(resultsRef).then((snapshot)=>{
    if (snapshot.exists()) {
      const firebaseObject = snapshot.val();
      return Object.keys(firebaseObject).map(res => firebaseObject[res]);
    } else {
      return [];
    }
  })
}