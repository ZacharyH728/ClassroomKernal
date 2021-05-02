
document.getElementById("in").addEventListener("click", (e) =>{
    e.preventDefault();
    document.getElementById("error").innerHTML = ""
    if (!document.getElementById("user").value && !document.getElementById("pass").value) {
    } else {
        b()
    }
    
})

document.getElementById("up").addEventListener("click", (e) => {
    e.preventDefault();
    document.getElementById("error").innerHTML = ""
    if (!document.getElementById("user").value && !document.getElementById("pass").value){
    } else {
        x()
    }

})

async function getId(username) {
    return await fetch("http://192.168.1.12:3000/gI7a", { method: 'post', body: JSON.stringify({ username: document.getElementById("user").value }) }).then(res => res.json()).then(data => { window.location.href = "main.html?id=" + data })
}

async function x() {
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
        if(res==232){
            console.log(res)
            document.getElementById("error").innerHTML = "Now logging you in"
            return false
        }
        if(res==231){
            console.log(res)
            document.getElementById("error").innerHTML = "Username Unavailable"
            return false
        }
        if(res==234){
            console.log(res)
            document.getElementById("error").innerHTML = "No Password Given"
            return false
        }
        if(res==235) {
            console.log(res)
            document.getElementById("error").innerHTML = "No Username Given"
            return false
        }
        if(res==230) {
            document.getElementById("error").innerHTML = ""
            return true
        }
    })
    if(response){
        window.location.href = "main.html?id=" + getId();
    }
        // switch(res) {
        //     case 232:
        //         console.log("2332")
        //         return true;
        //     case 231:
        //         document.getElementById("error").innerHTML = "Username Unavailable"
        //         return false;
        //     default://Pass
        // }
}

async function b() {
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
        console.log("Id:",getId())
        // window.location.href = "main.html?id=" + getId();
    }
    


}