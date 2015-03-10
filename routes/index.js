var express = require('express');
var router = express.Router();
var passport = require('passport');

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

router.get('/fridge', function(req, res){
    console.log('getting fridge for ' + req.user.email);
    res.render('fridge', {title: 'UseThis'});
});

module.exports = router;
