
import { initializeApp } from "firebase/app";
import { getAuth } from "firebase/auth";
import {getFirestore} from 'firebase/firestore';


const firebaseConfig = {
    apiKey: "AIzaSyBjsaU87sgr2eYcmUOSjW_JmzLBBd-AoeE",
    authDomain: "cards-game-7c576.firebaseapp.com",
    projectId: "cards-game-7c576",
    storageBucket: "cards-game-7c576.firebasestorage.app",
    messagingSenderId: "542155533776",
    appId: "1:542155533776:web:f2155776a65cd87ab31dd5"
};

export const app = initializeApp(firebaseConfig);
export const database = getFirestore(app);
export const auth = getAuth(app)
