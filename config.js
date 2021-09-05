import firebase from "firebase"

var firebaseConfig = {
    apiKey: "AIzaSyBGJgp5vgwA4UAQjE3GXX46EUCVrnKYvow",
    authDomain: "book-santa-506fa.firebaseapp.com",
    projectId: "book-santa-506fa",
    storageBucket: "book-santa-506fa.appspot.com",
    messagingSenderId: "661431359394",
    appId: "1:661431359394:web:260413d8a41ea4b01104fb"
  };
  // Initialize Firebase
  firebase.initializeApp(firebaseConfig);

  export default firebase.firestore()