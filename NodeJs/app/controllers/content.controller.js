"use strict";


var fs = require('fs');
var CONFIG = require("../../configMac.json");


var utils = require('../utils/utils.js');
var ContentModel = require("../models/content.model.js");

this.list = function(req, res) {

    fs.readdir(CONFIG.contentDirectory, function(err, files) {

        if (!!err) {
            console.error(err);
            return callback(err);
        }

        files = files.filter(filterJson);

        var compteur = 0;

        var maList = {};

        files.forEach(function(fileName) {

            ContentModel.read(fileName.id, function(err, file) {

                compteur++;

                if (!!err) {
                    console.error(err);
                    return callback(err);
                }


                var jsonData = JSON.parse(file);
                var id = jsonData.id;

                maList[id] = jsonData;

                if (files.length == compteur) {
                    return callback(null, maList);
                }

            });
        });


    });
}

function filterJson(files) {

    if (path.extname(files) == '.json') {
        return files;
    }

}


this.create = function(req, res) {


    utils.readFileIfExists(req.file.path, function(err, data) {
        if (!!err) {

        }

        var model = new ContentModel();
        model.setData(data);
        model.type = req.body.type;
        model.id = utils.generateUUID();
        model.title = req.body.title;
        model.fileName = utils.getNewFileName(model.id, req.file.originalname);

console.log(model);
        ContentModel.create(model, function(err) {
            if (!!err) {
                console.error(err);
                return res.status(500).end(err.message);
            } else {
                res.end();
            }
        });
    })


};

this.read = function(id, callback) {

    ContentModel.read(id, function(err, data) {
        if (err) {
            console.error(err);
            return callback(err, data);;
        } else {
            callback(null, data);
        }
    });

}


module.exports = this;