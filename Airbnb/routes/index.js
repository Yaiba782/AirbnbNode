var express = require('express');
var router = express.Router();



/*
*
*
*       GET
*
*
* */
/* GET home page. */
router.get('/', function(req, res, next) {
  res.render('index', { title: 'YnovBnb' });
});

/* GET login page. */
router.get('/login', function(req, res, next) {
  res.render('login', { title: 'YnovBnb' });
});
/* GET register page. */
router.get('/register', function(req, res, next) {
  res.render('register', { title: 'YnovBnb' });
});


/*
 *
 *
 *       POST
 *
 *
 * */

module.exports = router;
