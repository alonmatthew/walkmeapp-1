const
  express = require('express'),
  passport = require('passport'),
  passportConfig = require('../config/passport.js'),
  walkerRouter = express.Router(),
  Dog = require('../models/Dog.js'),
  Post = require('../models/Post.js'),
  Walker = require('../models/Walker.js')

walkerRouter.route('/')
  .get((req,res) => {
    res.sendFile(process.env.PWD + '/client/index.html')
  })

walkerRouter.route('/signup')
  .get((req,res) => {
    res.sendFile(process.env.PWD + '/client/public/templates/walkerSignup.html', {message: req.flash('signupMessage')})
  })
  .post(passport.authenticate('local-walker-signup', {
    successRedirect: '/walker/profile',
    failureRedirect: '/walker/signup'
  }))

walkerRouter.route('/profile')
  .get((req,res) => {
    res.sendFile(process.env.PWD + '/client/public/templates/walkerProfile.html' , {message: req.flash('loginMessage')})
  })

walkerRouter.route('/login')
  .get((req,res) => {
    res.sendFile(process.env.PWD + '/client/public/templates/walkerLogin.html')
  })
  .post(passport.authenticate('local-walker-login', {
    successRedirect: '/walker/profile',
    failureRedirect: '/walker/login'
  }))

walkerRouter.route('/logout')
  .get((req,res) => {
  req.logout()
  res.redirect('/')
})

walkerRouter.route('/status')
  .get((req, res) => {
    console.log("Trying to retrieve current user:")
    console.log(req.user)
    if (!req.isAuthenticated()) return res.status(200).json({ status: false })
    res.status(200).json({ status: true, user: req.user })
  })

walkerRouter.route('/post/:id')
  .get((req, res) => {
    if (req.isAuthenticated()) {
      Post.findById(req.params.id, (err,post) => {
        console.log(post)
        res.sendFile(process.env.PWD + '/client/public/templates/walkerPost.html', {post: post})
      })

    } else {
      res.redirect('/')
    }
  })
  .patch((req,res) => {
    console.log("req.body on patch request")
    console.log(req.body)
    Post.findById(req.params.id, (err, post) => {
      if(err) throw err
      post.requested_by.push(req.body.user._id)
      post.save()
      res.json(post)
    })
    // Post.findByIdAndUpdate(req.params.id, req.body,  function(err,post) {
    //   if (err) console.log(err);
    //   console.log(post)
    //   res.json(post)
    //   console.log(post)
    // })
  })


walkerRouter.route('/walks')
  .get((req,res) => {
    res.sendFile(process.env.PWD + '/client/public/templates/walkerWalks.html')
  })

module.exports = walkerRouter
