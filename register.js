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
    if (dong == "112" || dong == "113" || dong == "114") {
        if (ho % 10 >= 4) line = "L45";
        else line = "L123"
    } else {
        if (ho % 10 >= 5) line = "L56";
        else if (ho % 10 >= 3) line = "L34";
        else line = "L12";
    }

    let firedbref = firedb.ref("xi/"+dong+"/" + line);
    let newFormMessage = firedbref.push();
    newFormMessage.set({
        dong: parseInt(dong),
        ho: parseInt(ho),
        month: parseInt(month),
        day: parseInt(day),
        time: time
    });
}
