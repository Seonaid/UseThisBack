/**
 * Created by seonaid on 15-03-10.
 */
var express = require('express');
var router = express.Router();
var passport = require('passport');
var models = require('../models');

router.use('/', function(req, res){
    console.log('in api ');
    res.header("Access-Control-Allow-Origin", "http://localhost:8100");
    res.header("Access-Control-Allow-Headers", "X-Requested-With");

    models.User.findOne({where: {id: 1},
    include: [models.Food]}).then(function(user){
        res.statusCode = 200;
        res.json(user);
    });

});

module.exports = router;