var sqlite3 = require('sqlite3').verbose();
var db = new sqlite3.Database('./databases/airbnb.db');
var lodash = require('lodash');

module.exports.getList = function getList(callback) {
    db.all("SELECT * FROM place;", callback);
};

module.exports.getPlace = function (id, callback) {
    db.all("SELECT * FROM place WHERE id = ?;", [id], callback);
}