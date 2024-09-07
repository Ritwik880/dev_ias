import { initializeApp } from "firebase/app";
import { getAuth } from "firebase/auth";

// Your web app's Firebase configuration
const firebaseConfig = {
    apiKey: "AIzaSyAswyfpTYk2p038G_TF5SWxP7o4x2_BTEU",
    authDomain: "phoneauthentication-d6606.firebaseapp.com",
    projectId: "phoneauthentication-d6606",
    storageBucket: "phoneauthentication-d6606.appspot.com",
    messagingSenderId: "258406108590",
    appId: "1:258406108590:web:bc5639b5c00de3bd5c0c3f"
};

const app = initializeApp(firebaseConfig);
export const auth = getAuth(app);