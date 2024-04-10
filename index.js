
import 'Scripts/SignUp.js'
import 'Scripts/LogIn.js'
import 'Scripts/LogOut.js'


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

    OpenLogin.addEventListener("click", () =>{ 
        home.classList.add("show");
        nav.classList.add("press_Sign");
    });

    iconoCerrar.addEventListener("click", () => {
        
        home.classList.remove("show");
        nav.classList.remove("press_Sign");

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
        signUp.classList.toggle("active");
        login.classList.toggle("active");
    });

    Login.addEventListener("click", (e) => {
       
        e.preventDefault();
        signUp.classList.remove("active");
        login.classList.remove("active");

    });
    
}); 
