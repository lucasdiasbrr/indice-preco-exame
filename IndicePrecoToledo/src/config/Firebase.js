// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getFirestore } from "firebase/firestore";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

const firebaseConfig = {
  apiKey: "AIzaSyBl2PWyBz0HI1JLIAIBINaMxIsET-y-AGQ",
  authDomain: "indice-preco.firebaseapp.com",
  projectId: "indice-preco",
  storageBucket: "indice-preco.appspot.com",
  messagingSenderId: "1079345234679",
  appId: "1:1079345234679:web:93bfd3e6ed3fcd454c89f2"
};

const app = initializeApp(firebaseConfig);
const db = getFirestore(app);

export { app, db };