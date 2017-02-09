const
  express = require('express'),
  passport = require('passport'),
  passportConfig = require('../config/passport.js'),
  walkerRoutes = express.Router(),
  Dog = require('../models/Dog.js'),
  Walker = require('../models/Walker.js')

walkerRoutes.route('/')
  .get((req,res) => {
    res.sendFile(process.env.PWD + '/client/index.html')
  })

walkerRoutes.route('/signup')
  .get((req,res) => {
    res.sendFile(process.env.PWD + '/client/public/templates/walkerSignup.html')
  })
  .post(passport.authenticate('local-walker-signup', {
    successRedirect: '/walker/profile',
    failureRedirect: '/walker/signup'
  }))

walkerRoutes.route('/login')
  .get((req,res) => {
    res.sendFile(process.env.PWD + '/client/public/templates/walkerLogin.html')
  })
  .post(passport.authenticate('local-login', {
    successRedirect: '/walker/profile',
    failureRedirect: '/walker/login'
  }))

walkerRoutes.route('/profile')
  .get((req,res) => {
      res.sendFile(process.env.PWD + '/client/public/templates/walkerProfile.html')
    })

module.exports = walkerRoutes
