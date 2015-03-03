var express = require('express');
var router = express.Router();

/* GET users listing. */
router
    .get('/', function(req, res, next) {
      res.send('respond with a resource about users');
    })

    .get('/login', function(req, res, next){
        res.render('login');
    })

    .get('/register', function(req, res, next){
        res.render('register');
    });

module.exports = router;
