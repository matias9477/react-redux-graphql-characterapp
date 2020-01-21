import firebase from 'firebase/app';
import 'firebase/auth';
import 'firebase/firestore';

 let firebaseConfig = {
    apiKey: "AIzaSyB9daNqISf1u0040csctUX4iMhp-WNBpMQ",
    authDomain: "curso-redux-5f313.firebaseapp.com",
    databaseURL: "https://curso-redux-5f313.firebaseio.com",
    projectId: "curso-redux-5f313",
    storageBucket: "curso-redux-5f313.appspot.com",
    messagingSenderId: "200658564897",
    appId: "1:200658564897:web:c06f8f0ee26db63be33060",
    measurementId: "G-4ELP129BRJ"
  };

  firebase.initializeApp(firebaseConfig);

  let db = firebase.firestore().collection('favs')

  export function updateDB(array, uid){
      return db.doc(uid).set({array})
  }

  export function getFavs(uid){
      return db.doc(uid).get()
      .then(snap =>{
          return snap.data().array
      })
  }

  export function loginWithGoogle(){
      let provider = new firebase.auth.GoogleAuthProvider();
      return firebase.auth().signInWithPopup(provider)
      .then(snap=> snap.user)
  }

  export function signOutGoogle(){
      firebase.auth().signOut()
  }