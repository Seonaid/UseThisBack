var express = require('express');
var app = express();
var router = express.Router();

var models = require('../models');
var passport = require('passport');
var sequelize = require('sequelize');
var bcrypt = require('bcrypt-nodejs');
var bodyParser = require('body-parser');


// configures passport
require('../config/passport')(passport);

app.use(passport.initialize());

/* GET home page. */
router.get('/', function(req, res) {
  res.render('index', { title: 'UseThis' });
});

router.get('/register', function(req, res) {
    res.render('register');
});

router.post('/register', bodyParser.urlencoded({extended: true}), function(req, res){
    var newUser = [];
    newUser.email = req.body.email;
    newUser.password = req.body.password;
    newUser.hashedPassword = bcrypt.hashSync(newUser.password, bcrypt.genSaltSync(8), null);

    models.User.create({
        email: newUser.email,
        hashedPassword: newUser.hashedPassword
    }).success(function(user){
        res.send('added ' + user.email + ' to the database')
    });
    //
    //console.log('adding new user to database: ' + newUser.email);
    //console.log('saving hashed password: ' + newUser.hashedPassword);

//    res.render('index', {title: 'Success'});


});

router.get('/login', function(req, res){
    res.render('login');
});

module.exports = router;
