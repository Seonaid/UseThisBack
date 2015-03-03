/**
 * Created by seonaid on 14-12-17.
 */
"use strict"

module.exports = function(sequelize, DataTypes){
    var Food = sequelize.define("Food", {
        name: DataTypes.STRING,
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