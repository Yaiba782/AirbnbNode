var sqlite3 = require('sqlite3').verbose();
var db = new sqlite3.Database('./databases/airbnb.db');


module.exports.getBookingListForId = function (id,userId, callback) {
    db.all("SELECT CASE WHEN user_id!="+userId+" THEN 'Indisponnible' ELSE 'Reservé' END as title, dateStart as start, dateEnd as end, CASE WHEN user_id!="+userId+" THEN 'red' ELSE 'green' END as color FROM booking WHERE place_id = ?;", [id], callback);
}

module.exports.AddBookingInfo = (dateStart, dateEnd, place, userId, callback) => {
    db.run("INSERT INTO booking (place_id,user_id,dateStart,dateEnd) VALUES (?,?,?,?);", [place.id, userId, dateStart, dateEnd], callback);
}