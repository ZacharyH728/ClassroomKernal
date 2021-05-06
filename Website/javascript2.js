var timeInterval = 1000 //default is 30000
var intervalId = window.setInterval(function () {
    var date = new Date()
    // console.log(date.getHours(), date.getMinutes())
    var amount = $("div[class*='box']").length
    for (var n = 1;n < amount; n++) {
        var remindTimeMin = document.getElementById(n).children[11].children[1].innerHTML.substring(4, 6)
        var remindTimeHour = document.getElementById(n).children[11].children[1].innerHTML.substring(1, 3)
        // var timeIsSeconds = ((3600 * (24 - date.getHours())) + (60 * (60 - date.getMinutes())) - (date.getSeconds()))
        var timeLeft = ((3600 * (remindTimeHour - date.getHours())) + (60 * (remindTimeMin - date.getMinutes())) - ( date.getSeconds()))
        // console.log(n,timeLeft)
        if (timeLeft <= 900 && timeLeft >= 0){
            document.getElementById(n).style = "border-color: red"
        } else {
            document.getElementById(n).style = "border-color: royalblue"
        }
        if (timeLeft <= 60 && timeLeft >= 0){
            console.log("Time:",timeLeft, n)
        }
        if (timeLeft <= 30 && timeLeft >= 0) {
            document.getElementById("countdownTimer").innerHTML = timeLeft
        }
        if (timeLeft <= 30 && timeLeft >= 0) {
            if (document.getElementById("linksChecker").checked){
                document.getElementById("notificationBox").children[2].innerHTML="You will be automatically redircted to the links below in"
            } else {
                document.getElementById("notificationBox").children[2].innerHTML="Class starts in:"
            }
            document.getElementById("notificationBox").style.display = "block"
        }
        if (timeLeft <= 30 && document.getElementById("notificationBox").style.display == "block") {
            document.getElementById("meetLinkButton").attributes[2].value = document.getElementById(n).children[4].attributes[0].value
            document.getElementById("classLinkButton").attributes[2].value = document.getElementById(n).children[7].attributes[0].value
            var name = document.getElementById(n).children[1].children[0].innerHTML
            var date = new Date()
            if (date.getMinutes() < 10){
                minutes = "0" + date.getMinutes()
            } else {
                minutes = date.getMinutes()
            }
            var text = "It is " + date.getHours() + ":" + minutes + " and class starts at " + document.getElementById(n).children[9].children[1].innerHTML.substring(1, 6)
            if (Notification.permission === "granted" && document.getElementById("notificationChecker").checked && timeLeft == 30) {
                var n = new Notification(name + " is starting", { body: text });
            }
        }
        if (timeLeft == 1) {
            var name = document.getElementById(n).children[1].children[0].innerHTML
            var date = new Date()
            if (date.getMinutes() < 10) {
                minutes = "0" + date.getMinutes()
            } else {
                minutes = date.getMinutes()
            }
            var text = "You are being redirected to " + name + "'s links"
            if (Notification.permission === "granted" && document.getElementById("notificationChecker").checked) {
                var n = new Notification(name + " is starting", { body: text });
            }
        }
        if (timeLeft == 0) {
            document.getElementById("notificationBox").style.display = "none"
            if (document.getElementById("classLinkButton").attributes[2].value != "" && document.getElementById("linksChecker").checked == true){
                window.open(document.getElementById("classLinkButton").attributes[2].value).focus()
                window.open(document.getElementById("meetLinkButton").attributes[2].value).focus()
            }
        }
    }
}, timeInterval);


var i = 0;

document.getElementById('addClasses').addEventListener("click", (e) => {
    e.preventDefault();
    Notification.requestPermission().then(function (result) {
        console.log(result);
    });

    document.getElementById("classForm").style.display = "block";
})

document.getElementById('exitButton').addEventListener("click", (e) => {
    e.preventDefault();
    document.getElementById("classForm").style.display = "none";
})
document.getElementById('exitNotification').addEventListener("click", (e) => {
    e.preventDefault();
    document.getElementById("notificationBox").style.display = "none";
});
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

function dropdown() {
    if (document.getElementById("dropdown").style.display != "block") {
        document.getElementById("dropdown").style.display = "block"
    } else {
        document.getElementById("dropdown").style.display = "none"
    }
}

function GetURLParameter(sParam) {
    var sPageURL = window.location.search.substring(1);
    // console.log(sPageURL)
    var sURLVariables = sPageURL.split('&');
    // console.log(sURLVariables)
    for (var i = 0; i < sURLVariables.length; i++) {
        //value of url parameter
        var sParameterName = sURLVariables[i].split('=');
        // console.log(sParameterName[1])
        return sParameterName[1]
    }
}


document.getElementById("in").addEventListener("click", (e) => {
    e.preventDefault();
    document.getElementById("error").innerHTML = ""
    if (!document.getElementById("user").value && !document.getElementById("pass").value) {
    } else {
        l()
    }
})

document.getElementById("up").addEventListener("click", (e) => {
    e.preventDefault();
    document.getElementById("error").innerHTML = ""
    if (!document.getElementById("user").value && !document.getElementById("pass").value) {
    } else {
        v()
    }
})

