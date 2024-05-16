import { getRedirectResult, signInWithPopup, GoogleAuthProvider } from "https://www.gstatic.com/firebasejs/10.10.0/firebase-auth.js";
import { auth, db} from '../Scripts/firebase.js';
import{ID} from '../Scripts/LogIn.js';
import { doc, getDoc} from "https://www.gstatic.com/firebasejs/10.10.0/firebase-firestore.js"; 


const Playgame = document.querySelector("#apple_game");
const home = document.querySelector(".home");
const nav = document.querySelector(".navega");
const Head = document.querySelector(".header");

const ticketScore = document.querySelector("#Score_ticks");
const login = document.querySelector(".login");

const UserName=   document.querySelector("#avatar_name");

const Btgoogle=document.querySelector("#google");


Btgoogle.addEventListener('click', async() =>{

 const provider = new GoogleAuthProvider();

 try{
    const credencials = await signInWithPopup(auth, provider);
    console.log(credencials);
     
    home.classList.remove("show");
    home.classList.add("play");
    nav.classList.add("play");
    Playgame.classList.add("play");
    Head.classList.add("log");
    nav.classList.add("log");
    login.classList.add("active");

    const docRef = doc(db, "users", ID);
    const docSnap = await getDoc(docRef);

if (docSnap.exists()) {

  UserName.innerHTML= docSnap.data().avatar;
  ticketScore .innerHTML=docSnap.data().score;

  console.log("Document data:", docSnap.data().avatar);
} else {
  // docSnap.data() will be undefined in this case
  console.log("No such document!")
  alert("No te has registrado");

 }
}
 catch(error){
    const errorCode = error.code;
    const errorMessage = error.message;
    // The email of the user's account used.
    const email = error.customData.email;
    // The AuthCredential type that was used.
    const credential = GoogleAuthProvider.credentialFromError(error);
 }
/*
 getRedirectResult(auth).then((result) => {
    // This gives you a Google Access Token. You can use it to access Google APIs.
    const credential = GoogleAuthProvider.credentialFromResult(result);
    const token = credential.accessToken;

    // The signed-in user info.
    const user = result.user;
    // IdP data available using getAdditionalUserInfo(result)
    // ...
  }).catch((error) => {
    // Handle Errors here.
    const errorCode = error.code;
    const errorMessage = error.message;
    // The email of the user's account used.
    const email = error.customData.email;
    // The AuthCredential type that was used.
    const credential = GoogleAuthProvider.credentialFromError(error);
    // ...
  });*/


});