/**
 * Created by seonaid on 15-03-06.
 */
/**
 * Created by seonaid on 14-12-18.
 */
"use strict"

module.exports = function(sequelize, DataTypes){
    var PreferenceLookup = sequelize.define("PreferenceLookup", {
        : DataTypes.STRING
    }, {
        classMethods: {
            associate: function(models) {
                PreferenceLookup.hasMany(models.User, {through: 'UserPreference'});
            }
        }
    });

    return PreferenceLookup;
}