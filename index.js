
import './Scripts/SignUp.js'
import './Scripts/LogIn.js'
import{ID} from './Scripts/LogIn.js'
import './Scripts/LogOut.js'
import { db } from './Scripts/firebase.js';
import { doc, collection, setDoc, getDoc} from "https://www.gstatic.com/firebasejs/10.10.0/firebase-firestore.js";
import './Scripts/firebase_realtime.js'



document.addEventListener("DOMContentLoaded", function() {

    const OpenLogin = document.querySelector("#Sign_In");
    const home = document.querySelector(".home");
    const nav = document.querySelector(".navega");
    const box = document.querySelector(".box");
    const Inicio= document.querySelector("#logo");

    const BTsoon = document.querySelector("#soon");
    const BThome = document.querySelector("#home_btn");
    const BTgame = document.querySelector("#game");
    const Btranking = document.querySelector("#ranking");
    const BTlogo = document.querySelector("#logOut_btn");
     
    const BTName = document.querySelector("#Chage_name");

    const UserName=   document.querySelector("#avatar_name");
    const InputUser= document.querySelector("#perfil_user");
    const ticketScore = document.querySelector("#Score_ticks");

    const logOut= document.querySelector("#settings");
    
    const Registar = document.querySelector(".registra-link");
    const Login = document.querySelector(".LogIn-link");

    const login = document.querySelector(".login");
    const signUp =document.querySelector(".singUp");

    const iconoCerrar = document.querySelector(".icono-cerrar");
    const pwShowHide = document.querySelectorAll(".pw_hide");
    const passOff = document.querySelector(".passOff");
    const passOn = document.querySelector(".passOn");
    const Pasword = document.querySelector(".cont-pass");
     
    var Puntaje;
    
    window.addEventListener('storage', async (event) => {
        if (event.key != 'Puntaje') return;
        
        alert(event.key + ':' + event.newValue + " at " + event.url);

        Puntaje = sessionStorage.getItem('Puntaje');
        console.log("Puntaje: "+Puntaje);

        const docRef = doc(db, "users", ID);
        const docSnap = await getDoc(docRef);
    
    if (docSnap.exists()) {
           
      const UserName= docSnap.data().score;
      let Tiquets = parseInt(UserName) + parseInt(Puntaje);
      console.log("Número anterior: ", parseInt(UserName)+10);

      ticketScore.innerHTML= Tiquets;

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

    });

    OpenLogin.addEventListener("click", () =>{ 
        home.classList.add("show");
        nav.classList.add("press_Sign");
    });
    iconoCerrar.addEventListener("click", () => {
        
        home.classList.remove("show");
        nav.classList.remove("press_Sign");
       

    });
    BTName.addEventListener("click", () => {
        
        home.classList.add("press_perfil");
        home.classList.add("edit");

    });
    
    InputUser.addEventListener('submit', async (e) =>{

        e.preventDefault();

        const nameSave = InputUser['name'].value;
        
         
        try {
            const userCollectionRef = collection(db, "users");
            const Avatar = doc(userCollectionRef, ID);
            
            await setDoc(Avatar, { avatar: nameSave }, { merge: true });
           
        
            console.log("Document written with ID: ", doc.id);
          } catch (e) {
            console.error("Error adding document: ", e);
          }


        const docRef = doc(db, "users", ID);
        const docSnap = await getDoc(docRef);
    
    if (docSnap.exists()) {
           
        UserName.innerHTML= docSnap.data().avatar;
         

      console.log("Document data:", docSnap.data().avatar);
    } else {
      // docSnap.data() will be undefined in this case
      console.log("No such document!");
    }

        console.log(UserName.innerHTML);
        home.classList.remove("press_perfil");
        home.classList.remove("edit");


    });

    logOut.addEventListener("click", () => {
        nav.classList.remove("press_Sign");
        
     
    });

    BTlogo.addEventListener("click", () => {
        Inicio.classList.add("press_log");
        nav.classList.remove("press_home");
        nav.classList.remove("press_game");
        nav.classList.remove("press");
        nav.classList.remove("press_rank");

    });

    Btranking.addEventListener("click", () => {

        Inicio.classList.remove("press_log");
        nav.classList.remove("press_home");
        nav.classList.remove("press_game");
        nav.classList.remove("press");
        nav.classList.add("press_rank");

    });
    
    BTsoon.addEventListener("click", () => {

        nav.classList.remove("press_rank");
        nav.classList.remove("press_home");
        nav.classList.remove("press_game");
        nav.classList.add("press");
    });

    BThome.addEventListener("click", () => {
        nav.classList.remove("press_rank");
        nav.classList.remove("press");
        nav.classList.remove("press_game");
        nav.classList.add("press_home");

    });
    
    BTgame.addEventListener("click", () => {

        nav.classList.remove("press_rank");
        nav.classList.remove("press");
        nav.classList.remove("press_home");
        nav.classList.add("press_game");
    });


    pwShowHide.forEach((icon) => {
        icon.addEventListener("click", () => {
            Pasword.classList.add("On");
        let getPwInput = icon.parentElement.querySelector("input");
         console.log(getPwInput);
        if(getPwInput.type==="password"){
            getPwInput.type="text";
            //icon.classList.replace ("passOff", "passOn");

            passOn.addEventListener("click",() => Pasword.classList.remove("On"));
           
            console.log(getPwInput);
        }
        else{
            getPwInput.type ="password";
            //icon.classList.replace ("passOn", "passOff");
            passOff.addEventListener("click",() => Pasword.classList.add("On"));
        }
        });
    });


    Registar.addEventListener("click", (e) => {
        e.preventDefault();
        home.classList.toggle("active");
        signUp.classList.toggle("active");
        login.classList.toggle("active");
    });

    Login.addEventListener("click", (e) => {
       
        e.preventDefault();
        home.classList.remove("active");
        signUp.classList.remove("active");
        login.classList.remove("active");

    });


}); 