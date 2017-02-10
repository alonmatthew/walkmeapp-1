const
  express = require('express'),
  passport = require('passport'),
  passportConfig = require('../config/passport.js'),
  ownerRouter = express.Router(),
  Dog = require('../models/Dog.js'),
  Owner = require('../models/Owner.js'),
  Post = require('../models/Post.js')

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

ownerRouter.route('/status')
  .get((req, res) => {
  if (!req.isAuthenticated()) return res.status(200).json({ status: false })
  res.status(200).json({ status: true, user: req.user })
  })

ownerRouter.route('/post')
  .get((req,res) => {
    if (req.isAuthenticated()) {
      res.sendFile(process.env.PWD + '/client/public/templates/ownerPost.html')
    } else {
      res.redirect('/')
    }
  })
  .post((req,res) => {
    var newPost = new Post(req.body)
    newPost._owner = req.user
    newPost.save((err, post) => {
      req.user.local.posts.push(post)
      req.user.save()
      if(err) return console.log(err)
      res.redirect('/')
    })
    // Post.create(req.body, (err,post) => {
    //   if(err) throw err
    //   res.json({message: "Post created!"})
    // })
  })

module.exports = ownerRouter
