import { defineStore } from 'pinia'
import { ref } from 'vue'
import { auth } from '../firebaseConfig';
import { createUserWithEmailAndPassword, signInWithEmailAndPassword, signOut, onAuthStateChanged, sendEmailVerification, sendPasswordResetEmail, updateProfile } from 'firebase/auth';
import router from '../router';

export const useUserStore = defineStore('userStore', () => {
  const userData = ref(null);
  const cargandoUsuario = ref(false);
  const cargando = ref(false);
  const defaultPhoto = 'https://www.pngitem.com/pimgs/m/78-788231_icon-blue-company-icon-png-transparent-png.png';

  const crearUsuario = async (nombre, email, pass) => {
    cargandoUsuario.value = true;

    try {
      await createUserWithEmailAndPassword(auth, email, pass);
      await updateProfile(auth.currentUser, {displayName: nombre, photoURL: defaultPhoto});
      await sendEmailVerification(auth.currentUser);
      await signOut(auth);
      return 'Se ha enviado un correo de verificación.'
      
    } catch (error) {
        console.log(error.code, error.message);
        return 'Hubo un problema.'

    } finally {
      cargandoUsuario.value = false;
    }
  };

  const logearUsuario = async (email, pass) => {
    cargandoUsuario.value = true;

    try {
      const { user } = await signInWithEmailAndPassword(auth, email, pass);

      if(auth.currentUser.emailVerified){
        userData.value = {nombre: auth.currentUser.displayName, email: user.email, foto: auth.currentUser.photoURL, uid: user.uid};
        router.push("/");

      } else {
        await signOut(auth);
        return 'Debes verificar tu correo.';      
      }

    } catch (error) {
      console.log(error.code, error.message);
      return error.code == 'auth/wrong-password' || 'auth/user-not-found' ? 'Datos incorrectos.' : error.code;

    } finally {
      cargandoUsuario.value = false;
    }
  };
  
  const salirUsuario = async () => {
    try {
      await signOut(auth);
      userData.value = null;
      router.push("/autenticacion"); 

    } catch (error) {
      console.log(error.code, error.message);
    }
  };

  const usuarioActual = () => {
    return new Promise((resolve, reject) => {
      const unsubscribe = onAuthStateChanged(auth, user => {
        if (user) {
          userData.value = {nombre: user.displayName, email: user.email, foto: user.photoURL, uid: user.uid};

        } else {
          userData.value = null;
        }

        resolve(user);
      }, e => reject(e));

      unsubscribe();
    });
  }

  const emailCambioPass = async email => {
    try {
      await sendPasswordResetEmail(auth, email);
      return 'Se ha enviado un correo de recuperación.';
    } 

    catch (error) {

      if(error.code == 'auth/user-not-found' || 'auth/invalid-email') {
        return 'Usuario no encontrado / Email Inválido.';
      }

      else if(error.code == 'auth/too-many-requests') {
        return 'Ha hecho muchas solicitudes.';
      }

      else {
        return error.code;
      }
    };
  };

  const updateName = async name => {
    try {
      await updateProfile(auth.currentUser, { displayName: name});
      userData.value = {...userData.value, nombre: name};
      return 'Informacion actualizada.';

    } catch (error) {
      console.log(error.code, error.message);
      return 'Hubo un problema.';
    }
  };

  const emailVerified = async () => auth.currentUser.emailVerified;

  return {
    auth,
    router,
    userData,
    cargandoUsuario,
    cargando,
    crearUsuario,
    logearUsuario,
    salirUsuario,
    usuarioActual,
    emailCambioPass,
    updateName,
    emailVerified
  };
});
