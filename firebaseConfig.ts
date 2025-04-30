// Import the functions you need from the SDKs you need
import { initializeApp, getApp, getApps } from "firebase/app";
import AsyncStorage from '@react-native-async-storage/async-storage';
import * as firebaseAuth from 'firebase/auth';
import  { 
  initializeAuth, 
  getAuth, 
} from 'firebase/auth';
import { getFirestore } from 'firebase/firestore';

// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

const reactNativePersistence = (firebaseAuth as any).getReactNativePersistence;

// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: "AIzaSyAXC7G83whHWCqof_g-g6HSXff5-DykRHU",
  authDomain: "sportybet-a49c0.firebaseapp.com",
  projectId: "sportybet-a49c0",
  storageBucket: "sportybet-a49c0.firebasestorage.app",
  messagingSenderId: "597952721790",
  appId: "1:597952721790:web:1e298c27b04a221a44b92f"
};

// Initialize Firebase
const app = getApps().length === 0 ? initializeApp(firebaseConfig) : getApp();

// Initialize Firestore
const db = getFirestore(app);

// Initialize Auth with AsyncStorage persistence
const auth = initializeAuth(app, {
  persistence: reactNativePersistence(AsyncStorage)
});

export { auth, db };


