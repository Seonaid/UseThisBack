/**
 * Created by seonaid on 15-03-02.
 */

var fs        = require("fs");
var path      = require("path");
//var Sequelize = require("sequelize");
var env       = process.env.NODE_ENV || "development";
var Sequelize = require('sequelize')
    , sequelize = new Sequelize('usethis', 'seonaid', 'arbitrary',{
        dialect: "postgres",
        port: 5432,
    })
var db        = {};

sequelize
    .authenticate()
    .complete(function(err){
        if(!!err){
            console.log('Unable to connect to database', err)
        }
        else {
            console.log('Connection established')
        }
    })

fs
    .readdirSync(__dirname)
    .filter(function(file) {
        return (file.indexOf(".") !== 0) && (file !== "index.js");
    })
    .forEach(function(file) {
        var model = sequelize["import"](path.join(__dirname, file));
        db[model.name] = model;
    });

Object.keys(db).forEach(function(modelName) {
    if ("associate" in db[modelName]) {
        db[modelName].associate(db);
    }
});

db.sequelize = sequelize;
db.Sequelize = Sequelize;



module.exports = db;