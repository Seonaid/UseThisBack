/**
 * Created by seonaid on 14-12-17.
 */

"use strict"

module.exports = function(sequelize, DataTypes){
    var User = sequelize.define("User", {
        user_name: {type: DataTypes.STRING, allowNull: false},
        salted_password: {type: DataTypes.STRING, allowNull: false},
    }, {
        classMethods: {
            associate: function(models) {
                User.hasMany(models.Food)
            }
        }
    });

    return User;
}