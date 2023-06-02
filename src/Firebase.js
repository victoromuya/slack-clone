import firebase from 'firebase/compat/app';
import 'firebase/compat/auth';
import 'firebase/compat/firestore';


const firebaseConfig = {
    apiKey: "AIzaSyCnDsJpzg8WlgFTgNG5XDj--a-MI6DFF4E",
    authDomain: "slack-clone-2d97d.firebaseapp.com",
    projectId: "slack-clone-2d97d",
    storageBucket: "slack-clone-2d97d.appspot.com",
    messagingSenderId: "309321190583",
    appId: "1:309321190583:web:601ba2bfb6486a0de65132"
  };


  const firebaseApp = firebase.initializeApp(firebaseConfig);
  const db = firebaseApp.firestore();
  const auth = firebase.auth();
  const provider = new firebase.auth.GoogleAuthProvider();
  
  export {db, provider, auth}