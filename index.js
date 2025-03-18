
import './Scripts/SignUp.js'
import './Scripts/LogIn.js'
import{ID, coin, veri} from './Scripts/LogIn.js'
import './Scripts/resetPass.js'
import './Scripts/LogOut.js'
import { db, imageRef, auth} from './Scripts/firebase.js';
import { doc, collection, setDoc,updateDoc , getDoc, getDocs ,query, orderBy, limit, Timestamp} from "https://www.gstatic.com/firebasejs/10.10.0/firebase-firestore.js";
import './Scripts/google.js'
import { ref, getDownloadURL  } from "https://www.gstatic.com/firebasejs/10.10.0/firebase-storage.js";
import { ethers } from "https://cdnjs.cloudflare.com/ajax/libs/ethers/5.7.2/ethers.esm.min.js";

document.addEventListener("DOMContentLoaded", function() {

const NFT_CONTRACT_ADDRESS = "0x268fba721cfd580fe98d96f1b0249f6871d1fa09"; 
const NFT_ABI =[
  {
    "inputs": [
      {
        "internalType": "string",
        "name": "name_",
        "type": "string"
      },
      {
        "internalType": "string",
        "name": "symbol_",
        "type": "string"
      }
    ],
    "stateMutability": "nonpayable",
    "type": "constructor"
  },
  {
    "anonymous": false,
    "inputs": [
      {
        "indexed": true,
        "internalType": "address",
        "name": "owner",
        "type": "address"
      },
      {
        "indexed": true,
        "internalType": "address",
        "name": "approved",
        "type": "address"
      },
      {
        "indexed": true,
        "internalType": "uint256",
        "name": "tokenId",
        "type": "uint256"
      }
    ],
    "name": "Approval",
    "type": "event"
  },
  {
    "anonymous": false,
    "inputs": [
      {
        "indexed": true,
        "internalType": "address",
        "name": "owner",
        "type": "address"
      },
      {
        "indexed": true,
        "internalType": "address",
        "name": "operator",
        "type": "address"
      },
      {
        "indexed": false,
        "internalType": "bool",
        "name": "approved",
        "type": "bool"
      }
    ],
    "name": "ApprovalForAll",
    "type": "event"
  },
  {
    "anonymous": false,
    "inputs": [
      {
        "indexed": true,
        "internalType": "address",
        "name": "from",
        "type": "address"
      },
      {
        "indexed": true,
        "internalType": "address",
        "name": "to",
        "type": "address"
      },
      {
        "indexed": true,
        "internalType": "uint256",
        "name": "tokenId",
        "type": "uint256"
      }
    ],
    "name": "Transfer",
    "type": "event"
  },
  {
    "inputs": [
      {
        "internalType": "address",
        "name": "to",
        "type": "address"
      },
      {
        "internalType": "uint256",
        "name": "tokenId",
        "type": "uint256"
      }
    ],
    "name": "approve",
    "outputs": [],
    "stateMutability": "nonpayable",
    "type": "function"
  },
  {
    "inputs": [
      {
        "internalType": "address",
        "name": "owner",
        "type": "address"
      }
    ],
    "name": "balanceOf",
    "outputs": [
      {
        "internalType": "uint256",
        "name": "",
        "type": "uint256"
      }
    ],
    "stateMutability": "view",
    "type": "function"
  },
  {
    "inputs": [
      {
        "internalType": "uint256",
        "name": "tokenId",
        "type": "uint256"
      }
    ],
    "name": "getApproved",
    "outputs": [
      {
        "internalType": "address",
        "name": "",
        "type": "address"
      }
    ],
    "stateMutability": "view",
    "type": "function"
  },
  {
    "inputs": [
      {
        "internalType": "address",
        "name": "owner",
        "type": "address"
      },
      {
        "internalType": "address",
        "name": "operator",
        "type": "address"
      }
    ],
    "name": "isApprovedForAll",
    "outputs": [
      {
        "internalType": "bool",
        "name": "",
        "type": "bool"
      }
    ],
    "stateMutability": "view",
    "type": "function"
  },
  {
    "inputs": [],
    "name": "name",
    "outputs": [
      {
        "internalType": "string",
        "name": "",
        "type": "string"
      }
    ],
    "stateMutability": "view",
    "type": "function"
  },
  {
    "inputs": [
      {
        "internalType": "uint256",
        "name": "tokenId",
        "type": "uint256"
      }
    ],
    "name": "ownerOf",
    "outputs": [
      {
        "internalType": "address",
        "name": "",
        "type": "address"
      }
    ],
    "stateMutability": "view",
    "type": "function"
  },
  {
    "inputs": [
      {
        "internalType": "address",
        "name": "operator",
        "type": "address"
      },
      {
        "internalType": "bool",
        "name": "approved",
        "type": "bool"
      }
    ],
    "name": "setApprovalForAll",
    "outputs": [],
    "stateMutability": "nonpayable",
    "type": "function"
  },
  {
    "inputs": [],
    "name": "symbol",
    "outputs": [
      {
        "internalType": "string",
        "name": "",
        "type": "string"
      }
    ],
    "stateMutability": "view",
    "type": "function"
  },
  {
    "inputs": [
      {
        "internalType": "uint256",
        "name": "tokenId",
        "type": "uint256"
      }
    ],
    "name": "tokenURI",
    "outputs": [
      {
        "internalType": "string",
        "name": "",
        "type": "string"
      }
    ],
    "stateMutability": "view",
    "type": "function"
  },
  {
    "inputs": [
      {
        "internalType": "address",
        "name": "from",
        "type": "address"
      },
      {
        "internalType": "address",
        "name": "to",
        "type": "address"
      },
      {
        "internalType": "uint256",
        "name": "tokenId",
        "type": "uint256"
      }
    ],
    "name": "transferFrom",
    "outputs": [],
    "stateMutability": "nonpayable",
    "type": "function"
  },
  {
    "inputs": [],
    "name": "totalSupply",
    "outputs": [
      {
        "internalType": "uint256",
        "name": "",
        "type": "uint256"
      }
    ],
    "stateMutability": "view",
    "type": "function"
  },
  {
    "inputs": [
      {
        "internalType": "address",
        "name": "owner",
        "type": "address"
      },
      {
        "internalType": "uint256",
        "name": "index",
        "type": "uint256"
      }
    ],
    "name": "tokenOfOwnerByIndex",
    "outputs": [
      {
        "internalType": "uint256",
        "name": "",
        "type": "uint256"
      }
    ],
    "stateMutability": "view",
    "type": "function"
  },
  {
    "inputs": [
      {
        "internalType": "uint256",
        "name": "index",
        "type": "uint256"
      }
    ],
    "name": "tokenByIndex",
    "outputs": [
      {
        "internalType": "uint256",
        "name": "",
        "type": "uint256"
      }
    ],
    "stateMutability": "view",
    "type": "function"
  },
  {
    "inputs": [
        {
            "internalType": "uint256",
            "name": "tokenId",
            "type": "uint256"
        }
    ],
    "name": "explicitOwnershipOf",
    "outputs": [
        {
            "components": [
                {
                    "internalType": "address",
                    "name": "addr",
                    "type": "address"
                },
                {
                    "internalType": "uint64",
                    "name": "startTimestamp",
                    "type": "uint64"
                },
                {
                    "internalType": "bool",
                    "name": "burned",
                    "type": "bool"
                },
                {
                    "internalType": "uint24",
                    "name": "extraData",
                    "type": "uint24"
                }
            ],
            "internalType": "struct TokenOwnership",
            "name": "",
            "type": "tuple"
        }
    ],
    "stateMutability": "view",
    "type": "function"
},
{
    "inputs": [
        {
            "internalType": "uint256[]",
            "name": "tokenIds",
            "type": "uint256[]"
        }
    ],
    "name": "explicitOwnershipsOf",
    "outputs": [
        {
            "components": [
                {
                    "internalType": "address",
                    "name": "addr",
                    "type": "address"
                },
                {
                    "internalType": "uint64",
                    "name": "startTimestamp",
                    "type": "uint64"
                },
                {
                    "internalType": "bool",
                    "name": "burned",
                    "type": "bool"
                },
                {
                    "internalType": "uint24",
                    "name": "extraData",
                    "type": "uint24"
                }
            ],
            "internalType": "struct TokenOwnership[]",
            "name": "",
            "type": "tuple[]"
        }
    ],
    "stateMutability": "view",
    "type": "function"
},
{
    "inputs": [
        {
            "internalType": "address",
            "name": "owner",
            "type": "address"
        },
        {
            "internalType": "uint256",
            "name": "start",
            "type": "uint256"
        },
        {
            "internalType": "uint256",
            "name": "stop",
            "type": "uint256"
        }
    ],
    "name": "tokensOfOwnerIn",
    "outputs": [
        {
            "internalType": "uint256[]",
            "name": "",
            "type": "uint256[]"
        }
    ],
    "stateMutability": "view",
    "type": "function"
},
{
    "inputs": [
        {
            "internalType": "address",
            "name": "owner",
            "type": "address"
        }
    ],
    "name": "tokensOfOwner",
    "outputs": [
        {
            "internalType": "uint256[]",
            "name": "",
            "type": "uint256[]"
        }
    ],
    "stateMutability": "view",
    "type": "function"
}
];
    const OpenLogin = document.querySelector("#Sign_In");
    const home = document.querySelector(".home");
    const nav = document.querySelector(".navega");
    const box = document.querySelector(".box");
    const Inicio= document.querySelector("#logo");
    const Playgame = document.querySelector("#apple_game");
    const SeccionGame=document.querySelector(".apple_game");
    const BoxCheck=document.querySelector(".box_checks");
    const roapMap=document.querySelector(".info");

    const SeccionRank= document.querySelector("body");
    const Seccion= document.querySelector("body");
    const Ranking= document.querySelector(".Rank");

    const BTRank_now= document.querySelector("#actual");
    const BTRank_last= document.querySelector("#last_week");
    const BTpremios= document.querySelector("#BTpremio");
    const BTpremiosX= document.querySelector("#BTpremioX");
    const BTmaqui=document.querySelector("#MApple");

    const BTsoon = document.querySelector("#soon");
    const BThome = document.querySelector("#home_btn");
    const BTgame = document.querySelector("#game");
    const Btranking = document.querySelector("#ranking");
    const BTlogo = document.querySelector("#logOut_btn");

    const AnimationPig =document.querySelector(".boton_pig");
    const sliderPig=document.querySelector(".carpig--inner");
    const sliderPig1=document.querySelector(".carpig--inner1");
    const acensorScroll = document.querySelector(".Laberinto");
    const pigScroll= document.querySelector(".img_indicador");
    const pigBox=document.querySelector(".pig_box");
    const sliderD= document.querySelector(".pig_derecha");
    const sliderI= document.querySelector(".pig_izquierda");
    const namePig= document.querySelector("#name_pig");
    const typePig= document.querySelector("#type_pig");
    const mintPig= document.querySelector("#mint_pig");

    const observerOptions = {
        root: acensorScroll, // Solo observa dentro del contenedor
        threshold: 0.5
      };
   const observerPig = {
        root: pigScroll, // Solo observa dentro del contenedor
        threshold: 0.7
      };
      const observerSlider = {
        root: pigScroll, // Solo observa dentro del contenedor
        threshold: 0
      };
    const imgLab = document.querySelectorAll(".info_img");
    const imgPig = document.querySelectorAll(".pigs");

    let setTime=Date.now();
    let millisPig= 0;
    let RangoPix=0;
    let contPig=0;
    let numPig=0;
    let contSlider=0;
    let TotalSlider=0;
    const Panel=document.querySelector(".panel");
     
    const BTsetting =document.querySelector("#list");
    const BTwallet =document.querySelector("#wallet");
    const BTwalletX =document.querySelector("#cerrar_wallet");
    const BoxWallet= document.querySelector(".box_wallet");
    const titleWallet= document.querySelector(".conect_wallet");

    const BTName = document.querySelector("#Chage_name");
    const LBmoney =document.querySelector('#Score_money');

    const BTmusic =document.querySelector("#music");
    const BTmusicX =document.querySelector("#bt_musicX");
    const BoxMusic= document.querySelector(".box_music");
    
    const BoxTask= document.querySelector(".box_task");
    const BTCoin= document.querySelector("#bt_Coin");
    const LBcoin =document.querySelector('#Coin-10');

    const menuSetting =document.querySelector(".menu_settings");

    const UserName= document.querySelector("#avatar_name");
    const AvatarUser=document.querySelector(".avatar");
    const BTNameX =document.querySelector("#btx_perfil");
    const InputUser= document.querySelector("#perfil_user");
    const ticketScore = document.querySelector("#Score_ticks");

    const logOut= document.querySelector("#settings");
    
    const Registar = document.querySelector(".registra-link");
    const Login = document.querySelector(".LogIn-link");
    const Login2 = document.querySelector(".logIn-link");
    const BTreset = document.querySelector("#resetPass");

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

    //constantes musica

    const audio1= document.querySelector("#music_1"); 
    const audio2= document.querySelector("#music_2"); 
    const audio3= document.querySelector("#music_3"); 
    const audio4= document.querySelector("#music_4"); 

    const Play1= document.querySelector("#play_1"); 
    const Play2= document.querySelector("#play_2"); 
    const Play3= document.querySelector("#play_3"); 
    const Play4= document.querySelector("#play_4"); 

    const Vol1= document.querySelector("#Vol1");

    const Swith_M = document.querySelector("#music_off");
    const Swith_Ale =document.querySelector("#aleatory");
    const Swith_Sct =document.querySelector("#select");

    const Day=document.querySelector("#day");
    const Hour=document.querySelector("#hour");
    const Minutes=document.querySelector("#minute");
    const Second=document.querySelector("#sec");

    const alertMessage = document.querySelector('#num_tiks');
    const closeAlertButton = document.querySelector("#claim_Button");

    const Conectar_Meta=document.querySelector(".getNFTsButton");
    const Address=document.querySelector("#Add");

    const originalAlert = window.alert;

    var dias=0;
    var horas=0;
    var min=0;
    var segundos=0;
     
    var cont=0; 
    var cont_set=0;
    var cont_music=true;
    var cont_Ale=true;
    var cont_Sct=false;

    var Puntaje;

    var codigo = new Array(); 
    var gifts= new Array();
    let totalRankN= [1,2,3,4,5,6,7,8,9,10,11,12,13,14,15];
    let totalRankS= [1,2,3,4,5,6,7,8,9,10,11,12,13,14,15];

    let lastRankN=["1st","2nd","3th","4th","5th"];
    let lastRankS=[1,2,3,4,5];
    let token;
    let last;
    let reset;
    let coins=3;

    const sections = document.querySelectorAll('section');
    
    
    weekRewards();
    lastTime();
    diaReset();
    
setTimeout(() => {
    inicio();
  console.log("Delayed log after 8 seconds");
}, 8000);

   setInterval(function(){

    if(veri==1){
      coins=coin;
    }

   }, 10000);

    setInterval(function(){
        if(cont_Ale==true){

        Aleatorio();
        }else{
            
        audio1.pause();
        audio1.currentTime=0;
        audio2.pause();
        audio2.currentTime=0;
        audio3.pause();
        audio3.currentTime=0;
        audio4.pause();
        audio4.currentTime=0;
        }
    },120000);

    
    setInterval(async function(){

        let fecha= Date.now();
        let hoy = new Date(fecha);
        let dia_last =last;

        let hora_last=reset;
    
        let fechaHoy= hoy.toUTCString();
    
        let Tempo = dia_last-hoy;
        let difhora =hora_last-hoy;

        dias= Math.floor(Tempo/(1000*60*60*24));
        horas=Math.floor(Tempo/(1000*60*60)) % 24;
        min= Math.floor(Tempo/(1000*60)) % 60;
        segundos=Math.floor(Tempo/1000) % 60;


        if(difhora<0){
    console.log("fechaAnt: "+ reset.toString());

    fecha = Date.now();
    let hoy2 = new Date(fecha);
    let dia2= hoy2.getUTCDate();
    let mes=hoy2.getUTCMonth();
    reset.setMonth(mes);
    reset.setDate(dia2);
    
    console.log("fechaNew: "+ reset.toString());

    var cont2=0;
    let Dato;
    let claim= false;

    const timeRef =doc(db, "timer","horaReset");

    const scoreRef =collection(db, "users");
    const q = query(scoreRef, orderBy("score","desc"));
    const querySnapshot = await getDocs(q);
    
    querySnapshot.forEach( async(doc) => {
       
        Dato=doc.id;
        console.log("id: "+ Dato);
      
       codigo[cont2]=Dato;
        cont2++;
        console.log("cont: "+cont2);
    });

    codigo.forEach(async(id)=>{
     
     const IdRef= doc(db, "users", id);
     console.log("ID: "+id);

     await updateDoc(IdRef, { claim:claim }, { merge: true });
    });

    await updateDoc(timeRef, { hora: reset}, { merge: true });

        }

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
    

}  
 else if (Tempo<=-1) {
        dias=0;
        horas=0;
        min=0;
        segundos=0;

    Day.innerHTML= dias;
    Hour.innerHTML= horas;
    Minutes.innerHTML=min;
    Second.innerHTML= segundos;
   
} else{
    Day.innerHTML= dias;
    Hour.innerHTML= horas;
    Minutes.innerHTML=min;
    Second.innerHTML= segundos;

}
    
         console.log("Fecha: " +fechaHoy);
         console.log("Faltan: " +dias+" : "+horas+" : "+min+" : "+segundos);
    
        
        console.log("faltan:"+ Tempo);
    
        Day.innerHTML= dias;
        Hour.innerHTML= horas;
        Minutes.innerHTML=min;
        Second.innerHTML= segundos;
    
    
    }, 1000);

    closeAlertButton.addEventListener('click', () => {
        home.classList.remove('Aler');
        SeccionGame.classList.remove('off_maqui');
        window.alert = originalAlert;
    });
    
    window.addEventListener('storage', async (event) => {
        if (event.key != 'Puntaje') return;
        
        Puntaje = sessionStorage.getItem('Puntaje');
        console.log("Puntaje: "+Puntaje);

        alertMessage.innerHTML=Puntaje;

        window.alert = function() {
            setTimeout(function(){
             home.classList.add('Aler');   
            }, 1000);
           
    };
   alert(event.key + ':' + event.newValue + " at " + event.url);  
        const docRef = doc(db, "users", ID);
        const docSnap = await getDoc(docRef);
    
    if (docSnap.exists()) {
           
      const UserName= docSnap.data().score;
      let Tiquets = parseInt(UserName) + parseInt(Puntaje);
      console.log("Número anterior: ", parseInt(UserName));

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

   document.querySelectorAll('nav a').forEach(link => {
        link.addEventListener('click', function(event){
            const targetId = link.getAttribute('href').substring(1);

            console.log("link: "+targetId);

            navigateTo(targetId);

        });
    });
    
    OpenLogin.addEventListener("click", () =>{ 
        home.classList.add("show");
        nav.classList.add("press_Sign");
        login.classList.remove("active");
        login.classList.remove("res");
    });

    iconoCerrar.addEventListener("click", () => {
        
        home.classList.remove("show");
        nav.classList.remove("press_Sign");
        home.classList.remove("res");
        home.classList.remove("active");
        box.classList.remove("res");
        signUp.classList.remove("active");
        signUp.classList.remove("res");
        login.classList.remove("res");
    });

    BTsetting.addEventListener("click", () =>{
        home.classList.remove("conectar");
         if(cont_set==0){
        home.classList.add("open");
        cont_set=1;
         }
         else{
            home.classList.remove("open");
            cont_set=0;
         }

    });

    BTwallet.addEventListener("click", () => {
        
        home.classList.add("conectar");
        
    });

    BTwalletX.addEventListener("click", () => {
        
        home.classList.remove("conectar");
        
    });

    Conectar_Meta.addEventListener("click", () => {

        getNFTsFromOpenSea();

    });



    BTName.addEventListener("click", () => {
        
        home.classList.add("press_perfil");
        home.classList.add("edit");
        

    });

    BTNameX.addEventListener("click", () => {
        
        home.classList.remove("press_perfil");
        home.classList.remove("edit");
        

    });

    BTmusic.addEventListener("click", () =>{
        
        home.classList.add("play_music");
    
    });

    BTmusicX.addEventListener("click", () =>{
        
        home.classList.remove("play_music");

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
        Seccion.classList.remove("off");

        menuSetting.classList.remove("open");
        home.classList.remove("conectar");
        login.classList.remove("active");
        home.classList.remove("open"); 
        home.classList.remove("mint_log");
          
        cont_set=0;
        token= false;

         let authToken = token;

         let local=localStorage.setItem("authToken", authToken);
          console.log("login: "+local);
     
    });

    BTlogo.addEventListener("click", () => {
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
        Seccion.classList.remove("Play_task");
        Seccion.classList.remove("log_discord");
        home.classList.remove("mint_log");

    });

    const observer = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
          if (entry.isIntersecting) {
            console.log(`${entry.target.alt} es visible dentro del contenedor`);
            let lavel=`${entry.target.alt}`;
            console.log(lavel);
            switch (lavel){
                case "Level 1":
                Panel.classList.add("clin1");
                Panel.classList.remove("clin2");
                Panel.classList.remove("clin3");
                Panel.classList.remove("clin4");
                break;

                case "Level 2":
                Panel.classList.remove("clin1");
                Panel.classList.add("clin2");
                Panel.classList.remove("clin3");
                Panel.classList.remove("clin4");
                break;

                case "Level 3":
                    Panel.classList.remove("clin1");
                    Panel.classList.remove("clin2");
                    Panel.classList.add("clin3");
                    Panel.classList.remove("clin4");
                break;

                case "Level 4":
                    Panel.classList.remove("clin1");
                    Panel.classList.remove("clin2");
                    Panel.classList.remove("clin3");
                    Panel.classList.add("clin4");
                break;
            }
              
          }
        });
      }, observerOptions);

      imgLab.forEach(img_info => observer.observe(img_info));

      const observaSlider = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
          if (!entry.isIntersecting) {

           sliderPig.style.animation='none';
           sliderPig.style.animation='';
           console.log("reset");
          
           }
          });
        }, observerSlider);

       observaSlider.observe(sliderPig1);

      const observaPig = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
          if (entry.isIntersecting) {
           
            setTime=Date.now();
            const pre=`${entry.target.id}`;
            numPig= parseInt(pre);

            const con=`${entry.target.alt}`;
            contPig=parseInt(con);

            switch(contPig){
             case 0:
                contSlider=0;
                break;
             default:
               contSlider= (-112*(contPig-1)-78); 
               break;   
            }

            console.log("pig#= "+ contPig);
            console.log("slider: "+contSlider);

            let Pig=`${entry.target.src}`;
            console.log("PIG: "+Pig);

            const index = Pig.indexOf("Meta");

              // Obtén la parte a partir de "piggies"
           const newUrl = Pig.slice(index);

            pigBox.src =newUrl;

            metadata(numPig);

          }
        });
    }, observerPig);

    imgPig.forEach(pigs => observaPig.observe(pigs));

    AnimationPig.addEventListener('mouseenter', () => {

        millisPig=Date.now()-setTime;
        sliderPig.style.animationPlayState = "paused";
        sliderPig.style.animation='none';
        //const Slider2= getCurrentTranslateX();
        
        const pixel= (millisPig/27).toFixed();
        console.log("pixel: "+pixel);
         
       const Slider2=contSlider-pixel;
        RangoPix=pixel-34;
        console.log("Slider: "+Slider2+"  Rango: "+RangoPix);

        TotalSlider=Slider2+RangoPix;
        console.log(TotalSlider);
        
        sliderPig.style.transform = `translateX(${TotalSlider}px)`;
        
        
    });
    
    // Al quitar el mouse de #hoverTarget, reanuda la animación
    AnimationPig.addEventListener('mouseleave', () => {

        let currentX =TotalSlider;
        let remainingDistance = 6048+(currentX); // Calcula lo que falta del recorrido
        let remainingTime = (remainingDistance / 6048) * 159; // Ajusta el tiempo proporcionalmente
        
        cambiarInicioTransform(currentX, remainingTime);
         
        //sliderPig.style.animation=''
        
    });

    sliderD.addEventListener("click", () => {
     TotalSlider=TotalSlider-112;
     sliderPig.style.transform = `translateX(${TotalSlider}px)`;
    });

    sliderI.addEventListener("click", () => {
        TotalSlider=TotalSlider+112;
        sliderPig.style.transform = `translateX(${TotalSlider}px)`;

    });

    Btranking.addEventListener("click", async() => {

        home.classList.add("mint_log");
        Inicio.classList.remove("press_log");
        nav.classList.remove("press_home");
        nav.classList.remove("press_game");
        nav.classList.remove("press");
        home.classList.remove("conectar");
        Seccion.classList.remove("Play_task");
        Seccion.classList.remove("log_discord"); 
        Seccion.classList.add("off");
       
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
        
        home.classList.add("mint_log");
        nav.classList.remove("press_rank");
        nav.classList.remove("press_home");
        nav.classList.remove("press_game");
        SeccionRank.classList.remove("Play_rank");
        home.classList.remove("conectar");
        Playgame.classList.remove("play");
        home.classList.remove("play");
        Seccion.classList.add("off");
        Seccion.classList.remove("Play_task");
        nav.classList.add("press");
        Seccion.classList.add("log_discord");
    });

    BThome.addEventListener("click", async() => {

        home.classList.add("mint_log");
        nav.classList.remove("press_rank");
        nav.classList.remove("press");
        nav.classList.remove("press_game");
        SeccionRank.classList.remove("Play_rank");
        Seccion.classList.remove("Play_task");
        Seccion.classList.add("off");
        nav.classList.add("press_home");
        Playgame.classList.add("play");
        home.classList.add("play");
        Seccion.classList.remove("log_discord");

    });

    BTmaqui.addEventListener("click", async() => {

        const coinRef =doc(db,"users",ID);
        const docCoin =await getDoc(coinRef);

        var Moneda =docCoin.data().moneda;

        if(Moneda>0){
        var totalMonedas= Moneda-1;

        await updateDoc(coinRef, { moneda: totalMonedas}, { merge: true });

        LBmoney.innerHTML=totalMonedas;

        SeccionGame.classList.add('off_maqui');
        }else{

         SeccionGame.classList.add('off2');
        }

    });
    
    BTgame.addEventListener("click", async() => {
        diaReset();

        const docRef = doc(db, "users", ID);
        const docClaim = await getDoc(docRef);

        let labelClaim = docClaim.data().claim;
        console.log("claim: "+labelClaim);


        if(labelClaim==false){
         
          if(veri==1){
            coins=coin;
          }
            LBcoin.innerHTML= coins;
            BoxTask.classList.remove("off_claim");
            BTCoin.innerHTML="CLAIM";

        }else{
            coins=0;
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
        Seccion.classList.remove("log_discord");
        Seccion.classList.add("off");
        nav.classList.add("press_game");
        Seccion.classList.add("Play_task");
        
    });

    BTCoin.addEventListener("click",async () => {

        
        let claim= true;

         LBcoin.innerHTML=0;
         BoxTask.classList.add("off_claim");

         const IdRef= doc(db, "users", ID);
         await updateDoc(IdRef, { claim:claim }, { merge: true });

         var refMonedas = await getDoc(IdRef);

         var antMonedas =refMonedas.data().moneda;
         console.log("Antmoneda: "+antMonedas);

         var Monedas=antMonedas+coins;
         console.log("monedas: "+ Monedas);

         await updateDoc(IdRef, { moneda: Monedas}, { merge: true });

         SeccionGame.classList.remove('off2');

         LBmoney.innerHTML=Monedas;
         BTCoin.innerHTML="CLAIMED";
         


    });
    BTRank_last.addEventListener("click", () => {

        Ranking.classList.add("on");

    });

    BTRank_now.addEventListener("click", () => {

        Ranking.classList.remove("on");

    });
     

    BTpremios.addEventListener("click", async() => {
      
        home.classList.add("in");

    });

    BTpremiosX.addEventListener("click", () => {

       home.classList.remove("in");

    });
    
    Vol1.addEventListener("change", () =>{

        var slider = 0 +"."+ Vol1.value;
        audio1.volume = slider;
        audio2.volume = slider;
        audio3.volume = slider;
        audio4.volume = slider;

        if(slider==0){
            BoxMusic.classList.add("off_vol");
        }else{
            BoxMusic.classList.remove("off_vol");
        }

    });

    Play1.addEventListener("click", () => {
        if(cont_music==true){
        audio1.play();
        audio2.pause();
        audio2.currentTime=0;
        audio3.pause();
        audio3.currentTime=0;
        audio4.pause();
        audio4.currentTime=0;
        }
    });
    Play2.addEventListener("click", () => {
        if(cont_music==true){
        audio1.pause();
        audio1.currentTime=0;
        audio2.play();
        audio3.pause();
        audio3.currentTime=0;
        audio4.pause();
        audio4.currentTime=0;
        }
    });
    Play3.addEventListener("click", () => {
        if(cont_music==true){
        audio1.pause();
        audio1.currentTime=0;
        audio2.pause();
        audio2.currentTime=0;
        audio3.play();
        audio4.pause();
        audio4.currentTime=0;
        }
    });
    Play4.addEventListener("click", () => {
        if(cont_music==true){
        audio1.pause();
        audio1.currentTime=0;
        audio2.pause();
        audio2.currentTime=0;
        audio3.pause();
        audio3.currentTime=0;
        audio4.play();
        }
    });

    Swith_M.addEventListener('change', () => {
      
     cont_music=!cont_music;
     console.log("switsh: "+ Swith_M.value);
        if(cont_music==false){

        cont_Ale=false;

        audio1.pause();
        audio1.currentTime=0;
        audio2.pause();
        audio2.currentTime=0;
        audio3.pause();
        audio3.currentTime=0;
        audio4.pause();
        audio4.currentTime=0;
        
        BoxCheck.classList.remove("ne");
        BoxMusic.classList.remove("en");
        BoxMusic.classList.remove("chek0");
        BoxMusic.classList.remove("chek");
        BoxMusic.classList.remove("chek1");

        
        } else{
            
            BoxMusic.classList.add("chek0");
            BoxCheck.classList.add("ne");
            
        }
    
    });
        
     Swith_Ale.addEventListener('change', () =>{

        cont_Ale=!cont_Ale;
        console.log("ale: "+Swith_Ale.value +cont_Ale);

        if(cont_Ale==false){
           BoxMusic.classList.remove("chek");

        audio1.pause();
        audio1.currentTime=0;
        audio2.pause();
        audio2.currentTime=0;
        audio3.pause();
        audio3.currentTime=0;
        audio4.pause();
        audio4.currentTime=0;
        } else{
            BoxMusic.classList.add("chek0");
            BoxMusic.classList.add("chek"); 
            BoxMusic.classList.remove("chek1");
            BoxMusic.classList.remove("en");
            Aleatorio();
        }

     });
     
     Swith_Sct.addEventListener('change',() =>{

        cont_Sct=!cont_Sct;
        if(cont_Sct==false){
            audio1.pause();
            audio1.currentTime=0;
            audio2.pause();
            audio2.currentTime=0;
            audio3.pause();
            audio3.currentTime=0;
            audio4.pause();
            audio4.currentTime=0;
            
            BoxMusic.classList.remove("en");
            BoxMusic.classList.remove("chek1");
    
            } else{
            BoxMusic.classList.add("en"); 
            BoxMusic.classList.remove("chek"); 
            BoxMusic.classList.add("chek1"); 
            cont_Ale=false;
            }

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

    Login2.addEventListener("click", (e) => {
       
        e.preventDefault();
        home.classList.remove("res");
        signUp.classList.remove("res");
        login.classList.remove("res");
        box.classList.remove("res");

    });


    BTreset.addEventListener("click", (e) => {
       
        e.preventDefault();

        home.classList.add("res");
        signUp.classList.toggle("res");
        login.classList.toggle("res");
        box.classList.add("res");

    });

    function inicio(){

        console.log("ale: "+ cont_Ale);
        if(cont_Ale==true){

            var autoVolum=0;
            Vol1.value=2;

            autoVolum=0+"."+Vol1.value;
            audio2.volume= autoVolum;
            audio2.currentTime=0;
            audio2.play();
            console.log("ale: "+ cont_Ale);

             BoxCheck.classList.add("ne");
             BoxMusic.classList.add("chek"); 
             BoxMusic.classList.add("chek0");
        }else{
            BoxMusic.classList.remove("chek"); 
        }
    }

    function Aleatorio(){
        var MusicPlay=randomPlay(4);

        switch(MusicPlay){
            case 0:
                audio1.play();
                audio1.currentTime=0;
                audio2.pause();
                audio2.currentTime=0;
                audio3.pause();
                audio3.currentTime=0;
                audio4.pause();  
            break;
            case 1:
                audio1.pause();
                audio1.currentTime=0;
                audio2.play();
                audio2.currentTime=0;
                audio3.pause();
                audio3.currentTime=0;
                audio4.pause();
            break;
            case 2:
                audio1.pause();
                audio1.currentTime=0;
                audio2.pause();
                audio2.currentTime=0;
                audio3.play();
                audio3.currentTime=0;
                audio4.pause();
            break;
            case 3:
                audio1.pause();
                audio1.currentTime=0;
                audio2.pause();
                audio2.currentTime=0;
                audio3.pause();
                audio3.currentTime=0;
                audio4.play();
            break;
        }
    }

    /*function getCurrentTranslateX() {
        const computedStyle = window.getComputedStyle(sliderPig);
        const matrix = new DOMMatrix(computedStyle.transform);
        return matrix.m41; // Extrae el valor de translateX
    }*/

        function ResetTransform() {
            // Elimina cualquier animación previa
            sliderPig.style.animation = "none";
        
            // Forzar un pequeño retraso para que el cambio tenga efecto
            void sliderPig.offsetWidth;
        
            // Aplicar nueva animación con el nuevo inicio
            sliderPig.style.animation = `scrollModificado 159s linear infinite`;
            
            // Crear una nueva regla de animación en CSS
            const styleSheet = document.styleSheets[0];
            styleSheet.insertRule(`
                @keyframes scroll{
                    0% {
                        transform: translateX(0px);
                    }
                    100% {
                        transform: translateX(calc(-112px * 54));
                    }
                }
            `, styleSheet.cssRules.length);
        }

        function cambiarInicioTransform(nuevoInicio, time) {
            // Elimina cualquier animación previa
            sliderPig.style.animation = "none";
        
            // Forzar un pequeño retraso para que el cambio tenga efecto
            void sliderPig.offsetWidth;
        
            // Aplicar nueva animación con el nuevo inicio
            sliderPig.style.animation = `scrollModificado ${time}s linear forwards`;
            
            // Crear una nueva regla de animación en CSS
            const styleSheet = document.styleSheets[0];
            styleSheet.insertRule(`
                @keyframes scrollModificado {
                    0% {
                        transform: translateX(${nuevoInicio}px);
                    }
                    100% {
                        transform: translateX(calc(-112px * 54));
                    }
                }
            `, styleSheet.cssRules.length);
        }
        
       function metadata(num){

            let jsonUrl = `./Meta_nft/${num}.json`;  // Ruta en el servidor
            const contMint=1793;

       fetch(jsonUrl)
       .then(response => {
        if (!response.ok) {
            throw new Error(`No se encontró el archivo: ${jsonUrl}`);
        }
        return response.json();
         })
         .then(nft => {
                let name= nft.name;
                let type= nft.attributes[0]?.trait_type;

                namePig.innerHTML= name;
                typePig.innerHTML=type;
         })
         .catch(error => console.error("Error al leer JSON:", error));
                             
                if(num>contMint){
                    mintPig.innerHTML="NOT MINT";
                    roapMap.classList.add("not");
                }else{
                    mintPig.innerHTML="MINT";
                    roapMap.classList.remove("not");
                }
        
    }

   async function lastTime(){

    const docReftime = doc(db, "timer", 'week');
    const doctime = await getDoc(docReftime);

    let lastDate= doctime.data();

    let timestamp= lastDate.lastRankin;
    last= timestamp.toDate();

    console.log("lastrankin: " +last);

    }

    async function diaReset(){

        const docReftime = doc(db, "timer", 'horaReset');
        const doctime = await getDoc(docReftime);
    
        let lasthour= doctime.data();
    
        let timestamp= lasthour.hora;
        reset= timestamp.toDate();
    
        console.log("horaReset: " +reset);
    
        }

        //Nfts Metadatos Metamask

     async function getNFTsFromOpenSea() {
        
            BoxWallet.classList.add("carga");

            if (!window.ethereum) {
              console.log("MetaMask no está instalado");
              return;
            }
            
            try {
              // Solicitar acceso a la cuenta de MetaMask
              const accounts = await window.ethereum.request({ method: "eth_requestAccounts" });

              const userAddress = accounts[0];

              console.log("Cuenta conectada:", userAddress);

              const chainId = await window.ethereum.request({ method: "eth_chainId" });
              
    if (chainId !== "0x89") {
      alert("Por favor, cambia a la red Polygon en MetaMask.");
      /*const confirmacion = confirm("Por favor, cambia a la red Polygon en MetaMask. ¿Quieres cambiar a la red requerida?");

      if (confirmacion) {
        try {
        await window.ethereum.request({
        method: "wallet_switchEthereumChain",
        params: [{ chainId: "0x89" }], // 0x89 es el Chain ID de Polygon Mainnet
      });

      alert("Red cambiada con éxito.");
       }catch (error) {
        alert("La red no está disponible en MetaMask. Agrégala manualmente.");
        return;
    }*/
      BoxWallet.classList.remove("carga");
      return;
    } else {
      console.log("red correcta");
  }

     const provider = new ethers.providers.Web3Provider(window.ethereum);
    //const provider = ethers.getDefaultProvider("");
     const contract = new ethers.Contract(NFT_CONTRACT_ADDRESS, NFT_ABI , provider);
     
     const balance = await contract.balanceOf(userAddress);
     console.log(`Tienes ${balance} NFT(s)`);

     const tokens = await contract.tokensOfOwner(userAddress);
     console.log(tokens);

     const hexValues = tokens.map(bn => bn._hex);
     console.log(hexValues);

     let uri="";

    let nfts = [];

    for (let i=0; i<balance; i++) {
        try {
            // Obtener ID del NFT (si el contrato implementa Enumerable)
            const tokenId = parseInt(hexValues[i], 16);
            console.log(tokenId);

            // Obtener la URI del NFT
            const tokenURI = await contract.tokenURI(tokenId);
            console.log(tokenURI);

            if (tokenURI.startsWith("ipfs://")) {

            uri= tokenURI.replace("ipfs://", "https://ipfs.io/ipfs/");
            console.log(uri);
            }

            const response = await fetch(uri);
            const metadata = await response.json(); // Leer JSON

            const name= metadata.name;
            let imageUrl = metadata.image;
    
            // Convertir IPFS a HTTPS si la imagen también es IPFS
            if (imageUrl.startsWith("ipfs://")) {
                imageUrl = imageUrl.replace("ipfs://", "https://ipfs.io/ipfs/");
            }

            nfts.push({ name: name.toString() ,tokenId: tokenId.toString(), imageUrl });
        } catch (error) {
            console.log(`Error obteniendo NFT en índice ${i}:`, error);
          }
         }

            console.log("NFTs encontrados:", nfts);

            BoxWallet.classList.add("conect");
            titleWallet.innerHTML="Wallet Connected";
            BoxWallet.classList.remove("carga");
            
              Address.innerHTML=userAddress;

              coins=3*balance;
              console.log("coins: "+coins);
              const col=doc(db, "users", ID);
              await updateDoc(col, { piggys:`${balance}`}, { merge: true });
          
              // Mostrar NFTs en la página
              displayNFTs(nfts);
              
            }catch (error) {
              alert("La red no está disponible en MetaMask. Agrégala manualmente.");
              return;
            }
          } 
          
   
   function displayNFTs(nfts) {

       const nftContainer = document.querySelector(".nftContainer");
  
       nftContainer.innerHTML = ""; // Limpiar antes de agregar nuevos NFTs
  
    if (nfts.length === 0) {
      nftContainer.innerHTML = "<p>No tienes NFTs en Polygon.</p>";
      return;
    }
  
    nfts.forEach((nft, index) => {
      const nftElement = document.createElement("div");

      nftElement.classList.add("nftItem");

      nftElement.innerHTML = `
        <img id="nft${index}" class="nftImage" src="${nft.imageUrl}" alt="NFT">
        <p><strong>${nft.name || "NFT Desconocido"}</strong></p>
        <p>ID: ${nft.tokenId}</p>
        <p>Avatar #:${index}</p>
      `;
  
      nftContainer.appendChild(nftElement);
     

    });

    document.querySelectorAll(".nftImage").forEach(img => {
        img.addEventListener("click", async(event) => {
            const clickedNFT = event.target; // La imagen que se ha clickeado
            const parentDiv = clickedNFT.closest(".nftItem"); // Contenedor del NFT clickeado

            if (parentDiv) {
                const name = parentDiv.querySelector("p strong").textContent;
                const id = parentDiv.querySelector("p:nth-of-type(2)").textContent.replace("ID: ", "");
                const Url_avatar=`${event.target.src}`;
                console.log(`NFT clickeado: ${name}, ID: ${id}`);
                console.log("SRC: "+ `${event.target.src}`);
                
                // Aquí puedes ejecutar la acción que necesites
                alert(`Has seleccionado el NFT: ${name} con ID ${id}`);

                AvatarUser.style.background =`url(${event.target.src})`;
                AvatarUser.style.backgroundSize = "70px 94px";
                AvatarUser.style.backgroundPosition = "center";
             
                const col=doc(db, "users", ID);
                await updateDoc(col, { imgAvatar: Url_avatar}, { merge: true });
             
            }
        });
    });
  }

    // Simulación de cambio de página
    function navigateTo(page) {
        console.log(page);
        history.pushState({page: page}, "", `#${page}`);

        sessionStorage.setItem("currentPage", page);

        let secc1 =sessionStorage.getItem("currentPage");

       console.log("link2: "+secc1);

    }

    function randomPlay(max){
        var num =Math.floor(Math.random()*max);
        console.log("num: "+num);
        return num;
    }

    async function weekRewards(){
      let fileGift;
      let textGift;
      var contGift=0;

       const Premio1 = document.querySelector('#img_P1');
       const Premio2 = document.querySelector('#img_P2'); 
       const Premio3 = document.querySelector('#img_P3');
       const Premio4 = document.querySelector('#img_P4');
       const Premio5 = document.querySelector('#img_P5');

       const text1=document.querySelector('#L_P1');
       const text2=document.querySelector('#L_P2');
       const text3=document.querySelector('#L_P3');
       const text4=document.querySelector('#L_P4');
       const text5=document.querySelector('#L_P5');

       const topRef =collection(db, "rewards");
       const q = query(topRef, orderBy("top"), limit(5));
       const querySnapshot = await getDocs(q);

        querySnapshot.forEach((doc) =>{

            fileGift=doc.data().reward;
            textGift=doc.data().text;
           
          const rewardRef = ref(imageRef, fileGift); 
          
            console.log("premio: "+rewardRef);
             console.log("cont: "+contGift); 

            switch(contGift){
                case 0:
                    getDownloadURL(rewardRef).then((url) => {
                    Premio1.setAttribute('src', url);
                });
                    text1.innerHTML=textGift;
                    console.log("cont1: "+contGift); 
                break;

                case 1:
                    getDownloadURL(rewardRef).then((url) => {
                    Premio2.setAttribute('src', url); 
                    });
                    text2.innerHTML=textGift;
                    console.log("cont1: "+contGift);  
                break;

                case 2:
                    getDownloadURL(rewardRef).then((url) => {
                    Premio3.setAttribute('src', url);
                    });
                    text3.innerHTML=textGift;
                    console.log("cont1: "+contGift); 
                break;

                case 3:
                    getDownloadURL(rewardRef).then((url) => {
                    Premio4.setAttribute('src', url);
                    });
                    text4.innerHTML=textGift;
                    console.log("cont1: "+contGift); 
                break;

                case 4:
                    getDownloadURL(rewardRef).then((url) => {
                    Premio5.setAttribute('src', url);
                    });
                    text5.innerHTML=textGift;
                    console.log("cont1: "+contGift); 
                break;
            }
             contGift++;    
        });

    }

}); 
