import firebase from 'firebase';
const firebaseConfig = {
    apiKey: "AIzaSyD8JaYd-O6ExED_U0vqyt2KMLTAlk5evFk",
    authDomain: "store-65958.firebaseapp.com",
    projectId: "store-65958",
    storageBucket: "store-65958.appspot.com",
    messagingSenderId: "190407125990",
    appId: "1:190407125990:web:d6c82f68cffa5905f50427",
    measurementId: "G-JB0HCHHZH0"
  };

  firebase.initializeApp(firebaseConfig);

//   export
export const auth = firebase.auth();
 export const googleAuthProvider = new firebase.auth.GoogleAuthProvider();

