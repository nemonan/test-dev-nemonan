let params = getJsonFromUrl();
viewTitle.innerText = params.dong + " 동 "+ params.line.replace("L", "") +"호 라인";

let subpath = params.dong +"/"+ params.line;
let firedbref = firedb.ref('xi/' + subpath);

firedbref.once('value').then(function(snapshot) {
    let obj = snapshot.val();
    if (obj != null) {
        var list = []
        var keys = Object.keys(obj);
        for (var i = 0; i < keys.length; i++) {
            var key = keys[i]
            var dict = {}
            dict["id"] = key;
            dict["ho"] = obj[key].ho;
            dict["month"] = obj[key].month;
            dict["day"] = obj[key].day;
            dict["time"] = obj[key].time;
            list.push(dict);
        }

        list.forEach(function (o) {
//            console.log(o.ho + " "+ o.day);
            s = document.querySelector('#m'+o.month+'-'+ o.day +'-'+ o.time);
            // https://knemonan.firebaseio.com/xi/105/L12/-Ly7ep8Pxyw7-dFDTK60
            fbPath = "xi/" + subpath + "/"+ o.id;
            if (s == null || s.innerText == null || s.innerText.length <= 1) {
                s.innerHTML = " <span class='badge badge-primary' title='"+ fbPath +"'>"
                            + o.ho +"</span>";
            }
            else {
                s.innerHTML += " <span class='badge badge-danger' title='"+ fbPath + "'>"
                            + o.ho +"</span>";
            }
        });

        var regCount = list.length;
        let viewTitle = document.querySelector('#viewTitle');
        viewTitle.innerHTML += " (참여: <font color='e04000'>" + regCount + "</font>)";
    } else {
        viewTitle.innerHTML += " (미참여)";
    }
});


