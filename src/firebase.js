import { initializeApp } from "firebase/app";
import { getAuth, onAuthStateChanged } from "firebase/auth";

//redux
import { store } from "./redux/store";
import { setUser, clearUser } from "./redux/authSlice";

const firebaseConfig = {
  apiKey: import.meta.env.VITE_API_KEY,
  authDomain: import.meta.env.VITE_AUTH_DOMAIN,
  projectId: import.meta.env.VITE_PROJECT_ID,
  storageBucket: import.meta.env.VITE_STORAGE_BUCKET,
  messagingSenderId: import.meta.env.VITE_MESSAGING_SENDER_ID,
  appId: import.meta.env.VITE_APP_ID,
  databaseURL: import.meta.env.VITE_DATABASE_URL
};

export const app = initializeApp(firebaseConfig);
const auth = getAuth(app);

onAuthStateChanged(auth, (user) => {
  if (user) {
    const userData = {
      accessToken: user.accessToken,
      uid: user.uid,
      email: user.email,
      displayName: user.displayName,
    }    
    store.dispatch(setUser(userData))
  }
  else {
    store.dispatch(clearUser())
  }
})
