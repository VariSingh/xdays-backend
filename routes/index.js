const express = require('express');
const router = express.Router();
const passport = require('passport');
const config = require('../config/config');
const User = require('../models/user.model');

// var userRoutes = require('./user');
// var challengeRoutes = require('./challenge');
// var dayRoutes = require('./day');
const challengeController = require('../controllers/challenge.controller');
const dayController = require('../controllers/day.controller');

const GoogleStrategy = require('passport-google-oauth20').Strategy;

// Use the GoogleStrategy within Passport.
//   Strategies in passport require a `verify` function, which accept
//   credentials (in this case, a token, tokenSecret, and Google profile), and
//   invoke a callback with a user object.
passport.use(new GoogleStrategy({
  clientID: config.GOOGLE_CLIENT_ID,
  clientSecret: config.GOOGLE_CLIENT_SECRET,
  callbackURL: "http://localhost:3000/auth/google/callback"
},
function(accessToken, refreshToken, profile, cb) {
  User.findOneAndUpdate({ googleId: profile.id },
    { "googleId":profile.id,
      "profile":profile
    },
    {upsert: true, new: true, runValidators: true},
     function (err, user) {
    return cb(err, user);
  });
}
));








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

router.post('/sendemail',(req,res,next) => challengeController.sendEmail(req,res,next));
/* GET home page. */



router.get('/auth/google',
  passport.authenticate('google', { scope: ['profile'] })
);

router.get('/auth/google/callback', 
  passport.authenticate('google', { failureRedirect: '/login' }),
  function(req, res) {
    res.redirect('/');
  });





router.get('/', function(req, res, next) {
  console.log(req.params);
  console.log(req.body);
  res.render('index', { title: 'Express' });
});

module.exports = router;
