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

  //Hide Alert Message After Seven Seconds(6)
  setTimeout(function() {
    document.querySelector('.alert').style.display = 'none';
  }, 10000);

  //Form Reset After Submission(7)
  document.getElementById('registrationform').reset();

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

            var keys = Object.keys(obj);
            var key = keys[0];

            upRef = firedb.ref('xi/' + subpath +'/'+ key);
            console.log(">>> " + upRef);

            // 이미 등록된 경우, 신중하게 처리
            var cInfo = month +"월 " + day +"일 "+ time +"타임";
            var msg = "중복된 동호수("+ dong +"-"+ ho +")가 있습니다. 계속 진행할 경우 현재 값("+ cInfo +")으로 변경됩니다!";
            if (confirm(msg)) {
                var upDict = {}
                upDict["month"] = parseInt(month);
                upDict["day"] = parseInt(day);
                upDict["time"] = time;
                upRef.update(upDict);
                //Show Alert Message(5)
                document.querySelector('.alert').style.display = 'block';
                redirectView(dong, ho);
            } else {
                alert("취소 되었습니다.");
            }
        } else {
            var cInfo = month +"월 " + day +"일 "+ time +"타임";
            var msg = "입력한 동호수는 <"+ dong +"동 "+ ho +"호> 입니다. 맞는지 한번 더 확인해주세요!";
            if (confirm(msg)) {
                let newFormMessage = firedbref.push();
                var dict = {}
                dict["dong"] = parseInt(dong);
                dict["ho"] = parseInt(ho);
                dict["month"] = parseInt(month);
                dict["day"] = parseInt(day);
                dict["time"] = time;
                newFormMessage.set(dict);
                //Show Alert Message(5)
                document.querySelector('.alert').style.display = 'block';
                redirectView(dong, ho);
            } else {
                alert("취소 되었습니다.");
            }
        }
    });
}

function redirectView(dong, ho) {
  // redirect
//  setTimeout(function() {
//    window.location.href='view.html?dong='+ dong +'&line='+ getLine(dong, ho);
//  }, 1500);
    let link = "view.html?dong="+ dong +"&line="+ getLine(dong, ho);
    let m =  "<button type='button' onclick='window.location.href=\""+ link +"\"'>동/호 화면으로 이동</button>";
    document.querySelector('#moveView').innerHTML = m;
}
