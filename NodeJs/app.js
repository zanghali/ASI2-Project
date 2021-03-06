"use strict";

var CONFIG = require("./config.json");
process.env.CONFIG = JSON.stringify(CONFIG);

var express = require("express");
var http = require("http");
var path = require("path");
var fs = require("fs");
var bodyParser = require("body-parser");
var io = require('socket.io');

var utils = require("./app/utils/utils.js");
var defaultRoute = require("./app/routes/default.route.js");
var contentRoute = require("./app/routes/content.route.js");
var IOController = require("./app/controllers/io.controller.js");


var app = express();
var server = http.createServer(app);



//Q_9.3
// //#2
// app.get("/", function(request, response) {
// 	response.send("It works !");
// });
// //#3
// app.use(function(request, response, cb) {
// 	response.send("It works !");
// 	cb();
// });


app.use("/index", express.static(path.join(__dirname, "/public/admin")));

app.use(function (req, res, next) {
	// Website you wish to allow to connect
	res.setHeader('Access-Control-Allow-Origin', 'http://localhost:3000');
	// Request methods you wish to allow
	res.setHeader('Access-Control-Allow-Methods', 'GET, POST, OPTIONS, PUT, PATCH, DELETE');
	// Request headers you wish to allow
	res.setHeader('Access-Control-Allow-Headers', 'X-Requested-With,content-type');
	// Set to true if you need the website to include cookies in the requests sent
	// to the API (e.g. in case you use sessions)
	res.setHeader('Access-Control-Allow-Credentials', true);
	// Pass to next layer of middleware
	next();
});

app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());

app.use(defaultRoute);
app.use(contentRoute);


app.get("/loadPres", function (request, response) {
	var returnData = new Object();
	fs.readdir(CONFIG.presentationDirectory, function (err, files) {
		if (!!err) {
			console.error(err);
			return;
		}

		files = files.filter(utils.filterJson);
		var compteur = 0;

		files.forEach(function (fileName) {
			fs.readFile(path.join(CONFIG.presentationDirectory, fileName), function (err, file) {
				compteur++;

				var jsonData = JSON.parse(file);
				returnData[jsonData.id] = jsonData;

				if (files.length == compteur) {
					response.send(returnData);
				}
			});
		});
	});

});

app.post("/savePres", function (request, response) {
	request.on('data', function (data) {
		data = JSON.parse(data);

		var fileName = data.id + ".pres.json";

		fs.writeFile(path.join(CONFIG.presentationDirectory, fileName), JSON.stringify(data), 'utf8', function (err) {
			if (!!err) {
				console.error(err);
				return;
			}
			response.send("File saved");
		});
	})


});

app.get('/generateUUID', function (request, response) {
	var newUUID = utils.generateUUID();
	response.send(newUUID);
});


app.post("/auth", function (req, res) {
	var request = require('request');	// Simplified HTTP client
	console.log(data);
	var data = req.body;	// Receive JSON {"login":"jdoe","pwd":"jdoepwd"} from ReactJs

	// NodeJs to JEE FrontAuthWatcherWebService request options
	var options = {
		uri: 'http://localhost:8080/FrontAuthWatcherWebService/rest/WatcherAuth',
		method: 'POST',
		json: data
	};

	request(options, function (error, response) {
		if (!error && response.statusCode == 200) {
			res.send(response.body);	// JSON response from JEE sent to ReactJs
		}
	});
});


app.use("/admin", express.static(path.join(__dirname, "/public/admin")));

app.use("/watch", express.static(path.join(__dirname, "/public/watch")));

app.use("/test", express.static(path.join(__dirname, "/public/test")));


IOController.listen(server);


server.listen(CONFIG.port, function () {
	var host = this.address().address;
	var port = this.address().port;

	console.log("App listening at http://%s:%s", host, port);

});



