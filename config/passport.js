/**
 * Created by seonaid on 15-03-09.
 */
// configuration file that defines how passport will handle login, registration and authorization

var LocalStrategy = require('passport-local').Strategy;
var TwitterStrategy = require('passport-twitter').Strategy;
var models = require('../models');
var bcrypt = require('bcrypt-nodejs');

module.exports = function(passport){
    passport.serializeUser(function(user, done){
        done(null, user.id);
    });

    passport.deserializeUser(function(id, done){
        User.findById(id, function(err, user){
            done(err, user);
        });
    });

    passport.use('register', new LocalStrategy({
        usernameField : 'email', // this is an override of the default, which is username
        passwordField : 'password',
        passReqToCallback: true
    },
    function(req, email, password, done) {
        // async User.findOne (this is part of mongoose???) won't fire unless data is sent back
        console.log('in passport file looking up user by ' + email);
        var hashedPassword = bcrypt.hashSync(password, bcrypt.genSaltSync(8), null);
        console.log('hash: ' + hashedPassword);
        models.User.create({
                email: email,
                hashedPassword: hashedPassword
            }).then(
            function(user){
                console.log(user.email + ' added');
                return done(null, user);
            },
            function(error){
                console.log('adding user failed');
            });

         }));

    passport.use('local', new LocalStrategy({
            usernameField : 'email', // this is an override of the default, which is username
            passwordField : 'password',
            passReqToCallback: true
        },
        function(req, email, password, done) {
            models.User.findOne({ email: email }, function (err, user) {
                if (err) { return done(err); }
                if (!user) {
                    return done(null, false, { message: 'Incorrect username.' });
                }
                if (!user.validPassword(password)) {
                    return done(null, false, { message: 'Incorrect password.' });
                }
                return done(null, user);
            });
        }
    ));

}