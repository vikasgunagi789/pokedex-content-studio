
import { initializeApp } from "firebase/app";
import { getFirestore } from "firebase/firestore";

const firebaseConfig = {
  apiKey: "AIzaSyArFWFUBiujeGGR3LOc25kzijXC6ykW-gA",
  authDomain: "vg-pokestudio.firebaseapp.com",
  projectId: "vg-pokestudio",
  storageBucket: "vg-pokestudio.firebasestorage.app",
  messagingSenderId: "744489182908",
  appId: "1:744489182908:web:aac6a183a99027f493d2b9",
};

const app = initializeApp(firebaseConfig);

export const db = getFirestore(app);
