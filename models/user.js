/**
 * Created by seonaid on 14-12-17.
 */

"use strict"
var bcrypt = require('bcrypt-nodejs');


module.exports = function(sequelize, DataTypes){
    var User = sequelize.define("User", {
        email: {type: DataTypes.STRING, allowNull: false, isEmail: true},
        hashedPassword: {type: DataTypes.STRING, allowNull: false},
        twitterId: DataTypes.STRING,
        twitterToken: DataTypes.STRING,
        twitterUsername: DataTypes.STRING,
        twitterDiplayName: DataTypes.STRING
    }, {
        classMethods: {
            associate: function(models) {
                User.hasMany(models.Food);
                User.belongsToMany(models.PreferenceLookup, {through: 'UserPreference'});
                User.hasOne(models.Reminder);
            }
            //generateHash: function(password) {
            //    console.log(bcrypt.hashSync(password, bCrypt.genSaltSync(8), null));
            //},
            //findOne: function(email){
            //    console.log('looking up user with ' + email);
            //}
        }
    });

    console.log(User);
    return User;
}