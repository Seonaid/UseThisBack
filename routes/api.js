/**
 * Created by seonaid on 15-03-10.
 */
var express = require('express');
var router = express.Router();
var passport = require('passport');
var models = require('../models');
var bodyParser = require('body-parser');

router.get('/', function(req, res){
    console.log('in api ');
    var data = req.body;
    console.log(data);

    res.header("Access-Control-Allow-Origin", "*");
    res.header("Access-Control-Allow-Methods", "POST, GET, OPTIONS, DELETE");
    res.header("Access-Control-Allow-Headers", "X-Requested-With");
    //
    models.User.findOne({where: {id: 1},
        include: [models.Food]}).then(function(user){
        res.statusCode = 200;
        res.json(user);
    });
});

router.post('/login', function(req, res){
    console.log('in login function from API');
    console.log(req.body);
 //   console.log('user email is ' + req.body.email);

    passport.authenticate('local-login', function(err, user, info) {

        //an error was encountered (ie. no database available)
        if (err) {
            return next(err);
        }

        //a user wasn't returned; this means that the user isn't available, or the login information is incorrect
        if (!user) {
            return res.json({
                'loginStatus' : 'failure',
                'message' : info.message
            });
        }
        else {  //success!  return the successful status and the id of the logged in user
// load up the foods for the user and send them back with the login success so they can be displayed on the fridge tab
            models.Food.findAll({where: {UserId: user.id}}).then(function(foods){
                console.log(JSON.stringify(foods));
                res.header("Access-Control-Allow-Origin" , "*");
                return res.json({
                    'loginStatus' : 'success',
                    'user' : user,
                    'foods': foods
                })
            });


        }
    })(req, res);

});

router.options('/:name', function(req, res){
    res.setheader("Access-Control-Allow-Origin" , "*");
    res.setheader("Access-Control-Allow-Methods", "GET, OPTIONS, DELETE");
    res.setheader("Access-Control-Allow-Headers", "Content-Type, X-Requested-With, Authorization,Access-Control-Allow-Origin");
    return res.json({msg: 'OK'});
});

router.post('/add_food', function(req, res){
 //   console.log('adding food for ' + req.user.email);
    var user = req.body.user;
    var data = req.body.newFood;
//console.log('at least I got here!');
//    console.log(req.body);
    var newFood = {};
    var expiresOn = Date.today();
    newFood.foodName = data.foodName;
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

    res.header("Access-Control-Allow-Origin" , "*");

    console.log('New food: ' + JSON.stringify(newFood));
    models.Food.create(newFood).then(function(food) {
        console.log('Created food in database');
        return res.json(food);
    }, function(error){
        console.log('Didn\'t work.');

    });

});

router.delete('/delete_food/:id', function(req, res){
    var foodId = req.params.id;

    if(req.params.id) {
        res.statusCode = 404;
        return res.send('nothing!');
    }  

    console.log('Incoming request to delete ' + foodId);
    
    res.header("Accept", "application/json");
    res.setheader('Access-Control-Allow-Origin', '*');
    res.header("Access-Control-Allow-Methods", "POST, GET, OPTIONS, DELETE");
    res.header("Access-Control-Allow-Headers", "X-Requested-With");

    models.Food.find(foodId).then(function(food) { 
        food.destroy(foodId).then( function(u){
            console.log('succesfully deleted');
            res.statusCode = 200;
            return res.json(user);
        }, function(error){
            console.log("I refused a perfectly valid request because I'm a jerk.")
        });

    });
    

});


module.exports = router;