import {
  getAuth,
  signInWithEmailAndPassword
} from "firebase/auth";

import app from '../firebase';
import { doc, getDoc, getFirestore } from "firebase/firestore";

const db = getFirestore(app);

const URL_SERVER = 'https://2eb4-2001-1458-204-1-00-101-7780.eu.ngrok.io';

export async function login({ email, password }) {
  const auth = getAuth();
  try {
    const { user } = await signInWithEmailAndPassword(auth, email, password);

    const docRef = doc(db, "admins", user.email);
    const docSnap = await getDoc(docRef);

    user.admin = docSnap.exists();
    return user;
  } catch (error) {
    console.log(error);
    throw error;
  }
}


export async function sendFile({ mriT1, mriT2 }) {
  console.log('URL_SERVER', URL_SERVER);
  const url = new URL(URL_SERVER);
  url.pathname = '/api/v1/segmenter/predict';

  const formData = new FormData();
  formData.append('t1', mriT1);
  formData.append('t2', mriT2);

  console.log('Sending file to', url);

  try {
    const response = await fetch(url, {
      method: 'POST',
      body: formData,
      headers: {
        'access-control-expose-headers': '*',
      }
    });
    const filename = response.headers.get('filename');
    const blob = await response.blob();

    return {
      filename,
      blob,
    }
  } catch (error) {
    console.log(error);
  }
}
