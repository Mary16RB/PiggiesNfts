
const logOut= document.querySelector("#settings");

const Playgame = document.querySelector("#apple_game");
const home = document.querySelector(".home");
const nav = document.querySelector(".navega");
const Head = document.querySelector(".header");
const Seccion= document.querySelector("body");
let token;

logOut.addEventListener("click", async () => {

    home.classList.remove("play");
    nav.classList.remove("play");
    Playgame.classList.remove("play");
    Head.classList.remove("log");
    nav.classList.remove("log");
    Seccion.classList.remove("Play_task");


    token= false;

         let authToken = token;

         let local=localStorage.setItem("authToken", authToken);
          console.log("login: "+local);

});