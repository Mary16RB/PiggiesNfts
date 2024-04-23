import { initializeApp } from "https://www.gstatic.com/firebasejs/10.10.0/firebase-app.js";
import { getAuth } from "https://www.gstatic.com/firebasejs/10.10.0/firebase-auth.js";
import { getFirestore} from "https://www.gstatic.com/firebasejs/10.10.0/firebase-firestore.js";


    const firebaseConfig = {
    apiKey: "AIzaSyC-UmsTvS1T2TtylW2iO1L6QdJMgVoE404",
    authDomain: "piggiesnft-f8f92.firebaseapp.com",
    projectId: "piggiesnft-f8f92",
    storageBucket: "piggiesnft-f8f92.appspot.com",
    messagingSenderId: "685356249153",
    appId: "1:685356249153:web:14c0840e89528ca37396c0"
  };

  export const app = initializeApp(firebaseConfig);
  export const auth = getAuth(app);
  export const db = getFirestore(app);