import {
  getAuth,
  signInWithEmailAndPassword
} from "firebase/auth";

import app from '../firebase';
import { getStorage, ref, uploadBytes, getDownloadURL } from "firebase/storage";
import { doc, getDoc, getFirestore, addDoc, collection, getDocs } from "firebase/firestore";

const db = getFirestore(app);
const storage = getStorage();

const URL_SERVER = 'http://localhost:8000';

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

export async function getTableData() {
  const collectionRef = collection(db, 'feedbacks');
  const docs = await getDocs(collectionRef);
  return docs.docs.map(doc => {
    const { comment, rating, url, filename, user } = doc.data();
    return [ rating, comment, <a href={url}>{filename}</a>, user || 'Anónimo' ];
  });
}


export async function uploadPrediction(params) {
  const { filename, blob, comment, rating, user } = params;
  const refPath = `segmentations/${filename}`;
  const fileRef = ref(storage, refPath);

  const metadata = {
    'Content-Type': 'application/x-zip-compressed'
  };

  try {
    await uploadBytes(fileRef, blob, metadata);

    const downloadRef = ref(storage, refPath);
    const url = await getDownloadURL(downloadRef);
    const data = { filename, comment, rating, url, user };

    await addDoc(collection(db, 'feedbacks'), data);
    return true;
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
