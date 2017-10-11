"use strict";

console.log("It works !! ");

var CONFIG = require("./configMAC.json");
process.env.CONFIG = JSON.stringify(CONFIG);

var express = require("express");
var http = require("http");
var path = require("path");
var fs = require("fs");
var bodyParser =  require("body-parser");

var defaultRoute = require("./app/routes/default.route.js");
var contentRoute = require("./app/routes/content.route.js");
var IOController = require("./app/controllers/io.controller.js");

//init server
var app = express();
var server = http.createServer(app);
server.listen(CONFIG.port, function() {
	var host = this.address().address;
	var port = this.address().port;

	console.log("Example app listening at http://%s:%s", host , port);

});





//Q_9.3
// #2
//app.get("/", function(request, response) {
//	response.send("It works !");
//});
// #3
/*app.use(function(request, response, cb) {
	response.send("It works !");
	cb();
});
*/


app.use("/index", express.static(path.join(__dirname, "/public")));


app.use(bodyParser.json());
app.use(bodyParser.urlencoded({
	extended: true
}));

app.use(defaultRoute);
app.use(contentRoute);


app.get("/loadPres", function(request, response) {

	var returnData = new Object();

	fs.readdir(CONFIG.presentationDirectory, function(err, files){
		
		if (!!err){
			console.error(err);
			return;
		}


		files= files.filter(filterJson);

		var compteur=0;

		files.forEach(function(fileName){

			fs.readFile(path.join(CONFIG.presentationDirectory, fileName), function (err, file){

				compteur++;

				var jsonData = JSON.parse(file);
				var id = jsonData.id;

				returnData[id] = jsonData;

				if (files.length == compteur)
				{
					response.send(returnData);
				}

			});
		});
	});
});

//mettre la fonction dans app.get ??
function filterJson(files)
{

	if(path.extname(files)=='.json')
	{
		return files;
	}
	
}


app.get("/savePres2", function(request, response){

	request.on('data', function(data){

		data = JSON.parse(data);
		var fileName = data.id + ".pres.json";

		fs.writeFile(path.join(CONFIG.presentationDirectory,fileName), data, 'utf8', function (err){
			if(!!err)
			{
				console.error(err);
				return;
			}
			console.log("File saved bis"); 
		});
	})

});




app.post("/savePres", function(request, response){

	request.on('data', function(data){
		data = JSON.parse(data);

		var fileName = data.id + ".pres.json";

		fs.writeFile(path.join(CONFIG.presentationDirectory,fileName), JSON.stringify(data), 'utf8', function (err){
			if(!!err)
			{
				console.error(err);
				return;
			}
			console.log("File saved");
		});
	})


});








//Controller.listen(server);

















