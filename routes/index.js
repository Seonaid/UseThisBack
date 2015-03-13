var express = require('express');
var router = express.Router();
var passport = require('passport');
var models = require('../models');
var dateUtils = require('date-utils');

/* GET home page. */
router.get('/', function(req, res) {
  res.render('index', { title: 'UseThis' });
});

router.get('/register', function(req, res) {
    res.render('register');
});

router.post('/register',passport.authenticate('register', {
    successRedirect: '/fridge',
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
    var data = req.body;
    var newFood = {};
    var expiresOn = Date.today()
    newFood.foodName = data.food_name;
    var useBy = parseInt(data.how_many);
    console.log('time period: ' + data.time_period);

    switch(data.time_period) {
        case 'days':
            expiresOn = expiresOn.add({days: useBy});
            break;
        case 'weeks':
            expiresOn = expiresOn.add({weeks: useBy});
            break;
        case 'months':
            expiresOn = expiresOn.add({months: useBy});
            break;
    }

    newFood.useBy = expiresOn;
    newFood.UserId = user.id;

    console.log('New food: ' + newFood);
    models.Food.create(newFood).then(function(food) {
        console.log('Created food in database');
    }, function(error){
        console.log('Didn\'t work.');

    });

    res.render('add_food', {id : req.user.id});
});

router.get('/fridge', function(req, res){
    console.log('getting fridge for ' + req.user.email);
//    console.log(req.user);

    models.Food.findAll({where: {UserId: req.user.id}}).then(function(foods){
    console.log(JSON.stringify(foods));
        res.render('fridge', {title: 'UseThis', foods: foods});
    });


});

module.exports = router;
