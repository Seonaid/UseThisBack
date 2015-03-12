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
    res.header("Access-Control-Allow-Origin", "http://localhost:8100");
    res.header("Access-Control-Allow-Headers", "X-Requested-With");

    models.User.findOne({where: {id: 1},
        include: [models.Food]}).then(function(user){
        res.statusCode = 200;
        res.json(user);
    });
});

router.post('/login', function(req, res){
    console.log('in login function from API');
    console.log('user email is ' + req.body.email);

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

            models.Food.findAll({where: {UserId: user.id}}).then(function(foods){
                console.log(JSON.stringify(foods));
                return res.json({
                    'loginStatus' : 'success',
                    'user' : user,
                    'foods': foods
                })
            });


        }
    })(req, res);

});

module.exports = router;