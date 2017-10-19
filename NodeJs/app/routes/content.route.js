"use strict";

var multer = require("multer");
var express = require("express");

var contentController = require("../controllers/content.controller.js");

var router = express.Router();
var multerMiddleware = multer({ "dest": "/tmp/" });


router.route('/contents')
	.get(contentController.list)
	.post(multerMiddleware.single("file"), contentController.create);


router.route('/contents/:contentId')
	.get(contentController.read);


router.param('contentId', function(req, res, next, id) {
	req.contentId = id;
	next();
});


module.exports = router;
