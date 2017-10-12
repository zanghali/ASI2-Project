
var io = require('socket.io');


var ContentModel = require("../models/content.model.js");



this.listen = function (httpServer){

	var ioServer=io(httpServer);

	var socketList= new Map();

	//new connection open
	ioServer.on('connection', function(socket){

		console.log('new connection');
		
		//listen event
		socket.on('data_com', function (id){
			socketList[id]=socket;

		});

		//listen event
		socket.on('slidEvent', function (data){


			if(	data.CMD === 'START' || 
				data.CMD === 'END' || 
				data.CMD === 'BEGIN' || 
				data.CMD === 'PREV' ||
				data.CMD === 'NEXT' ){

				ContentModel.read(data.PRES_ID, function(err,content){

					Object.keys(socketList).map(function(objectKey) {
					    socketList[objectKey].emit('currentSlidEvent', content);
					});
					
				});
				
			}
			
		});

		//emit event
		socket.emit('connection');
	});
}








module.exports = this;