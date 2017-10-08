var sqlite3 = require('sqlite3').verbose();
var db = new sqlite3.Database(':memory:');

class booking {
    userId;
    placeId;
    reservationStart;
    reservationStop;
}

