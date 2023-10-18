
import { initializeApp } from "firebase/app";
import { getAuth, GoogleAuthProvider} from "firebase/auth";


const firebaseConfig = {
  apiKey: "AIzaSyBsA1slDC_9H33tavtTgl2T4epHwNrsxt0",
  authDomain: "ecommerce-site-5cd05.firebaseapp.com",
  projectId: "ecommerce-site-5cd05",
  storageBucket: "ecommerce-site-5cd05.appspot.com",
  messagingSenderId: "901054029877",
  appId: "1:901054029877:web:4a45d3e9f9463e4c97117c",
  measurementId: "G-5YEFWQCXFR"
};

// Initialize Firebase
export const app = initializeApp(firebaseConfig);
export const auth = getAuth(app);
export const googleProvider = new GoogleAuthProvider();