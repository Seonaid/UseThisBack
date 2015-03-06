/**
 * Created by seonaid on March 4, 2015.
 */
"use strict"

// check whether the Postgres Timestamp without time zone is an issue.
// probably need to do *something* about time zones, but I don't know what yet.

module.exports = function(sequelize, DataTypes){
    var Food = sequelize.define("Food", {
        food_name: DataTypes.STRING,
        use_by: DataTypes.DATE
    }, {
        classMethods: {
            associate: function(models) {
                Food.belongsTo(models.User);
            }
        }
    });

    return Food;
};