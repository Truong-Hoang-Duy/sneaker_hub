const firebaseConfig = {
  apiKey: "AIzaSyCh2ocBXjFtcjh1QqAZsD3Exgm7Vy6d08o",
  authDomain: "sneaker-store-ad8a2.firebaseapp.com",
  projectId: "sneaker-store-ad8a2",
  storageBucket: "sneaker-store-ad8a2.firebasestorage.app",
  messagingSenderId: "646768039062",
  appId: "1:646768039062:web:22855306458e1600365eb7",
};

const firebaseApp = firebase.initializeApp(firebaseConfig);
console.log(firebaseApp.name);

const db = firebase.firestore();
