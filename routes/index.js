var express = require('express');
var router = express.Router();

// var userRoutes = require('./user');
// var challengeRoutes = require('./challenge');
// var dayRoutes = require('./day');
const challengeController = require('../controllers/challenge.controller');
const dayController = require('../controllers/day.controller');

router.get('/user',function(req, res, next) {
  res.send('user');
});

router.get('/challenge',(req,res,next) => challengeController.findAll(req,res,next));
router.post('/challenge',(req, res, next) => challengeController.save(req,res,next));
router.delete('/challenge/:challengeId',(req, res, next) => challengeController.delete(req,res,next));
router.put('/challenge/:challengeId',(req, res, next) => res.send('update challenge'));


router.get('/challenge/:challengeId/days',(req,res,next) => dayController.findAll(req,res,next));
router.post('/challenge/:challengeId/days',(req,res,next) => dayController.save(req,res,next));
router.put('/day/:dayId',(req,res,next) => dayController.update(req,res,next));


/* GET home page. */
router.get('/', function(req, res, next) {
  res.render('index', { title: 'Express' });
});

module.exports = router;
