import { initializeApp } from 'firebase/app';
import { getAuth } from 'firebase/auth';
import { getFirestore } from 'firebase/firestore';

const firebaseConfig = {
  apiKey: "AIzaSyCRM4EHWDPBJ4tbXi_7kf7zwIZ7auhTAEw",
  authDomain: "qwerts-typinggame.firebaseapp.com",
  projectId: "qwerts-typinggame",
  storageBucket: "qwerts-typinggame.appspot.com", 
  messagingSenderId: "966026477568",
  appId: "1:966026477568:web:e035d28a1725c8efd818e5",
  measurementId: "G-7G1QK48DVD"
};

const app = initializeApp(firebaseConfig);

const auth = getAuth(app);
const db = getFirestore(app);

export { auth, db };