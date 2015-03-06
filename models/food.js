/**
 * Created by seonaid on March 4, 2015.
 */
"use strict"

// check whether the Postgres Timestamp without time zone is an issue.
// probably need to do *something* about time zones, but I don't know what yet.

module.exports = function(sequelize, DataTypes){
    var Food = sequelize.define("Food", {
        foodName: {type: DataTypes.STRING, allowNull: false},
        useBy: {type: DataTypes.DATE, allowNull: false}
    }, {
        classMethods: {
            associate: function(models) {
                Food.belongsTo(models.User);
            }
        }
    });

    return Food;
};