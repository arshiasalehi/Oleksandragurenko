import { initializeApp } from "firebase/app";
import { getFirestore } from "firebase/firestore";
import { getAuth } from "firebase/auth";

const firebaseConfig = {
  apiKey: "AIzaSyAHnYjvg-cyX0zntn0xXlyGlTqe6Zd5pKc",
  authDomain: "sasha-92c10.firebaseapp.com",
  projectId: "sasha-92c10",
  storageBucket: "sasha-92c10.appspot.com",
  messagingSenderId: "1054115414202",
  appId: "1:1054115414202:web:10ed16cb7e784f37ed0283"
};

const app = initializeApp(firebaseConfig);
const db = getFirestore(app);
const auth = getAuth(app);

export { db, auth };