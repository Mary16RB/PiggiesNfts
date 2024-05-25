
import './Scripts/SignUp.js'
import './Scripts/LogIn.js'
import{ID} from './Scripts/LogIn.js'

import './Scripts/LogOut.js'
import { db } from './Scripts/firebase.js';
import { doc, collection, setDoc, getDoc, getDocs ,updateDoc, query, orderBy, limit, Timestamp } from "https://www.gstatic.com/firebasejs/10.10.0/firebase-firestore.js";
import './Scripts/google.js'



document.addEventListener("DOMContentLoaded", async function() {

    const OpenLogin = document.querySelector("#Sign_In");
    const home = document.querySelector(".home");
    const nav = document.querySelector(".navega");
    const box = document.querySelector(".box");
    const Inicio= document.querySelector("#logo");
    const Playgame = document.querySelector("#apple_game");

    const SeccionRank= document.querySelector("body");
    const Ranking= document.querySelector(".Rank");

    const BTRank_now= document.querySelector("#actual");
    const BTRank_last= document.querySelector("#last_week");
    const BTpremios= document.querySelector("#BTpremio");
    const BTpremiosX= document.querySelector("#BTpremioX");

    const BTsoon = document.querySelector("#soon");
    const BThome = document.querySelector("#home_btn");
    const BTgame = document.querySelector("#game");
    const Btranking = document.querySelector("#ranking");
    const BTlogo = document.querySelector("#logOut_btn");
     
    const BTsetting =document.querySelector("#list");
    const BTwallet =document.querySelector("#wallet");
    const BTwalletX =document.querySelector("#cerrar_wallet");
    const BTName = document.querySelector("#Chage_name");

    const menuSetting =document.querySelector(".izquierda");

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

     //constantes de los rankings
    const Primero = document.querySelector("#primer");
    const Segundo = document.querySelector("#second");
    const Tersero = document.querySelector("#third");
    const Cuarto = document.querySelector("#cuarto");
    const Quinto = document.querySelector("#quinto");
    const Sexto = document.querySelector("#sexto");
    const Septimo = document.querySelector("#setimo");
    const Octavo = document.querySelector("#octavo");
    const Noveno = document.querySelector("#noveno");
    const Decimo = document.querySelector("#decimo");
    const Decimo_11 = document.querySelector("#decimo_primero");
    const Decimo_12 = document.querySelector("#decimo_segundo");
    const Decimo_13 = document.querySelector("#decimo_tercero");
    const Decimo_14 = document.querySelector("#decimo-cuarto");
    const Decimo_15 = document.querySelector("#decimo_quito");

    const Rank1 = document.querySelector("#rank_1");
    const Rank2 = document.querySelector("#rank_2");
    const Rank3 = document.querySelector("#rank_3");
    const Rank4 = document.querySelector("#rank_4");
    const Rank5 = document.querySelector("#rank_5");
    const Rank6 = document.querySelector("#rank_6");
    const Rank7 = document.querySelector("#rank_7");
    const Rank8 = document.querySelector("#rank_8");
    const Rank9 = document.querySelector("#rank_9");
    const Rank10 = document.querySelector("#rank_10");
    const Rank11 = document.querySelector("#rank_11");
    const Rank12 = document.querySelector("#rank_12");
    const Rank13 = document.querySelector("#rank_13");
    const Rank14 = document.querySelector("#rank_14");
    const Rank15 = document.querySelector("#rank_15");
     
    const WinPrimero = document.querySelector("#last_primer");
    const WinSegundo = document.querySelector("#last_second");
    const WinTersero = document.querySelector("#last_third");
    const WinCuarto = document.querySelector("#last_cuarto");
    const WinQuinto = document.querySelector("#last_quinto");

    const WinRank1 = document.querySelector("#last_rank_1");
    const WinRank2 = document.querySelector("#last_rank_2");
    const WinRank3 = document.querySelector("#last_rank_3");
    const WinRank4 = document.querySelector("#last_rank_4");
    const WinRank5 = document.querySelector("#last_rank_5");

    const Day=document.querySelector("#day");
    const Hour=document.querySelector("#hour");
    const Minutes=document.querySelector("#minute");
    const Second=document.querySelector("#sec");

    var dias=0;
    var horas=0;
    var min=0;
    var segundos=0;

    var cont=0; 
    var cont_set=0;
    var Puntaje;
    let totalRankN= [1,2,3,4,5,6,7,8,9,10,11,12,13,14,15];
    let totalRankS= [1,2,3,4,5,6,7,8,9,10,11,12,13,14,15];
    
    let lastRankN=[1,2,3,4,5];
    let lastRankS=[1,2,3,4,5];
 
    let last;

    lastTime();
    
    setInterval(async function(){

        let fecha= Date.now();
        let hoy = new Date(fecha);
        let dia_last =last;
    
        let fechaHoy= hoy.toUTCString();
    
        let Tempo = dia_last-hoy;
    
        dias= Math.floor(Tempo/(1000*60*60*24));
        horas=Math.floor(Tempo/(1000*60*60)) % 24;
        min= Math.floor(Tempo/(1000*60)) % 60;
        segundos=Math.floor(Tempo/1000) % 60;

        if(dias==0 && horas==0 && min==0 && segundos==0){
          
            const scoreRef =collection(db, "users");
            const q = query(scoreRef, orderBy("score","desc"), limit(5));
            const querySnapshot = await getDocs(q);

            querySnapshot.forEach((doc) => {
                let totalScore= parseInt(doc.data().score);
                let rankName= doc.data().avatar;
    
            console.log(cont);
            lastRankN.splice(cont, 5, rankName.toString()); 
            lastRankS.splice( cont, 5, totalScore);
            cont++;
    });
    cont=0;
         console.log(totalRankN,totalRankS);
    
      WinPrimero.innerHTML= (totalRankN[0]); 
      WinSegundo.innerHTML= (totalRankN[1]);
      WinTersero.innerHTML= (totalRankN[2]);
      WinCuarto.innerHTML= (totalRankN[3]);
      WinQuinto.innerHTML= (totalRankN[4]);

      WinRank1.innerHTML= (totalRankS[0]); 
      WinRank2.innerHTML= (totalRankS[1]);
      WinRank3.innerHTML= (totalRankS[2]);
      WinRank4.innerHTML= (totalRankS[3]);
      WinRank5.innerHTML= (totalRankS[4]);

     
       const Winner1=doc(db, "weekWinners", "top1");
       const Winner2=doc(db, "weekWinners", "top2");
       const Winner3=doc(db, "weekWinners", "top3");
       const Winner4=doc(db, "weekWinners", "top4");
       const Winner5=doc(db, "weekWinners", "top5");
            
        await updateDoc(Winner1, { name: totalRankN[0] , score: totalRankS[0] }, { merge: true });
        await updateDoc(Winner2, { name: totalRankN[1] , score: totalRankS[1] }, { merge: true });
        await updateDoc(Winner3, { name: totalRankN[2] , score: totalRankS[2] }, { merge: true });
        await updateDoc(Winner4, { name: totalRankN[3] , score: totalRankS[3] }, { merge: true });
        await updateDoc(Winner5, { name: totalRankN[4] , score: totalRankS[4] }, { merge: true });
    

} else {
  // docSnap.data() will be undefined in this case
  console.log("No such document!");
}
    
         console.log("Fecha: " +fechaHoy);
         console.log("Faltan: " +dias+" : "+horas+" : "+min+" : "+segundos);
    
        
        console.log("faltan:"+ Tempo);
    
        Day.innerHTML= dias;
        Hour.innerHTML= horas;
        Minutes.innerHTML=min;
        Second.innerHTML= segundos;
    
    
    }, 1000);
    

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
        login.classList.remove("active");
        
    });

    iconoCerrar.addEventListener("click", () => {
        
        home.classList.remove("show");
        nav.classList.remove("press_Sign");
       

    });

    BTsetting.addEventListener("click", () =>{
        home.classList.remove("conectar");
         if(cont_set==0){
        menuSetting.classList.add("open");
        cont_set=1;
         }
         else{
            menuSetting.classList.remove("open");
            cont_set=0;
         }

    });

    BTwallet.addEventListener("click", () => {
        
        home.classList.add("conectar");
        
    });

    BTwalletX.addEventListener("click", () => {
        
        home.classList.remove("conectar");
        
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
        SeccionRank.classList.remove("Play_rank");
        
        menuSetting.classList.remove("open");
        home.classList.remove("conectar");
        login.classList.remove("active");
     
    });

    BTlogo.addEventListener("click", () => {
        Inicio.classList.add("press_log");
        nav.classList.remove("press_home");
        nav.classList.remove("press_game");
        nav.classList.remove("press");
        nav.classList.remove("press_rank");
        SeccionRank.classList.remove("Play_rank");
        home.classList.remove("conectar");
        Playgame.classList.remove("play");
        home.classList.remove("play");

    });

    Btranking.addEventListener("click", async() => {

        Inicio.classList.remove("press_log");
        nav.classList.remove("press_home");
        nav.classList.remove("press_game");
        nav.classList.remove("press");
        home.classList.remove("conectar");

        Playgame.classList.remove("play");
        home.classList.remove("play");

        nav.classList.add("press_rank");
        SeccionRank.classList.add("Play_rank");

        var scoreRef =collection(db, "users");
        var q = query(scoreRef, orderBy("score","desc"), limit(15));
        var querySnapshot = await getDocs(q);
        querySnapshot.forEach((doc) => {
            
            let totalScore= parseInt(doc.data().score);
            let rankName= doc.data().avatar;

        console.log(cont);
        totalRankN.splice(cont, 15, rankName.toString()); 
        totalRankS.splice( cont, 15, totalScore);
        cont++;
});
cont=0;
     console.log(totalRankN,totalRankS);

  Primero.innerHTML= (totalRankN[0]); 
   Segundo.innerHTML= (totalRankN[1]);
   Tersero.innerHTML= (totalRankN[2]);
   Cuarto.innerHTML= (totalRankN[3]);
   Quinto.innerHTML= (totalRankN[4]);
   Sexto.innerHTML= (totalRankN[5]);
   Septimo.innerHTML= (totalRankN[6]);
   Octavo.innerHTML= (totalRankN[7]);
   Noveno.innerHTML= (totalRankN[8]);
   Decimo.innerHTML= (totalRankN[9]);
   Decimo_11.innerHTML= (totalRankN[10]);
   Decimo_12.innerHTML= (totalRankN[11]);
   Decimo_13.innerHTML= (totalRankN[12]);
   Decimo_14.innerHTML= (totalRankN[13]);
   Decimo_15.innerHTML= (totalRankN[14]);

   Rank1.innerHTML= (totalRankS[0]); 
   Rank2.innerHTML= (totalRankS[1]);
   Rank3.innerHTML= (totalRankS[2]);
   Rank4.innerHTML= (totalRankS[3]);
   Rank5.innerHTML= (totalRankS[4]);
   Rank6.innerHTML= (totalRankS[5]);
   Rank7.innerHTML= (totalRankS[6]);
   Rank8.innerHTML= (totalRankS[7]);
   Rank9.innerHTML= (totalRankS[8]);
   Rank10.innerHTML= (totalRankS[9]);
   Rank11.innerHTML= (totalRankS[10]);
   Rank12.innerHTML= (totalRankS[11]);
   Rank13.innerHTML= (totalRankS[12]);
   Rank14.innerHTML= (totalRankS[13]);
   Rank15.innerHTML= (totalRankS[14]);

   scoreRef = collection(db, "weekWinners");
   q = query(scoreRef, orderBy("score","desc"), limit(5));
   querySnapshot = await getDocs(q);

  querySnapshot.forEach((doc) => {
       let totalScore= parseInt(doc.data().score);
       let rankName= doc.data().name;

   console.log(cont);

   lastRankN.splice(cont, 5, rankName.toString()); 
   lastRankS.splice( cont, 5, totalScore);
   cont++;
});
cont=0;
console.log(lastRankN,lastRankS);

WinPrimero.innerHTML= (lastRankN[0]); 
WinSegundo.innerHTML= (lastRankN[1]);
WinTersero.innerHTML= (lastRankN[2]);
WinCuarto.innerHTML= (lastRankN[3]);
WinQuinto.innerHTML= (lastRankN[4]);

WinRank1.innerHTML= (lastRankS[0]); 
WinRank2.innerHTML= (lastRankS[1]);
WinRank3.innerHTML= (lastRankS[2]);
WinRank4.innerHTML= (lastRankS[3]);
WinRank5.innerHTML= (lastRankS[4]);

    });
    
    BTsoon.addEventListener("click", () => {

        nav.classList.remove("press_rank");
        nav.classList.remove("press_home");
        nav.classList.remove("press_game");
        SeccionRank.classList.remove("Play_rank");
        home.classList.remove("conectar");
        Playgame.classList.remove("play");
        home.classList.remove("play");

        nav.classList.add("press");
    });

    BThome.addEventListener("click", () => {
        nav.classList.remove("press_rank");
        nav.classList.remove("press");
        nav.classList.remove("press_game");
        SeccionRank.classList.remove("Play_rank");

        nav.classList.add("press_home");
        Playgame.classList.add("play");
        home.classList.add("play");

    });
    
    BTgame.addEventListener("click", () => {

        nav.classList.remove("press_rank");
        nav.classList.remove("press");
        nav.classList.remove("press_home");
        SeccionRank.classList.remove("Play_rank");
        Playgame.classList.remove("play");
        home.classList.remove("play");
        nav.classList.add("press_game");
    });

    BTRank_last.addEventListener("click", () => {

        Ranking.classList.add("on");

    });

    BTRank_now.addEventListener("click", () => {

        Ranking.classList.remove("on");

    });

    BTpremios.addEventListener("click", () => {

        Ranking.classList.add("in");

    });

    BTpremiosX.addEventListener("click", () => {

        Ranking.classList.remove("in");

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
    
async function lastTime(){

    const docReftime = doc(db, "timer", 'week');
    const doctime = await getDoc(docReftime);

    let lastDate= doctime.data();

    let timestamp= lastDate.lastRankin;
    last= timestamp.toDate();

    console.log("lastrankin: " +last);

    }

}); 