import { FirebaseApp, initializeApp } from "firebase/app";
import { Firestore, getFirestore } from "firebase/firestore";
import {
  initializeAuth,
  getReactNativePersistence,
} from "firebase/auth/react-native";
import AsyncStorage from "@react-native-async-storage/async-storage";

// Config data exposed but db has security measures implemented
// Only signed up users can read/write specific data
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

const app: FirebaseApp = initializeApp(firebaseConfig);

export const db: Firestore = getFirestore(app);

export const auth = initializeAuth(app, {
  persistence: getReactNativePersistence(AsyncStorage),
});
