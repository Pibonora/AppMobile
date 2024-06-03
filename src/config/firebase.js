import AsyncStorage from "@react-native-async-storage/async-storage";
import { initializeApp } from "firebase/app";
import { initializeAuth, getReactNativePersistence } from "firebase/auth";
import "firebase/analytics";

const firebaseConfig = {
 
  apiKey: process.env.APIKEY,
  authDomain: process.env.AUTHDOMAIN,
  projectId: process.env.PROJECTID,
  storageBucket: process.env.STORAGEBUCKET,
  messagingSenderId: process.env.MESSAGINGSENDERID,  
  appId: process.env.APPID  

};

const app = initializeApp(firebaseConfig);

const auth = initializeAuth(app,{
    persistence:getReactNativePersistence(AsyncStorage)

});

export {auth};  
