/*
import{ID} from '../Scripts/LogIn.js'
import { db } from '../Scripts/firebase.js';
import { doc, collection, setDoc, getDoc} from "https://www.gstatic.com/firebasejs/10.10.0/firebase-firestore.js";


import { initializeApp } from "https://www.gstatic.com/firebasejs/10.10.0/firebase-app.js";
     
import { getFirestore, collection, getDoc, setDoc, doc } from 'https://www.gstatic.com/firebasejs/10.10.0/firebase-firestore.js';
     
   // TODO: Add SDKs for Firebase products that you want to use
   // https://firebase.google.com/docs/web/setup#available-libraries
   
   const firebaseConfig = {
  apiKey: "AIzaSyC-UmsTvS1T2TtylW2iO1L6QdJMgVoE404",
  authDomain: "piggiesnft-f8f92.firebaseapp.com",
  projectId: "piggiesnft-f8f92",
  storageBucket: "piggiesnft-f8f92.appspot.com",
  messagingSenderId: "685356249153",
  appId: "1:685356249153:web:14c0840e89528ca37396c0"
};

   const app = initializeApp(firebaseConfig);
   const db = getFirestore(app);
*/
let state;


window.addEventListener('message', function (event) {
  if (event.data.type === 'updateScore') {
   const nuevoPuntaje = event.data.score;

    console.log('Puntaje actualizado en el receptor:', nuevoPuntaje );
     state=nuevoPuntaje
     sessionStorage.setItem('Puntaje', state);
   
    // Actualiza tu puntaje en la interfaz gráfica o en cualquier otro lugar necesario
    const scoreUpdatedEvent = new CustomEvent('scoreUpdated', { detail: { score: state } });
    window.dispatchEvent(scoreUpdatedEvent);
  }

  
});

console.log("State: "+ state);


/*
        const docRef = doc(db, "users", "TnavF2TCAXR43649sqAkteTSo552");
        const docSnap = await getDoc(docRef);
    
    if (docSnap.exists()) {
           
      const UserName= docSnap.data().score;
      let Tiquets = UserName + nuevoPuntaje;
      try {

            
            await setDoc(docRef, { score: Tiquets }, { merge: true });
           
        
            console.log("Document written with ID: ", doc.id);
          } catch (e) {
            console.error("Error adding document: ", e);
          }

      console.log("Document data:", docSnap.data().score);

      console.log("Tiquets: ", Tiquets);
    } else {
      // docSnap.data() will be undefined in this case
      console.log("No such document!");
    }



   const script = document.createElement('script');
    script.src = 'come_Apple.js';
    document.body.appendChild(phaser, script);
    */