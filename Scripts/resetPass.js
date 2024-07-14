import {sendPasswordResetEmail} from "https://www.gstatic.com/firebasejs/10.4.0/firebase-auth.js";
import {auth} from '../Scripts/firebase.js';

const ResetPassword = document.querySelector('#resetPasswordForm');
const home = document.querySelector(".home");

ResetPassword.addEventListener('submit', (e) => {
    e.preventDefault();
    const email = ResetPassword['email'].value;

    console.log("emailPass: "+email);
    sendPasswordResetEmail(auth, email)
      .then(() => {
        // Correo enviado
        alert('Enlace de restablecimiento de contraseña enviado. Revisa tu correo electrónico.');
        console.log("correo enviado");
        home.classList.add('onAlert'); 
        setTimeout(function(){
            home.classList.remove('onAlert');    
           }, 3000);
           
      })
      .catch((error) => {
        // Manejar errores
        console.error('Error al enviar el enlace de restablecimiento de contraseña:', error);
        alert('Hubo un error al enviar el enlace de restablecimiento de contraseña. Por favor, inténtalo de nuevo.');
      });
  });