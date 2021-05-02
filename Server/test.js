const express = require('express');
const url = require("url");
const bodyParser = require("body-parser");
const app = express();

const fs = require('fs');
const port = 3000;

const file = './test.json';
const name = require("./test.json");



app.use(express.json());
app.use(express.urlencoded({ extended: false }));

function checker(username, password) {
	return true;
	if (username == "test" && password == "test"){
		return true;
	};
};
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
app.use((req, res, next) => {
	res.header('Access-Control-Allow-Origin', 'http://127.0.0.1:5500');
	next();
});


app.post('/', (req, res) => {
	let username = req.body.username;
	let password = req.body.password;
	console.log(req);
	//console.log(req);
	res.sendStatus(232);
});
app.post('/XpA1', (req,res) => {
	let newUsername = req.query.username;
	console.log(req.query, JSON.stringify(req.query));
	console.log('username:',newUsername);
	// let newPassword = req.body;
	// let newAccount = {
	// 			"userId": 22,
	// 			"username": newUsername,
	// 			"password": newPassword
	// 		};
	// jsonReader(file, (err, data) => {
	// 	if (err) {
	// 		console.log(err);
	// 	} else {
	// 		console.log(data.users);
	// 		console.log(req.body);
	// 	}
	// });
	res.sendStatus(232);
});

app.listen(port);
