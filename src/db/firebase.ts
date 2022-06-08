import { initializeApp } from "firebase/app";
import { getFirestore } from "firebase/firestore";

// Config data exposed but db has security measures implemented
const firebaseConfig = {
  apiKey: "AIzaSyAVyKUWNIE_Za_ZkqWqfkVDipzU7WsS0xg",
  authDomain: "expense-tracker-ts-app-a2428.firebaseapp.com",
  databaseURL:
    "https://expense-tracker-ts-app-a2428-default-rtdb.firebaseio.com",
  projectId: "expense-tracker-ts-app-a2428",
  storageBucket: "expense-tracker-ts-app-a2428.appspot.com",
  messagingSenderId: "165008697907",
  appId: "1:165008697907:web:90b8f2c7879af6786f5146",
};

const app = initializeApp(firebaseConfig);

export const db = getFirestore(app);
