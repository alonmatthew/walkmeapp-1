const
  express = require('express'),
  passport = require('passport'),
  passportConfig = require('../config/passport.js'),
  ownerRouter = express.Router(),
  Dog = require('../models/Dog.js'),
  Owner = require('../models/Owner.js')

ownerRouter.route('/')
  .get((req,res) => {
    res.sendFile(process.env.PWD + '/client/index.html')
  })

ownerRouter.route('/signup')
  .get((req,res) => {
    res.sendFile(process.env.PWD + '/client/public/templates/ownerSignup.html', {message: req.flash('signupMessage')})
  })
  .post(passport.authenticate('local-owner-signup', {
      successRedirect: '/owner/profile',
      failureRedirect: '/owner/signup'
    }))

ownerRouter.route('/profile')
  .get((req,res) => {
    res.sendFile(process.env.PWD + '/client/public/templates/ownerProfile.html')
  })

ownerRouter.route('/login')
  .get((req,res) => {
    res.sendFile(process.env.PWD + '/client/public/templates/ownerLogin.html', {message: req.flash('loginMessage')})
  })
  .post(passport.authenticate('local-owner-login', {
    successRedirect: '/owner/profile',
    failureRedirect: '/owner/login'
  }))

ownerRouter.route('/logout')
  .get((req,res) => {
    req.logout()
    res.redirect('/')
  })

function isLoggedIn(req, res, next) {
  if(req.isAuthenticated()) return next()
  req.flash('loginMessage', 'You must be logged in to see that.')
  res.redirect('/login')
}

module.exports = ownerRouter
