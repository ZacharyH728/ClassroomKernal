// document.getElementById("in").addEventListener("click", (e) => {
//     e.preventDefault();
//     if (b()) {
//         var para = document.createElement();
//         var node = document.createTextNode("test");
//         para.appendChild(node);
//         //make if statement where if row has too many elements 
//         //create new row and add coloums to that
//         if (document.getElementById("col" + n)) {
//             pass
//         } 
//     } else {
//         console.log("failed")
//         document.getElementById("error").innerHTML = "Username or Password did not work"
//     }

// })
var i = 0;

document.getElementById('addClasses').addEventListener("click", (e) => {
    e.preventDefault();
    // if (b()) {
    //     d(mLink, cLink, sTime, rTime)
    // }

    document.getElementById("classForm").style.display = "block";
})
document.getElementById('exitButton').addEventListener("click", (e) => {
    e.preventDefault();
    document.getElementById("classForm").style.display = "none";
})
document.getElementById("submit").addEventListener("click", (e) => {
    e.preventDefault();
    if (b()) {
        let name = document.getElementById("name").value
        let mLink = document.getElementById("mLink").value
        let cLink = document.getElementById("cLink").value
        let sTime = document.getElementById("sTime").value
        let rTime = document.getElementById("rTime").value
        d(name, mLink, cLink, sTime, rTime)
        document.getElementById("classesForm").reset();
        document.getElementById("classForm").style.display = "none";

    }
})

function GetURLParameter(sParam) {
    var sPageURL = window.location.search.substring(1);
    console.log(sPageURL)
    var sURLVariables = sPageURL.split('&');
    console.log(sURLVariables)
    for (var i = 0; i < sURLVariables.length; i++) {
        //value of url parameter
        var sParameterName = sURLVariables[i].split('=');
        console.log(sParameterName[1])
        return sParameterName[1]
    }
}
async function b() {
    //TODO set up web server on raspPi
    let url = "http://192.168.1.12:3000/pU92"

    let todo = {
        id: GetURLParameter(),
        name: document.getElementById("name").value,
        meetingLink: document.getElementById("mLink").value,
        classroomLink: document.getElementById("cLink").value,
        startTime: document.getElementById("sTime").value,
        reminderTime: document.getElementById("rTime").value,
    }
    console.log(todo, document.getElementById("user"));
    let options = {

        method: 'post',
        body: JSON.stringify(todo),
    }

    var response = await fetch(url, options).catch(err => {
        console.error('Request failed', err)
    })
    .then(res => res.text())
    .then(res => {
        if (res == 232) {
            return true;
        }

    })

}

//Loading classes
async function loading() {
    return await fetch("http://192.168.1.12:3000/siZ8", { method: 'post', body: JSON.stringify({ id: GetURLParameter() }) }).then(res => res.json()).then(data => { for (n in data) { d(data[n].name, data[n].meetLink, data[n].classroomLink, data[n].startTime, data[n].remindTime)}; console.log(data)})
}


function d(name, mLink, cLink, sTime, rTime) {
    original = document.getElementById("box");
    var clone = original.cloneNode(true);
    clone.style = "display:inline-block;";
    clone.innerHTML = "<b><p id='textName'>" + name + "</p></b><br><span><p>Meeting Link:</p><p id='textMeetLink'>" + " " + mLink + "</p></span><br><span><p>Classroom Link:</p><p id='textClassLink'>" + " " + cLink + "</p></span><br><span><p>Start Time:</p><p id='textStartTime'>" + " " + sTime + "</p></span><br><span><p>Reminder Time:</p><p id='textRemindTime'>" + " " + rTime + "</p></span>"
    document.getElementById("gridboxes").append(clone);

}