/**
 * Created by seonaid on 14-12-17.
 */

"use strict"

module.exports = function(sequelize, DataTypes){
    var User = sequelize.define("User", {
        email: {type: DataTypes.STRING, allowNull: false, isEmail: true},
        salted_password: {type: DataTypes.STRING, allowNull: false},
    }, {
        classMethods: {
            associate: function(models) {
                User.hasMany(models.Food);
                User.belongsToMany(models.PreferenceLookup, {through: 'UserPreference'})
            }
        }
    });

    return User;
}