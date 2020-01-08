let firedbref = firedb.ref('xi/109/L12');

let vals;
// let q = firedb.orderByChild("dong").equalTo(101);
firedbref.once('value').then(function(snapshot) {
    console.log(snapshot.val());
    let obj = snapshot.val();
    let list = Object.keys(obj).map(key => {
          return {
            id: key,
            ho: obj[key].ho,
            day: obj[key].day,
            time: obj[key].time
          }
        });
    console.log(list);

    list.forEach(function (o) {
        console.log(o.ho + " "+ o.day);
        s = document.querySelector('#m2-'+ o.day +'-'+ o.time);
        if (!s.innerText || s.innerText.length <= 1) {
            s.innerHTML = " <span class='badge badge-info'>"+ o.ho +"</span>";
        }
        else {
            s.innerHTML += " <span class='badge badge-danger'>"+ o.ho +"</span>";
        }
    });
});


