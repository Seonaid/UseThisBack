/**
 * Created by seonaid on 15-03-09.
 */
// configuration file that defines how passport will handle login, registration and authorization

var LocalStrategy = require('passport-local').Strategy;
var TwitterStrategy = require('passport-twitter').Strategy;

module.exports = function(passport){
    passport.use('register', new LocalStrategy({
        usernameField : 'email', // this is an override of the default, which is username
        passwordField : 'password',
        passReqToCallback: true
    },
    function(req, email, password, done) {
        // async User.findOne (this is part of mongoose???) won't fire unless data is sent back
        console.log('in passport file looking up user by ' + local.email);


    }));
}