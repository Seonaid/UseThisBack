/**
 * Created by seonaid on 14-12-18.
 */
"use strict"

module.exports = function(sequelize, DataTypes){
    var Preference = sequelize.define("Preference", {
        Contribution_name: DataTypes.STRING
    }, {
    classMethods: {
        associate: function(models) {
            Preference.belongsTo(models.User);
            Preference.hasOne(Contribution, { as: 'parent', foreignKey: 'parentId' });
        }
    }
});

return Contribution;
}