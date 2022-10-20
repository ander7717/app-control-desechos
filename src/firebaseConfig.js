import { initializeApp } from "firebase/app";
import { getAuth, setPersistence, browserSessionPersistence } from "firebase/auth";

const firebaseConfig = {
  apiKey: "AIzaSyBZ36k3LxUvAxmdg6drZkooljiHPnsQUW8",
  authDomain: "sistema-control-desechos.firebaseapp.com",
  projectId: "sistema-control-desechos",
  storageBucket: "sistema-control-desechos.appspot.com",
  messagingSenderId: "580462217515",
  appId: "1:580462217515:web:f0f0d8a68d201b2f2add6e"
};

initializeApp(firebaseConfig);

const auth = getAuth();
auth.languageCode = 'es';

const sessionPersistence = async () => {
  try {
    await setPersistence(auth, browserSessionPersistence);
  } catch (error) {
    console.log(error.code, error.message);
  }
};

sessionPersistence();

export { auth };