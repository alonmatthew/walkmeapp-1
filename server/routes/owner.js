const
  express = require('express'),
  passport = require('passport'),
  passportConfig = require('../config/passport.js'),
  ownerRouter = express.Router(),
  Owner = require('../models/Owner.js')

ownerRouter.route('/')
  .get((req,res) => {
    res.sendFile(process.env.PWD + '/client/index.html')
  })

ownerRouter.route('/signup')
  .get((req,res) => {
    res.sendFile(process.env.PWD + '/client/public/templates/ownerSignup.html')
  })
  .post((req,res) => {
    console.log("Req.body on line 18");
    console.log(req.body);
    return passport.authenticate('local-signup', {
      successRedirect: '/profile',
      failureRedirect: '/signup'
    })
  })

ownerRouter.route('/profile')
  .get((req,res) => {
    res.sendFile(process.env.PWD + '/client/public/templates/ownerProfile.html')
  })

module.exports = ownerRouter