async function getId(username) {
    return await fetch("http://192.168.1.12:3000/gI7a", { method: 'post', body: JSON.stringify({ username: document.getElementById("user").value }) }).then(res => res.json()).then(data => { window.location.href = "main.html?noaSD=" + data })
}

async function v() {
    let url = "http://192.168.1.12:3000/XpA1"

    let todo = {
        username: document.getElementById("user").value,
        password: document.getElementById("pass").value
    }
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
                console.log(res)
                document.getElementById("error").innerHTML = "Now logging you in"
                return false
            }
            if (res == 231) {
                console.log(res)
                document.getElementById("error").innerHTML = "Username Unavailable"
                return false
            }
            if (res == 234) {
                console.log(res)
                document.getElementById("error").innerHTML = "No Password Given"
                return false
            }
            if (res == 235) {
                console.log(res)
                document.getElementById("error").innerHTML = "No Username Given"
                return false
            }
            if (res == 230) {
                document.getElementById("error").innerHTML = ""
                return true
            }
        })
    if (response) {
        window.location.href = "main.html?noaSD=" + getId();
    }
}

async function l() {
    let url = "http://192.168.1.12:3000/kasp32"

    let todo = {
        username: document.getElementById("user").value,
        password: document.getElementById("pass").value
    }
    let options = {

        method: 'post',
        body: JSON.stringify(todo),
    }

    var response = await fetch(url, options).catch(err => {
        console.error('Request failed', err)
    })
        .then(res => res.text())
        .then(res => {
            if (res == 230) {
                console.log(res);
                return true;
            }
            if (res == 229) {
                console.log(res);
                document.getElementById("error").innerHTML = "Username or Password is wrong"
                return false;
            }
            if (res == 234) {
                console.log(res)
                document.getElementById("error").innerHTML = "No Password Given"
                return false
            }
            if (res == 235) {
                console.log(res)
                document.getElementById("error").innerHTML = "No Username Given"
                return false
            }
        })
    if (response) {
        console.log("Id:", getId())
        // window.location.href = "main.html?id=" + getId();
    }
}

async function b() {
    let url = "http://192.168.1.12:3000/pU92"

    let todo = {
        id: GetURLParameter(),
        name: document.getElementById("name").value,
        meetingLink: document.getElementById("mLink").value,
        classroomLink: document.getElementById("cLink").value,
        startTime: document.getElementById("sTime").value,
        reminderTime: document.getElementById("rTime").value,
    }
    // console.log(todo, document.getElementById("user"));
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

async function deleteClass(buttonId) {
    let url = "http://192.168.1.12:3000/jausP&w"

    console.log(document.getElementById("gridboxes").children[buttonId].children[1].children[0].innerHTML, buttonId)

    let todo = {
        id: GetURLParameter(),
        name: document.getElementById("gridboxes").children[buttonId].children[1].children[0].innerHTML
    }
    // console.log(todo, document.getElementById("user"));
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
    $('#' + buttonId).remove();
}

//Loading classes
async function loading() {
    if (!GetURLParameter()){
        document.getElementById("errorBox").style.display = "block"
    } else {
        document.getElementById("errorBox").style.display = "none"
        return await fetch("http://192.168.1.12:3000/siZ8", { method: 'post', body: JSON.stringify({ id: GetURLParameter() }) }).then(res => res.json()).then(data => { for (n in data) { d(data[n].name, data[n].meetLink, data[n].classroomLink, data[n].startTime, data[n].remindTime)}(data)})
    }
}

//Create Class Gridbox
function d(name, mLink, cLink, sTime, rTime) {
    original = document.getElementById("box");
    var clone = original.cloneNode(true);
    clone.style = "display:inline-block;";
    clone.classList.add($("div[class*='box']").length)
    clone.id = $("div[class*='box']").length
    clone.innerHTML = "<input id='deleteButton " + clone.id +"' class='exitButton' type='image' src='Cross.svg' style='position:relative;left: 87%;height: auto;width:1.5vw;' onclick='deleteClass("+ clone.id +")'><b><p id='textName'>" + name + "</p></b><br><p>Meeting </p><a href='" + mLink + "'><p>Link</p></a><br><p>Classroom </p><a href='" + cLink + "'><p>Link</p></a><br><span><p>Start Time:</p><p id='textStartTime'>" + " " + sTime + "</p></span><br><span><p>Reminder Time:</p><p id='textRemindTime'>" + " " + rTime + "</p></span>"
    // clone.innerHTML = "<input id='deleteButton' class='exitButton' type='image' src='Cross.svg' style='position:relative;left: 85%;height: auto;width:2vw;'><b><p id='textName'>" + name + "</p></b><br><p>Meeting </p><a href='" + mLink + "'><p>Link</p></a><br><p>Classroom </p><a href='" + cLink + "'><p>Link</p></a><br><span><p>Start Time:</p><p id='textStartTime'>" + " " + sTime + "</p></span><br><span><p>Reminder Time:</p><p id='textRemindTime'>" + " " + rTime + "</p></span>"
    document.getElementById("gridboxes").append(clone);

}