import { getAuth } from "firebase/auth";
import { initializeApp } from "firebase/app";
import { getFirestore } from "firebase/firestore";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: "AIzaSyCKvGzCpgaH3_XsWl0_T7TnrOwJpQ_fKMs",
  authDomain: "task-manager-29d5a.firebaseapp.com",
  projectId: "task-manager-29d5a",
  storageBucket: "task-manager-29d5a.appspot.com",
  messagingSenderId: "360979078885",
  appId: "1:360979078885:web:7b4f8091a1592004647e0c",
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
export const db = getFirestore(app)
export const auth = getAuth();