"use strict";

var express = require("express");

var router = express.Router();

router.route('/')
	.get(function(req, res) {res.end('Hello world');}
);


module.exports = router;