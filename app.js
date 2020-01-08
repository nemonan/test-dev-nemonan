// Initialize Firebase(2)
  var firebaseConfig = {
    apiKey: "AIzaSyCzGU1Hmp4DS-5A5h3PKwaUTF3mH8pnpXA",
    authDomain: "knemonan.firebaseapp.com",
    databaseURL: "https://knemonan.firebaseio.com",
    projectId: "knemonan",
    storageBucket: "knemonan.appspot.com",
    messagingSenderId: "829116912205",
    appId: "1:829116912205:web:a16ec2527592e186298204"
  };
firebase.initializeApp(firebaseConfig);

//Reference for form collection(3)
let firedb = firebase.database();
