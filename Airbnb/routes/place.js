var router = require('express').Router();
var modelPlace = require('../models/place');

//Get place 
router.get('/:id', function(req, res, next) {
    
    modelPlace.getPlace(req.params.id,(err,rows)=>{
        place = rows[0]
        if(typeof place === 'undefined') {
            res.redirect('/place/');
        }
        res.render('place/get', { data: place});    
    });
});

//Get booking information
router.get('/:id/book', function(req, res, next) {

    place = modelPlace.getPlace(req.params.id);
    if(typeof place === 'undefined') {
        res.redirect('/place/');
    }
    res.end("WIP");
    //res.render('place/get', { data: place});
});

// Get place list
router.get('/', function(req, res, next) {

    // fetching list
    modelPlace.getList((err,rows) => {
        res.render('place/list', { data: rows})
    });
    
});

module.exports = router;
