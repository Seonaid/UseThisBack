var express = require('express');
var router = express.Router();
var passport = require('passport');
var models = require('../models');

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

router.post('/login', passport.authenticate('local-login', {
    successRedirect: '/fridge',
    failureRedirect: '/login'
}));

router.get('/add_food', function(req, res){
    res.render('add_food');
});

router.post('/add_food', function(req, res){
    console.log('adding food for ' + req.user.email);
    var user = req.user;
    var newFood = req.body;
    var foodName = newFood.food_name;
    var useBy = parseInt(newFood.how_many)
    user.addFood({
        foodName: foodName,
        useBy: useBy
    }).then(
        function(user){
            console.log(newFood.food_name + ' added');
            done(null);
        },
        function(error){
            console.log('adding food failed');
            done(err);
        }
    );

    res.render('add_food');
});

router.get('/fridge', function(req, res){
    console.log('getting fridge for ' + req.user.email);
    res.render('fridge', {title: 'UseThis'});
});

module.exports = router;
