"use strict";

var io = require('socket.io');
var fs = require("fs");
var path = require("path");

var CONFIG = JSON.parse(process.env.CONFIG);

var ContentModel = require("../models/content.model.js");

var contentController = require("../controllers/content.controller.js");

this.listen = function (httpServer){

	var ioServer=io(httpServer);

	var socketList= {};

	var current_pres=null;
	var current_slid;

	//new connection open
	ioServer.on('connection', function(socket){

		console.log('new connection');

		//LISTEN EVENT
		//remove socket from socketList 
		socket.on('disconnect', function (){
			delete socketList[socket.id];
		});
		//
		//add the socket to the socketList
		socket.on('data_com', function (id){
			socketList[socket.id]=socket;
		});
		//emit currentSlidEvent to all the socket
		socket.on('slidEvent', function (data){

			if(	data.CMD === 'START' ){

				var fileName = data.PRES_ID + ".pres.json";
				
				fs.readFile(path.join(CONFIG.presentationDirectory, fileName), function (err, file){

					current_pres=JSON.parse(file);
					current_slid=0;
					//load the content of the presentation data.PRES_ID
					ContentModel.read(current_pres.slidArray[0].contentMap[1], function(err,content){
						Object.keys(socketList).map(function(key) {
						    socketList[key].emit('currentSlidEvent', content);
						});
					});
					
				});

			}else if(current_pres !== null){
				
				if (data.CMD === 'NEXT' ){
					if(current_slid !==current_pres.slidArray.length -1){
						current_slid++;
					}
				}else if (data.CMD === 'PREV' ){
					if(current_slid !== 0){
						current_slid--;
					}
				}else if (data.CMD === 'BEGIN'){
					current_slid=0;
				}else if (data.CMD === 'END'){
					current_slid= current_pres.slidArray.length -1;
				}

				ContentModel.read(current_pres.slidArray[current_slid].content_id, function(err,content){
					Object.keys(socketList).map(function(key) {
					    socketList[key].emit('currentSlidEvent', content);
					});
				});
			}
		});


		//EMIT EVENT
		socket.emit('connection');
	});
}








module.exports = this;