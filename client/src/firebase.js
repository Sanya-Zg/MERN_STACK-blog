// Import the functions you need from the SDKs you need
import { initializeApp } from 'firebase/app';
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: import.meta.env.VITE_FIREBASE_API_KEY,
  authDomain: 'mern-stack-blog-ee2e4.firebaseapp.com',
  projectId: 'mern-stack-blog-ee2e4',
  storageBucket: 'mern-stack-blog-ee2e4.firebasestorage.app',
  messagingSenderId: '363821698292',
  appId: '1:363821698292:web:b7bcc95f9c40341fc762a1',
};

// Initialize Firebase
export const app = initializeApp(firebaseConfig);
