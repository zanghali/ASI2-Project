"use strict";

var fs= require('fs');

var CONFIG = JSON.parse(process.env.CONFIG);

var utils = require("../utils/utils.js");


var ContentModel = function (model){

	if (typeof model === "object" ){
		this.type=model.type;
		this.id=model.id;
		this.title=model.title;
		this.src=model.src;
		this.fileName=model.fileName;
	}else{
		this.type= null; 
		this.id= null;
		this.src= null;
		this.title= null; 
		this.fileName= null;
		var data = null;
	} 

	this.getData = function(){
		return data;
	}
	this.setData = function(pData){
		data = pData;
	}
}


ContentModel.create =  function(content, callback){
	if(content.id === null ){
		return callback(new Error('content.id is not defined'));
	}else if (content.fileName === null && content.getData() === null){
		//enregitre les meta-données
		fs.writeFile(utils.getMetaFilePath(content.id), JSON.stringify(content), 'utf8', function (err){
			if(!!err)
			{
				console.error(err);
				return callback(err);
			}
			console.log("file meta data created");
			callback(null);

		});
	}else{
		//enregistre content.data
		fs.writeFile(utils.getDataFilePath(content.fileName), content.getData(), 'utf8', function (err){
			if(!!err){
				console.error(err.message);
				return callback(err);
			}
			console.log("file content created");
			//enregitre les meta-données
			fs.writeFile(utils.getMetaFilePath(content.id), JSON.stringify(content), 'utf8', function (err){
				if(!!err){
					console.error(err);
					return callback(err);
				}
				console.log("file meta data created");
				callback(null);
			});
		});
	}
}


ContentModel.read = function(id, callback){
	if(id === null ){
		return callback(new Error('id is not defined'));
	}

	utils.readFileIfExists(utils.getMetaFilePath(id),function(err, file){
		if (!!err)
		{
			console.error(err);
			return callback(err);
		}
		var obj = new ContentModel(JSON.parse(file));
		console.log("file read: ");
		console.log(obj);
		callback(null, obj);

	});

}


ContentModel.update = function(content, callback){
	if(content.id === null ){
		return callback(new Error('content.id is not defined'));
	}else if (content.fileName === null){
		return callback(new Error('content.fileName is not defined'));
	}

	utils.fileExists(utils.getMetaFilePath(content.id), function(err) {
		if (!!err) {
			return callback(err);
		} else {
			ContentModel.create(content, function(err){
				if(!!err){
					console.error(err);
					return callback(err);
				}
				console.log('files edited');
				callback(null);
			});
		}
	});
}


ContentModel.delete = function (id, callback){
	//in order to get the fileName
	ContentModel.read(id, function(err, data) {
		if (!!err) {
			console.error(err);
			return callback(err);
		} 

		//delete metadata
		fs.unlink(utils.getMetaFilePath(id), function (err){
			if (!!err)
			{
				console.error(err);
				return callback(err);
			}

			//delete data
			fs.unlink(utils.getDataFilePath(data.fileName), function (err){
				if (!!err)
				{
					console.error(err);
					return callback(err);
				}
				console.log('slid deleted')
				callback(null);
			});
		});
	});
}


module.exports = ContentModel;
