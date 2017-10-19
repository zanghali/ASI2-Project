"use strict";

var fs = require('fs');
var path = require("path");

var CONFIG = JSON.parse(process.env.CONFIG);

var utils = require('../utils/utils.js');
var ContentModel = require("../models/content.model.js");


this.list = function(req, res) {

    fs.readdir(CONFIG.contentDirectory, function(err, files) {
        if (!!err) {
            console.error(err);
            return res.status(500).end(err.message);
        }

        //remove the files that are not .json
        files = files.filter(utils.filterJson);

        var compteur = 0;
        var maList = {};

        if (files.length === 0){
            return res.end("no files in the folder");
        }else {
            files.forEach(function(fileName) {
                utils.readFileIfExists(path.join('uploads',fileName),function(err, file){
                    compteur++;
                    if (!!err) {
                        console.error(err);
                        return res.status(500).end(err.message);
                    }

                    var jsonFile = JSON.parse(file);
                    maList[jsonFile.id]=jsonFile;

                    //when we have all the files => send the list of files
                    if (compteur === files.length){
                        res.end(JSON.stringify(maList));
                    }
                });
            });
        }
    });
}




this.create = function(req, res) {

    if (req.body.type === 'img'){

        utils.readFileIfExists(req.file.path, function(err, data) {
            if (!!err) {
                console.error(err);
                return res.status(500).end(err.message);
            }

            var model = new ContentModel();
            model.setData(data);
            model.type = req.body.type;
            model.id = utils.generateUUID();
            model.title = req.body.title;
            model.fileName = utils.getNewFileName(model.id, req.file.originalname);
            model.src = path.join("contents",model.fileName);

            ContentModel.create(model, function(err) {
                if (!!err) {
                    console.error(err);
                    return res.status(500).end(err.message);
                } else {
                    res.end(JSON.stringify(model));
                }
            });
            
        });
    }else if (req.body.type === 'video'){

        var model = new ContentModel();

        model.type = req.body.type;
        model.id = utils.generateUUID();
        model.title = req.body.title;
        model.src = req.body.src;

        ContentModel.create(model, function(err) {
            if (!!err) {
                console.error(err);
                return res.status(500).end(err.message);
            } else {
                res.end(JSON.stringify(model));
            }
        });

    }else{
        return res.end("type is not defined");
    }





};

this.read = function(req, res) {

    ContentModel.read(req.contentId, function(err, data) {
        if (!!err) {
            console.error(err);
            return res.status(500).end(err.message);
        } else {
            if(!!req.query.json){
                res.end(JSON.stringify(data));
            }else if(data.type === "img"){
                res.sendFile(utils.getDataFilePath(data.fileName));
            } else{
                res.redirect(data.src);
            }
        }
    });

}


module.exports = this;