import { initializeApp } from "firebase/app";

const firebaseConfig = {
  apiKey: "AIzaSyB-Vsqe6lAWl8aKzJtLpCGgi9bloUp1WFQ",
  authDomain: "mriseg.firebaseapp.com",
  projectId: "mriseg",
  storageBucket: "mriseg.appspot.com",
  messagingSenderId: "517653346163",
  appId: "1:517653346163:web:8b210328084ae1fc523706"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);

export default app;
