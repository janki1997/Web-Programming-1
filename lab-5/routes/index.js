var express = require('express');
var router = express.Router();
var about = require("./about");
var story = require("./story");
var education = require("./education");

    router.get("/about", about);
    
    router.get("/story",story);
    
    router.get("/education",education);



module.exports = router