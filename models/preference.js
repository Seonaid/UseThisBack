/**
 * Created by seonaid on March 3, 2015.
 */
"use strict"

module.exports = function(sequelize, DataTypes){
    var Preference = sequelize.define("Preference", {
        : DataTypes.STRING
    }, {
    classMethods: {
        associate: function(models) {
            Preference.hasMany(models.User);
        }
    }
});

return Preference;
}