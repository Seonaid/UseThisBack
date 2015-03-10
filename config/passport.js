/**
 * Created by seonaid on 15-03-09.
 */
// configuration file that defines how passport will handle login, registration and authorization

var LocalStrategy = require('passport-local').Strategy;
var TwitterStrategy = require('passport-twitter').Strategy;
var models = require('../models');
var bcrypt = require('bcrypt-nodejs');
// var User = require('../models/user); ??

module.exports = function(passport){
    passport.serializeUser(function(user, done){
        done(null, user.id);
    });

    passport.deserializeUser(function(id, done){
        models.User.findOne(id, function(err, user){
            done(err, user);
        });
    });

    passport.use('register', new LocalStrategy({
        usernameField : 'email', // this is an override of the default, which is username
        passwordField : 'password',
        passReqToCallback: true
    },
    function(req, email, password, done) {
        var hashedPassword = bcrypt.hashSync(password, bcrypt.genSaltSync(8), null);

        models.User.findOne({where: {email: email}}).then(
            function(user){
                if(user){
                    return done(null, false/*, req.flash('signupMessage', 'That email is already registered.')*/);
                } else {
                    console.log('adding ' + email);
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
                            return done(err);
                        }
                    );
                }
            },
            function(err){
                return done(err);
            }
        );
    }));

    passport.use('local-login', new LocalStrategy({
            usernameField : 'email', // this is an override of the default, which is username
            passwordField : 'password',
            passReqToCallback: true
        },
        function(req, email, password, done) {
            console.log('in passport login strategy looking up user by ' + email);
            models.User.findOne({where: {email: email}}).then(
                function(user){
                    if(user){
                        console.log('logging in ' + email);
                        // we have somebody with that email! Now, check their password.
                        var hashedPassword = bcrypt.hashSync(password, bcrypt.genSaltSync(8), null);
                        console.log(hashedPassword + ' ' + user.hashedPassword);
                        if(hashedPassword === user.hashedPassword){
                            return done(null,user);
                        } else {
                            console.log('wrong password');
                            return done(null, false/*, req.flash('loginMessage', 'Password invalid (change after dev!')*/);
                        }
                    } else {
                         // there is nobody here by that name. return an error.
                        console.log('there is nobody with ' + email);
                        return done(null, false/*, req.flash('loginMessage', 'No such user')*/);
                    }
                },
                function(err){
                    return done(err);
                })
        }
    ));

}