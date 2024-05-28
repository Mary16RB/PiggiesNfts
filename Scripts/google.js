import { signInWithPopup, GoogleAuthProvider } from "https://www.gstatic.com/firebasejs/10.10.0/firebase-auth.js";
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

  const docRef = doc(db, "users", ID);
  const docSnap = await getDoc(docRef);
  const veritify =docSnap.data().register;
  console.log("verificado:"+veritify);

if (veritify===true) {
 const provider = new GoogleAuthProvider();

 try{
    const credencials = await signInWithPopup(auth, provider);
    console.log(credencials);


if (docSnap.exists()) {

  UserName.innerHTML= docSnap.data().avatar;
  ticketScore .innerHTML=docSnap.data().score;

  home.classList.remove("show");
    home.classList.add("play");
    nav.classList.add("play");
    Playgame.classList.add("play");
    Head.classList.add("log");
    nav.classList.add("log");
    login.classList.add("active");



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
} else{
  alert("No te has registrado");
}

});