result = getJsonFromUrl();

let viewTitle = document.querySelector('#viewTitle');
viewTitle.innerText = result.dong + " 동 "+ result.line.replace("L", "") +"호 라인";


let subpath = result.dong +"/"+ result.line;
let firedbref = firedb.ref('xi/' + subpath);

let vals;
firedbref.once('value').then(function(snapshot) {
    //console.log(snapshot.val());
    let obj = snapshot.val();
    if (obj != null) {
        let list = Object.keys(obj).map(key => {
              return {
                id: key,
                ho: obj[key].ho,
                month: obj[key].month,
                day: obj[key].day,
                time: obj[key].time
              }
            });
        console.log(list);

        list.forEach(function (o) {
            console.log(o.ho + " "+ o.day);
            s = document.querySelector('#m'+o.month+'-'+ o.day +'-'+ o.time);
            if (s == null || s.innerText == null || s.innerText.length <= 1) {
                s.innerHTML = " <span class='badge badge-info'>"+ o.ho +"</span>";
            }
            else {
                s.innerHTML += " <span class='badge badge-danger'>"+ o.ho +"</span>";
            }
        });
    }
});


function getJsonFromUrl() {
  var query = location.search.substr(1);
  var result = {};
  query.split("&").forEach(function(part) {
    var item = part.split("=");
    result[item[0]] = decodeURIComponent(item[1]);
  });
  console.log(result);
  return result;
}

