var express = require('express');
var router = express.Router();

// var userRoutes = require('./user');
// var challengeRoutes = require('./challenge');
// var dayRoutes = require('./day');

router.get('/user',function(req, res, next) {
  res.send('user');
});

router.get('/challenge',function(req, res, next) {
  res.send('challenge');
});

router.get('/day',function(req, res, next) {
  res.send('day');
});


/* GET home page. */
router.get('/', function(req, res, next) {
  res.render('index', { title: 'Express' });
});

module.exports = router;
