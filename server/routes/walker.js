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
    res.sendFile(process.env.PWD + '/client/public/templates/walkerSignup.html', {message: req.flash('signupMessage')})
  })
  .post(passport.authenticate('local-walker-signup', {
    successRedirect: '/walker/profile',
    failureRedirect: '/walker/signup'
  }))

walkerRoutes.route('/profile')
  .get((req,res) => {
    res.sendFile(process.env.PWD + '/client/public/templates/walkerProfile.html' , {message: req.flash('loginMessage')})
  })

walkerRoutes.route('/login')
  .get((req,res) => {
    res.sendFile(process.env.PWD + '/client/public/templates/walkerLogin.html')
  })
  .post(passport.authenticate('local-walker-login', {
    successRedirect: '/walker/profile',
    failureRedirect: '/walker/login'
  }))

walkerRoutes.route('/logout')
  .get((req,res) => {
  req.logout()
  res.redirect('/')
})

walkerRoutes.route('/status')
  .get((req, res) => {
    if (!req.isAuthenticated()) return res.status(200).json({ status: false })
    res.status(200).json({ status: true, user: req.user })
  })


module.exports = walkerRoutes
