// Import the functions you need from the SDKs you need
import {initializeApp} from "firebase/app";
import {getFirestore} from "firebase/firestore";
import { getStorage } from "firebase/storage";

// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
const firebaseConfig = {
    apiKey: "AIzaSyDe3GLThGOn7qOXrBTAE95h7H0YkRKGSgM",
    authDomain: "secret-tavern.firebaseapp.com",
    projectId: "secret-tavern",
    storageBucket: "secret-tavern.appspot.com",
    messagingSenderId: "475113990468",
    appId: "1:475113990468:web:40bf71fca06de651030f11"
};

// Initialize Firebase
const firebaseApp = initializeApp(firebaseConfig);
const db = getFirestore(firebaseApp)
const storage = getStorage(firebaseApp);

export {db, storage};