// Import the functions you need from the SDKs you need
import { initializeApp, FirebaseApp, getApp } from 'firebase/app';
import 'firebase/auth';

export let app: FirebaseApp;

// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
  apiKey: import.meta.env.VITE_API_KEY,
  authDomain: import.meta.env.VITE_AUTH_DOMAIN,
  projectId: import.meta.env.VITE_PROJECT_ID,
  storageBucket: import.meta.env.VITE_STORAGE_BUCKET,
  messagingSenderId: import.meta.env.VITE_MESSAGIN_SENDER_ID,
  appId: import.meta.env.VITE_APP_ID,
  measurementId: import.meta.env.VITE_MEASUREMENT_ID,
};

try {
  app = getApp('app');
} catch (error) {
  app = initializeApp(firebaseConfig, 'app');
}

// Initialize Firebase
const firebase = initializeApp(firebaseConfig);

export default firebase;
