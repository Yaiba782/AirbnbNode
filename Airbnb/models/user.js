var sqlite3 = require('sqlite3').verbose();
var db = new sqlite3.Database('./databases/airbnb.db');
var bcrypt = require('bcrypt')
var session = require('express-session')

module.exports.crypt = function crypt(password, callback) {
    bcrypt.genSalt(10, function (err, salt) {
        bcrypt.hash(password, salt, function (err, hash) {
            return callback(err, hash);
        });
    });
};

module.exports.comparePassword = function(plainPass, hashword, callback) {
   bcrypt.compare(plainPass, hashword, function(err, isPasswordMatch) {   
       return err == null ?
           callback(null, isPasswordMatch) :
           callback(err);
   });
};

module.exports.logUser = function logUser(login, password, callback) {
    db.all("SELECT * FROM user WHERE login=?;", [login], (err,row)=>{
        if(row && row[0]) {
            module.exports.comparePassword(password,row[0]['password'],callback)
        } else {
            callback('pas de user',false);
        }
    });
};

module.exports.register = (params, callback) => {
    module.exports.crypt(params.password, (err, hash) => {
        db.run("INSERT INTO user (login,password,nom,prenom,email) VALUES (?,?,?,?,?)",
                [   params.login,
                    hash,
                    params.nom,
                    params.prenom,
                    params.email
                ], callback);
    });
}

module.exports.isAllowed = function (req, res, next) {
    if (req.session.user || req.path === '/' || req.path === '/register' || req.path === '/login') {
        return next();
    } else {
        return res.redirect('/login');
    }
}

module.exports.setSession = (login,session,callback)=>{
    db.all("SELECT * FROM user WHERE login=?;", [login], (err,row)=> {
        if(row && row[0]) {
            session.user = row[0]['login'];
            session.userid = row[0]['id'];
            callback();
        }
    });
}