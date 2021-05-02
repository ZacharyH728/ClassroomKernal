const express = require("express");
const bodyParser = require("body-parser");
const router = express.Router();
const app = express();
const fs = require('fs');
const { send } = require("process");
const { json } = require("body-parser");


app.use(express.urlencoded({ extended: false }));
app.use(express.json({
    type: '*/*',
}));
app.use((req, res, next) => {
    res.setHeader('Access-Control-Allow-Origin', 'http://127.0.0.1:5500')
    next();
});
//
const file = './test.json';

//

function jsonReader(filePath, cb) {
    fs.readFile(filePath, 'utf-8', (err, fileData) => {
        if (err) {
            return cb && cb(err);
        }
        try {
            const object = JSON.parse(fileData);
            return cb && cb(null, object);
        } catch (err) {
            return cb && cb(err);
        }
    });
};

//Get classes
app.post('/siZ8', (req, res) => {
    console.log("getting class data")
    var id = req.body.id;
    if (jsonReader(file, (err, data) => {
        if (err) {
            console.log(err);
        } else {
            var n = 0;
            for (n = 0; n < Object.keys(data).length; n++) {
                if (data[n].id == id) {
                    location = n
                }
            }
            if (res.statusCode !== 231) {
                var data2 = fs.readFileSync('test.json');
                var json = JSON.parse(data2);
                res.send(json[location].classes)
            }

        }
    }));
});

//Get ID
app.post('/gI7a', (req, res) => {
    console.log("Get Id")
    if(jsonReader(file, (err, data) => {
        if (err) {
            console.log(err);
        }else {
            var n = 0;
            for (n = 0; n < Object.keys(data).length; n++) {
                if (data[n].username == req.body.username) {
                    console.log(data[n].id)
                    res.send(JSON.stringify(data[n].id))
                }
            }
        }
    }));
})

//Appending class data
app.post('/pU92', (req, res) => {
    console.log("Appending Class Data")
    var id = req.body.id;
    var name = req.body.name;
    var mLink = req.body.meetingLink;
    var cLink = req.body.classroomLink;
    var sTime = req.body.startTime;
    var rTime = req.body.reminderTime;
    // console.log(id,name,mLink,cLink,sTime,rTime)
    if (jsonReader(file, (err, data) => {
        if (err) {
            console.log(err);
        } else {
            var n = 0;
            for (n = 0; n < Object.keys(data).length; n++) {
                if (data[n].id == id) {
                    location = n
                }
            }
            if (res.statusCode !== 231) {
                var data2 = fs.readFileSync('test.json');
                var json = JSON.parse(data2);
                json[location].classes.push({
                        "name": name,
                        "meetLink": mLink,
                        "classroomLink": cLink,
                        "startTime": sTime,
                        "remindTime": rTime
                });
                fs.writeFile("test.json", JSON.stringify(json), function (err, result) {
                    if (err) console.log("error:", err);
                    else res.sendStatus(230);
                });
            }

        }
    }));
});


//Signing in
app.post('/kasp32', (req, res) => {
    console.log("signIn")
    if (!req.body.username || !req.body.password) {
        if (!req.body.password) {
            res.sendStatus(234)
        } else {
            res.sendStatus(235)
        }
    } else {
        if (jsonReader(file, (err, data) => {
            if (err) {
                console.log(err);
            } else {
                var n = 0;
                for (n = 0; n < Object.keys(data).length; n++) {
                    if (data[n].username == req.body.username && data[n].password == req.body.password) {
                        res.sendStatus(230)
                        break;
                    }
                }
            }
            if (res.statusCode !== 230) {
                res.sendStatus(229)
            }
        }));
    };
});

//Signing Up
app.post('/XpA1', (req, res) => {
    console.log("signUp")
    var newUsername = req.body.username;
    var newPassword = req.body.password;
    if(!newPassword || !newUsername){
        if(!newPassword){
            res.sendStatus(234) 
        } else {
            res.sendStatus(235)
        }
        
    } else {
        if (jsonReader(file, (err, data) => {
            if (err) {
                console.log(err);
            } else {
                var n = 0;
                for (n = 0; n < Object.keys(data).length; n++) {
                    if (data[n].username == newUsername) {
                        console.log("Username: ",data[n].username, "New Username: ", newUsername)
                        res.sendStatus(231)
                        break;
                        }
                    }
                }
                //append to json
                if (res.statusCode!==231){
                    var data1 = fs.readFileSync('test.json');
                    var json = JSON.parse(data1);
                    json.push({
                        "id": Object.keys(data).length,
                        "username":newUsername,
                        "password":newPassword,
                        "classes":{}
                    });
                    fs.writeFile("test.json", JSON.stringify(json),function (err, result) {
                        if (err) console.log("error:", err);
                        else res.sendStatus(230);
                    });
                }
            }
        ));
    }
});

app.listen(3000)
