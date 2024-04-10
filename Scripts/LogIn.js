import {onAuthStateChanged, signInWithEmailAndPassword} from "https://www.gstatic.com/firebasejs/10.4.0/firebase-auth.js";
import { auth } from '../Scripts/firebase.js';
import '../Scripts/SignUp.js';

var verificado;

const loginForm = document.querySelector("#login_form");
const Playgame = document.querySelector("#apple_game");
const home = document.querySelector(".home");
const nav = document.querySelector(".navega");
const Head = document.querySelector(".header");
const information = document.querySelector(".info");


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

onAuthStateChanged(auth, (user) => {

   
  console.log(user);

  if(user){
    
  verificado = user.emailVerified;

  console.log(verificado);
  if(verificado){

    console.log("verificacion exitosa");
  }

  }
  else{
    alert("Se necesita verificar Email");
  }
});