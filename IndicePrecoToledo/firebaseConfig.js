import { initializeApp } from 'firebase/app';
import { getFirestore } from 'firebase/firestore';
import { getAuth } from 'firebase/auth';

// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: "AIzaSyCwBwqzrNs8v6dZyY21uyOM4Pf38MscFvQ",
  authDomain: "indice-preco-exame-81fba.firebaseapp.com",
  projectId: "indice-preco-exame-81fba",
  storageBucket: "indice-preco-exame-81fba.appspot.com",
  messagingSenderId: "495949392175",
  appId: "1:495949392175:web:3c69f50cf76c1f63da59da"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const db = getFirestore(app);
const auth = getAuth(app);

export { db, auth };
