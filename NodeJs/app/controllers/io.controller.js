"use strict";

var io = require('socket.io');

var ContentModel = require("../models/content.model.js");


this.listen = function (httpServer){

	var ioServer=io(httpServer);

	var socketList= {};

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
			if(	data.CMD === 'START' || 
				data.CMD === 'END' || 
				data.CMD === 'BEGIN' || 
				data.CMD === 'PREV' ||
				data.CMD === 'NEXT' 
				){
				//load the content of the presentation data.PRES_ID
				ContentModel.read(data.PRES_ID, function(err,content){
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