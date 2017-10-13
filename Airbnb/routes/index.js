var express = require('express');
var router = express.Router();
var user = require('../models/user');
var session = require ('express-session');

/* GET home page. */
router.get('/', function(req, res, next) {
    if(!req.session.user){
        res.render('index', { title: 'YnovBnb' });
    } else {
        res.render('index', { title: 'YnovBnb',name: req.session.user});
    }
});

/* GET login page. */
router.get('/login', function(req, res, next) {
    if(req.session.user){
        return res.redirect("/infos");
    } else {
        return res.render('login', { title: 'YnovBnb' });
    }
  
});

/**
 * POST user connexion
 */
router.post('/login', function(req, res, next) {
    var login = req.body.login;
    var password = req.body.password;

    user.logUser(login,password, (err,result) => {
        if(result === true) {
            req.session.user = req.body.login;
            return res.redirect("/infos");
        }
        return res.render('login', { title: 'YnovBnb' ,error:true});
    });
});

/* GET info page. */
router.get('/infos', function(req, res, next) {
    res.render('infos', { user: req.session.user });
});

/* GET register page. */
router.get('/register', function(req, res, next) {
  res.render('register', { title: 'YnovBnb' });
});

/* POST register page. */
router.post('/register', function(req, res, next) {

    if(req.body.password === req.body.password_conf &&
            req.body.email === req.body.email_conf &&
            req.body.password !== "" &&
            req.body.login !== "") {
        
        user.register(req.body,(err,rows)=>{
            res.redirect('/login');
        });
    } else {
        res.render('register', { title: 'YnovBnb', error:true });
    }
});

/* GET disconnect */
router.get('/disconnect', function(req, res, next) {
    if(req.session.user) {
        delete req.session.user;
    }
    return res.redirect('/');
});


/*
 *
 *
 *       POST
 *
 *
 * */

module.exports = router;
