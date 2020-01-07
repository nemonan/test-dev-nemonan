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
let formMessage = firebase.database().ref('xi');

//listen for submit event//(1)
document
  .getElementById('registrationform')
  .addEventListener('submit', formSubmit);

//Submit form(1.2)
function formSubmit(e) {
  e.preventDefault();
  // Get Values from the DOM
  let dong = document.querySelector('#dong').value;
  let ho = document.querySelector('#ho').value;
  let month = document.querySelector('#month').value;
  let day = document.querySelector('#day').value;
  let time= document.querySelector('#time').value;
  
  //send message values
  sendMessage(dong, ho, month, day, time);

  //Show Alert Message(5)
  document.querySelector('.alert').style.display = 'block';

  //Hide Alert Message After Seven Seconds(6)
  setTimeout(function() {
    document.querySelector('.alert').style.display = 'none';
  }, 7000);

  //Form Reset After Submission(7)
  document.getElementById('registrationform').reset();
}

//Send Message to Firebase(4)

function sendMessage(dong, ho, month, day, time) {
  let newFormMessage = formMessage.push();
  newFormMessage.set({
    dong: parseInt(dong),
    ho: parseInt(ho),
    month: parseInt(month),
    day: parseInt(day),
    time: time
  });
}