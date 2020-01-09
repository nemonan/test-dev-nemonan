let params = getJsonFromUrl();
viewTitle.innerText = params.dong + " 동 "+ params.line.replace("L", "") +"호 라인";

let subpath = params.dong +"/"+ params.line;
let firedbref = firedb.ref('xi/' + subpath);

firedbref.once('value').then(function(snapshot) {
//    console.log(snapshot.val());
    let obj = snapshot.val();
    if (obj != null) {
//        let list = Object.keys(obj).map(key => {
//              return {
//                id: key,
//                ho: obj[key].ho,
//                month: obj[key].month,
//                day: obj[key].day,
//                time: obj[key].time
//              }
//            });

        var list = []
        var keys = Object.keys(obj);
        for (var i = 0; i<keys.length;i++) {
            var key = keys[i]
            var dict = {}
            dict["id"] = key;
            dict["ho"] = obj[key].ho;
            dict["month"] = obj[key].month;
            dict["day"] = obj[key].day;
            dict["time"] = obj[key].time;
//            console.log(dict);
            list.push(dict);
        }

        list.forEach(function (o) {
//            console.log(o.ho + " "+ o.day);
            s = document.querySelector('#m'+o.month+'-'+ o.day +'-'+ o.time);
            if (s == null || s.innerText == null || s.innerText.length <= 1) {
                s.innerHTML = " <span class='badge badge-info'>"+ o.ho +"</span>";
            }
            else {
                s.innerHTML += " <span class='badge badge-danger'>"+ o.ho +"</span>";
            }
        });

        var regCount = list.length;
        console.log("AAA" + regCount);

        let viewTitle = document.querySelector('#viewTitle');
        console.log(regCount);
        viewTitle.innerHTML += " (참여: <font color='e04000'>" + regCount + "</font>)";
    } else {
        viewTitle.innerHTML += " (미참여)";
    }
});


