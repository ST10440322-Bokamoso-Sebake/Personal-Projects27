import { initializeApp } from 'firebase/app';
import { getAuth } from 'firebase/auth';
import { getFirestore } from 'firebase/firestore';

// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: "AIzaSyATrwJ2qkWxgNtP3IfgEXXC8mnaGvL08P0",
  authDomain: "student-task-management-779a1.firebaseapp.com",
  projectId: "student-task-management-779a1",
  storageBucket: "student-task-management-779a1.firebasestorage.app",
  messagingSenderId: "403229602572",
  appId: "1:403229602572:web:c800fa933db2c90da54f29"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);

// Initialize Firebase Authentication and get a reference to the service
export const auth = getAuth(app);

// Initialize Cloud Firestore and get a reference to the service
export const db = getFirestore(app);

export default app;

