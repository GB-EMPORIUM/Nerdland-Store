// CONFIGURAZIONE FIREBASE
const firebaseConfig = {
    apiKey: "AIzaSyDoroNnQK-okZZymVjZ7JUVde0IcrU-uts",
    authDomain: "nerland-store.firebaseapp.com",
    databaseURL: "https://nerland-store-default-rtdb.europe-west1.firebasedatabase.app",
    projectId: "nerland-store",
    storageBucket: "nerland-store.appspot.com",
    messagingSenderId: "761707837600",
    appId: "1:761707837600:web:2fc79a4cd6389e32dab1c5",
    measurementId: "G-45H0NCBXNB"
};

// INIZIALIZZA FIREBASE
firebase.initializeApp(firebaseConfig);
const db = firebase.database();
