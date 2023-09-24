// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getAuth } from "firebase/auth";
import { getFirestore } from "firebase/firestore";
import { getStorage } from "firebase/storage";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: "AIzaSyC0SylAcQqIEOzyJtyIMTwZlNcyrOCZq7g",
  authDomain: "discord-ytx.firebaseapp.com",
  projectId: "discord-ytx",
  storageBucket: "discord-ytx.appspot.com",
  messagingSenderId: "989795954408",
  appId: "1:989795954408:web:3369083d49e84a7ae4235d",
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const database = getFirestore(app);
const storage = getStorage(app);
const auth = getAuth(app);
export { auth, app, storage, database };
