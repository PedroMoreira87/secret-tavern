// Import the functions you need from the SDKs you need
import {initializeApp} from "firebase/app";
import {getFirestore} from "firebase/firestore";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
const firebaseConfig = {
    apiKey: "AIzaSyDz-7zR9-cF8m7e3KfYlospOOqMaI-FRvA",
    authDomain: "metodosquantitativoscomputacao.firebaseapp.com",
    databaseURL: "https://metodosquantitativoscomputacao-default-rtdb.firebaseio.com",
    projectId: "metodosquantitativoscomputacao",
    storageBucket: "metodosquantitativoscomputacao.appspot.com",
    messagingSenderId: "906065750614",
    appId: "1:906065750614:web:671b27c689f4352c4be9f7"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const db = getFirestore(app)

export {db};
