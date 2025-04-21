import {onAuthStateChanged,setPersistence, browserLocalPersistence, signInWithEmailAndPassword} from "https://www.gstatic.com/firebasejs/10.4.0/firebase-auth.js";
import { auth, db } from '../Scripts/firebase.js';
import '../Scripts/SignUp.js';
import { doc, collection, setDoc, getDoc,updateDoc} from "https://www.gstatic.com/firebasejs/10.10.0/firebase-firestore.js"; 
import { ethers } from "https://cdnjs.cloudflare.com/ajax/libs/ethers/5.7.2/ethers.esm.min.js";
export var verificado;
export var ID;
export var coin;
export var veri;


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

const loginForm = document.querySelector("#login_form");
const Playgame = document.querySelector("#apple_game");
const home = document.querySelector(".home");
const nav = document.querySelector(".navega");
const Head = document.querySelector(".header");
const Seccion= document.querySelector("body");
const SeccionRank= document.querySelector("body");
const Inicio= document.querySelector("#logo");
const AvatarUser=document.querySelector(".avatar");

const ticketScore = document.querySelector("#Score_ticks");
const LBmoney =document.querySelector('#Score_money');
const information = document.querySelector(".info");
const login = document.querySelector(".login");

const BoxTask= document.querySelector(".box_task");
const BTCoin= document.querySelector("#bt_Coin");
const LBcoin =document.querySelector('#Coin-10');
const BoxWallet= document.querySelector(".box_wallet");
const titleWallet= document.querySelector(".conect_wallet");
const Address=document.querySelector("#Add");

const UserName=  document.querySelector("#avatar_name");
let token;
let docRef;
let docSnap;

setPersistence(auth, browserLocalPersistence)
  .then(() => {
    console.log("Persistencia de sesión configurada.");
  })
  .catch((error) => {
    console.error("Error al configurar la persistencia de sesión:", error);
  });

loginForm.addEventListener('submit', async (e) => {
    e.preventDefault();

    const email =loginForm['usuario'].value;
    const pass =loginForm['contraseña'].value;
    console.log("Email: "+email, "Password: "+pass);
    

  try{
    const credecial = await  signInWithEmailAndPassword(auth, email, pass );
    
    console.log(credecial);
    
    const docRef = doc(db, "users", ID);
    const docSnap = await getDoc(docRef);

if (docSnap.exists()) {
  
  token= 1;
  coin=3;
  veri=0;
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
    home.classList.add("mint_log");

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

});

onAuthStateChanged(auth,(user) => {

   
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
   veri=0;
   coin=3;
   console.log("verificacion: "+veri);
  let currentPage = sessionStorage.getItem("currentPage");
  
   console.log("login2: "+authToken);
   
  if (authToken==1) {
  docRef = doc(db, "users", ID);
  docSnap = await getDoc(docRef);

   VerificaMeta();

  UserName.innerHTML= docSnap.data().avatar;
  ticketScore .innerHTML=docSnap.data().score;
  LBmoney.innerHTML=docSnap.data().moneda; 
  let labelClaim = docSnap.data().claim;
   console.log("claim: "+labelClaim);

  let avar= docSnap.data().imgAvatar;
  console.log(avar);

  AvatarUser.style.background =`url(${avar})`;
  AvatarUser.style.backgroundSize = "70px 94px";
  AvatarUser.style.backgroundPosition = "center";

  home.classList.remove("show");
  nav.classList.add("play");
  Head.classList.add("log");
  nav.classList.add("log");
  login.classList.add("active");
  Seccion.classList.add("off");
  home.classList.remove("mint_log");

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
        home.classList.add("mint_log");
      break;

    case "Task":

    if(labelClaim==false){
     
        LBcoin.innerHTML=coin;
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
      home.classList.add("mint_log");

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
      home.classList.add("mint_log");

      break; 
    
    case "SOON":
      console.log("El kilogramo de naranjas cuesta $0.59.");
      home.classList.add("mint_log");
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

async function VerificaMeta() {

      

        try{
        const contVari=await window.ethereum.request({
            method: "eth_accounts",
            params: [],
           });

           console.log("Verit: "+ contVari);

           if (contVari.length > 0) {
           const userAddress= contVari[0];
           
           const chainId = await window.ethereum.request({ method: "eth_chainId" });

           if (chainId !== "0x89") {
             
            alert("Cambia a la red de Polygon en Metamask.");
            return
             
         }
         
           BoxWallet.classList.add("carga");
           titleWallet.innerHTML="Connecting Wallet";

           const provider = new ethers.providers.Web3Provider(window.ethereum);
           //const provider = ethers.getDefaultProvider("");
            const contract = new ethers.Contract(NFT_CONTRACT_ADDRESS, NFT_ABI , provider);
            
            const balance = await contract.balanceOf(userAddress);
            console.log(`Tienes ${balance} NFT(s)`);
            
            coin=coin*balance; 
            veri=1;
            console.log("verificacion: "+veri);

            let labelClaim = docSnap.data().claim;
            if(labelClaim==false){
     
              LBcoin.innerHTML=coin;
      
          }else{
              LBcoin.innerHTML=0;
          }

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

             Address.innerHTML= userAddress;

            console.log("coins: "+coin);


            const col=doc(db, "users", ID);
            await updateDoc(col, { piggys:`${balance}`}, { merge: true });
            // Mostrar NFTs en la página
            displayNFTs(nfts);
        }else{
            veri=0;
            coin=0;
             BoxWallet.classList.remove("conect");
            titleWallet.innerHTML="Connect your Wallet";
            Address.innerHTML= "Wallet not connected";
            console.log("wallet no verificada");
        }
        }catch (error) {
            console.error("wallet no verificada:", error);
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
       <p>Avatar: #${index+1}</p>
     `;
 
     nftContainer.appendChild(nftElement);
    

   });

   document.querySelectorAll(".nftImage").forEach(img => {
       img.addEventListener("click", async (event) => {
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