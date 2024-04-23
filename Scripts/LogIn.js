import {onAuthStateChanged, signInWithEmailAndPassword} from "https://www.gstatic.com/firebasejs/10.4.0/firebase-auth.js";
import { auth, db } from '../Scripts/firebase.js';
import '../Scripts/SignUp.js';
import { doc, collection, setDoc, getDoc} from "https://www.gstatic.com/firebasejs/10.10.0/firebase-firestore.js"; 

var verificado;
export var ID;


const loginForm = document.querySelector("#login_form");
const Playgame = document.querySelector("#apple_game");
const home = document.querySelector(".home");
const nav = document.querySelector(".navega");
const Head = document.querySelector(".header");

const ticketScore = document.querySelector("#Score_ticks");
const information = document.querySelector(".info");

const UserName=   document.querySelector("#avatar_name");


loginForm.addEventListener('submit', async (e) => {
    e.preventDefault();

    const email =loginForm['usuario'].value;
    const pass =loginForm['contraseña'].value;
    console.log("Email: "+email, "Password: "+pass);
    
  
   if(verificado){
  try{
    const credecial = await  signInWithEmailAndPassword(auth, email, pass );

    console.log(credecial);
    home.classList.remove("show");
    home.classList.add("play");
    nav.classList.add("play");
    Playgame.classList.add("play");
    Head.classList.add("log");
    nav.classList.add("log");

    const docRef = doc(db, "users", ID);
    const docSnap = await getDoc(docRef);

if (docSnap.exists()) {

  UserName.innerHTML= docSnap.data().avatar;
  ticketScore .innerHTML=docSnap.data().score;

  console.log("Document data:", docSnap.data().avatar);
} else {
  // docSnap.data() will be undefined in this case
  console.log("No such document!");
}

  }
  catch(error){
    console.log(error);
     const errorCode = error.code;

     if(errorCode == 'auth/user-disabled'){
      alert("Este correo fue banneado");
     }
      else if(errorCode == 'auth/invalid-email'){
        alert("Este correo es invalido");

     } 
     else if(errorCode == 'auth/user-not-found'){
        alert("El usuario no existe");
     }
     else if(errorCode == 'auth/wrong-password'){
      alert("Incorrect password");
   }

  }
}
else{

  alert("correo no verifivado");
}

});

onAuthStateChanged(auth, async (user) => {

   
  console.log(user);

  if(user){
    
  verificado = user.emailVerified;

  const UserId = user.uid;
     console.log(UserId);

     ID= UserId;

     const docRef = doc(db, "users", ID);
     const docSnap = await getDoc(docRef);

     if (docSnap.exists()){
      
     console.log(docSnap.data().avatar);

     }
     else{

  try {
    const userCollectionRef = collection(db, "users");
    const docRef = await setDoc(doc(userCollectionRef, UserId), {
      avatar: "New User",
      score: 0
    });

    console.log("Document written with ID: ", doc.id);
  } catch (e) {
    console.error("Error adding document: ", e);
  }
}
  console.log(verificado);
  if(verificado){

    console.log("verificacion exitosa");
  }

  else{
    alert("Se necesita verificar Email");
  }
  }
});