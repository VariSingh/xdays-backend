const express = require('express');
const router = express.Router();
const passport = require('passport');
const config = require('../config/config');
const User = require('../models/user.model');
const jwt = require('jsonwebtoken');
const isAuthenticated  = require('../utils/auth')

// var userRoutes = require('./user');
// var challengeRoutes = require('./challenge');
// var dayRoutes = require('./day');
const challengeController = require('../controllers/challenge.controller');
const dayController = require('../controllers/day.controller');

const GoogleStrategy = require('passport-google-oauth20').Strategy;

var token = null;
async function checkGoogle(profile) {

  User.findOne({ googleId: profile.id },
    (err, user) => {
      if(!user){
        let data = {
          googleId:profile.id,
          profile:profile
        }
        user = new User(data);
        user.save(data, (error, user) => {
          if (error) {
              //res.status(400).send(error);
              return error;
          } else {
             return user;
          }
  
      })
      }else{
        return user;
      }

    });
}



// Use the GoogleStrategy within Passport.
//   Strategies in passport require a `verify` function, which accept
//   credentials (in this case, a token, tokenSecret, and Google profile), and
//   invoke a callback with a user object.
passport.use(new GoogleStrategy({
  clientID: config.GOOGLE_CLIENT_ID,
  clientSecret: config.GOOGLE_CLIENT_SECRET,
  callbackURL: `${config.api_url}/auth/google/callback`,
  passReqToCallback: true
},
  async (request, accessToken, refreshToken, profile, cb) => {

    const user = await checkGoogle(profile);
    token = jwt.sign({ profileId: profile.id }, config.jwt_secret);

    // token = profile.id;
    console.log("token------------------------- ",token);
    // check if user already exists in our own db
    return cb(null, profile);

  }
));


// { "googleId":profile.id,
// "profile":profile
// },
// {upsert: true, new: true, runValidators: true},





router.get('/user', function (req, res, next) {
  res.send('user');
});

router.get('/challenge',isAuthenticated, (req, res, next) => challengeController.findAll(req, res, next));
router.post('/challenge',isAuthenticated, (req, res, next) => challengeController.save(req, res, next));
router.delete('/challenge/:challengeId',isAuthenticated, (req, res, next) => challengeController.delete(req, res, next));
router.put('/challenge/:challengeId',isAuthenticated, (req, res, next) => res.send('update challenge'));


router.get('/challenge/:challengeId/days',isAuthenticated, (req, res, next) => dayController.findAll(req, res, next));
router.post('/challenge/:challengeId/days',isAuthenticated, (req, res, next) => dayController.save(req, res, next));
router.put('/day/:dayId',isAuthenticated, (req, res, next) => dayController.update(req, res, next));

router.post('/sendemail',isAuthenticated, (req, res, next) => challengeController.sendEmail(req, res, next));
/* GET home page. */



router.get('/auth/google', passport.authenticate('google', { scope: ['profile'] }));

router.get('/auth/google/callback',
  passport.authenticate('google', {
   // successRedirect: `${config.host}/mychallenges?token=${token}`,
    failureRedirect: '/auth/google',
    session: false
  }),(req,res)=>{
   // console.log(res);
    res.redirect(`${config.host}/#/auth?token=${token}`);
  });





// router.get('/', function (req, res, next) {
//   res.render('index', { title: 'Express' });
// });

module.exports = router;
