/**
 * Created by seonaid on 15-03-06.
 */

"use strict"

// check whether the Postgres Timestamp without time zone is an issue.
// probably need to do *something* about time zones, but I don't know what yet.

module.exports = function(sequelize, DataTypes){
    var Reminder = sequelize.define("Reminder", {
        time: DataTypes.STRING,
        use_by: DataTypes.DATE
    }, {
        classMethods: {
            associate: function(models) {
                Reminder.belongsTo(models.User);
            }
        }
    });

    return Food;
};