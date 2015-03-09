var express = require('express');
var app = express();
var router = express.Router();

var models = require('../models');
var passport = require('passport');
var sequelize = require('sequelize');
var bcrypt = require('bcrypt-nodejs');
var bodyParser = require('body-parser');

/* GET home page. */
router.get('/', function(req, res) {
  res.render('index', { title: 'UseThis' });
});

router.get('/register', function(req, res) {
    res.render('register');
});

router.post('/register',passport.authenticate('register', {
    successRedirect: '/',
    failureRedirect: '/register'
}));

router.get('/login', function(req, res){
    res.render('login');
});

router.post('/login', passport.authenticate('local'), function(req, res){
    if(!user){
        res.render('login');
    } else {
        res.render('fridge', {name: user.name});
    }
});

module.exports = router;
