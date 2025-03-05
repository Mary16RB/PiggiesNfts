import {sendEmailVerification  ,createUserWithEmailAndPassword} from "https://www.gstatic.com/firebasejs/10.4.0/firebase-auth.js";
import { auth, db } from '../Scripts/firebase.js';
import { ID } from '../Scripts/LogIn.js';
import { doc, collection, setDoc, getDoc} from "https://www.gstatic.com/firebasejs/10.10.0/firebase-firestore.js";


const signupForm =document.querySelector("#signUp_form");
const home = document.querySelector(".home");
const login = document.querySelector(".login");
const signUp =document.querySelector(".singUp");
var registrado;

signupForm.addEventListener('submit', async (e) => {
    e.preventDefault();

   console.log("hola");
   const DatosEmail = signupForm ['usuarioNuevo'].value;
    const DatosPass =  signupForm ['contraseñaNueva'].value;                
    const DatosConfirma  = signupForm ['confirma'].value;     

   console.log("Email: "+DatosEmail);
   console.log("Password: "+DatosPass);
   console.log("PassConfirmado: "+DatosConfirma);

   if(DatosPass==DatosConfirma){
    try{
    const credencialesUsuario= await  createUserWithEmailAndPassword(auth, DatosEmail, DatosPass );
      
    
    console.log(credencialesUsuario);
     alert("Registro exitoso");

      sendEmailVerification(auth.currentUser).then(async () => {

        const UserId = ID;
        console.log(UserId);

      registrado= true;

      const userCollectionRef = collection(db, "users");
      const docRef = await setDoc(doc(userCollectionRef, UserId), {
        avatar: "New User",
        score: 0,
        register: registrado,
        moneda:0,
        claim:false,
        imgAvatar:"",
        piggys:0
      });
  

        alert("Se a enviado correo de verificación");
      });

     home.classList.remove("active");
     signUp.classList.remove("active");
     login.classList.remove("active");
     

    }
    catch(error){
     console.log(error);
     const errorCode = error.code;

     if(errorCode == 'auth/network-request-failed'){
      alert("Este correo ya esta registrado");
     }
      else if(errorCode == 'auth/invalid-email'){
        alert("Este correo es invalido");
     } else if(errorCode == 'auth/weak-password'){
      alert("El password debe tener mas de 6 caracteres");
   }

   }
  }
   else{
    alert("Pasword no coincide");
   }
   
});

