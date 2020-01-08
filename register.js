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
  let txtDate = document.querySelector('#txtDate').value;
  let time= document.querySelector('#time').value;

  ss = txtDate.split("-");
  month= ss[1]; day = ss[2];
  
  //send message values
  sendMessage(dong, ho, month, day, time);

  //Show Alert Message(5)
  document.querySelector('.alert').style.display = 'block';

  //Hide Alert Message After Seven Seconds(6)
  setTimeout(function() {
    document.querySelector('.alert').style.display = 'none';
  }, 5000);

  //Form Reset After Submission(7)
  document.getElementById('registrationform').reset();
  // redirect
  setTimeout(function() {
    window.location.href='view.html?dong='+ dong +'&line='+ getLine(dong, ho);
  }, 5000);
}

//Send Message to Firebase(4)

function getLine(dong, ho) {
  if (dong == "112" || dong == "113" || dong == "114") {
      if (ho % 10 >= 4) line = "L45";
      else line = "L123"
  } else {
      if (ho % 10 >= 5) line = "L56";
      else if (ho % 10 >= 3) line = "L34";
      else line = "L12";
  }
  return line;
}

function sendMessage(dong, ho, month, day, time) {

    let subpath = dong+"/" + getLine(dong, ho);
    let firedbref = firedb.ref("xi/"+ subpath);

    let q = firedbref.orderByChild("ho").equalTo(parseInt(ho));
    q.once('value').then(function(snapshot) {
        let obj = snapshot.val();
        if (obj != null) {
            let list = Object.keys(obj).map(key => {
                  return key
                });

            upRef = firedb.ref('xi/' + subpath +'/'+ list[0]);
            console.log("AAAA " + upRef);
            upRef.update({
              month: parseInt(month),
              day: parseInt(day),
              time: time
            });
        } else {
          let newFormMessage = firedbref.push();
          newFormMessage.set({
            dong: parseInt(dong),
            ho: parseInt(ho),
            month: parseInt(month),
            day: parseInt(day),
            time: time
          });
        }
    });
}
