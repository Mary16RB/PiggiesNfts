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
const Seccion= document.querySelector("body");
const Inicio= document.querySelector("#logo");

const ticketScore = document.querySelector("#Score_ticks");
const LBmoney =document.querySelector('#Score_money');
const information = document.querySelector(".info");
const login = document.querySelector(".login");

const BoxTask= document.querySelector(".box_task");
const BTCoin= document.querySelector("#bt_Coin");
const LBcoin =document.querySelector('#Coin-10');

const UserName=   document.querySelector("#avatar_name");
let token;
let coins=10;

loginForm.addEventListener('submit', async (e) => {
    e.preventDefault();

    const email =loginForm['usuario'].value;
    const pass =loginForm['contraseña'].value;
    console.log("Email: "+email, "Password: "+pass);
    
  
   if(verificado){
  try{
    const credecial = await  signInWithEmailAndPassword(auth, email, pass );

    console.log(credecial);
    

    const docRef = doc(db, "users", ID);
    const docSnap = await getDoc(docRef);

if (docSnap.exists()) {

  token= 1;

  let authToken = token;

  let local=localStorage.setItem("authToken", authToken);
  console.log("login: "+local);

  UserName.innerHTML= docSnap.data().avatar;
  ticketScore .innerHTML=docSnap.data().score;
  LBmoney.innerHTML=docSnap.data().moneda; 

  home.classList.remove("show");
    home.classList.add("play");
    nav.classList.add("play");
    Playgame.classList.add("play");
    Head.classList.add("log");
    nav.classList.add("log");
    login.classList.add("active");
    Seccion.classList.add("off");

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

  alert("correo no verificado");
}

});

onAuthStateChanged(auth, async (user) => {

   
  console.log(user);

  if(user){
    const verifica= user.emailVerified;
    verificado = verifica;

  const UserId = user.uid;
     console.log(UserId);

     ID= UserId;

  console.log(verificado);
  
  if(verificado){
    
    checkAuth();
    console.log("verificacion exitosa");
  }

  else{
    alert("Se necesita verificar Email");
  }
  }
});

async function checkAuth() {
  let authToken = localStorage.getItem("authToken");

  let currentPage = sessionStorage.getItem("currentPage");
  
   console.log("login2: "+authToken);

  if (authToken==1) {
      const docRef = doc(db, "users", ID);
      const docSnap = await getDoc(docRef);

  UserName.innerHTML= docSnap.data().avatar;
  ticketScore .innerHTML=docSnap.data().score;
  LBmoney.innerHTML=docSnap.data().moneda; 
  let labelClaim = docSnap.data().claim;
   console.log("claim: "+labelClaim);

  home.classList.remove("show");
  nav.classList.add("play");
  Head.classList.add("log");
  nav.classList.add("log");
  login.classList.add("active");
  Seccion.classList.add("off");

  switch(currentPage){
    
    case "apple_game":
      nav.classList.remove("press_rank");
        nav.classList.remove("press");
        nav.classList.remove("press_game");
        SeccionRank.classList.remove("Play_rank");
        Seccion.classList.add("off");
        nav.classList.add("press_home");
        Playgame.classList.add("play");
        home.classList.add("play");
      break;

    case "Task":

    if(labelClaim==false){
     
        LBcoin.innerHTML= coins;
        BoxTask.classList.remove("off_claim");
        BTCoin.innerHTML="CLAIM";

    }else{
        LBcoin.innerHTML=0;
        BoxTask.classList.add("off_claim");
        BTCoin.innerHTML="CLAIMED";
    }

      nav.classList.remove("press_rank");
      nav.classList.remove("press");
      nav.classList.remove("press_home");
      SeccionRank.classList.remove("Play_rank");
      Playgame.classList.remove("play");
      home.classList.remove("play");
      Seccion.classList.add("off");
      nav.classList.add("press_game");
      Seccion.classList.add("Play_task");

      break; 

    case "Ranking":
      Inicio.classList.remove("press_log");
      nav.classList.remove("press_home");
      nav.classList.remove("press_game");
      nav.classList.remove("press");
      home.classList.remove("conectar");
      Seccion.classList.add("off");

      nav.classList.add("press_rank");
      SeccionRank.classList.add("Play_rank");

      break; 
    
    case "SOON":
      console.log("El kilogramo de naranjas cuesta $0.59.");
      break;  
    
    case "roadMap":
      Inicio.classList.add("press_log");
        Seccion.classList.remove("off");
        nav.classList.remove("press_home");
        nav.classList.remove("press_game");
        nav.classList.remove("press");
        nav.classList.remove("press_rank");
        SeccionRank.classList.remove("Play_rank");
        home.classList.remove("conectar");
        Playgame.classList.remove("play");
        home.classList.remove("play");
      break;   
      
  }
  }

  else{
    console.log("no esta login");
  }
}