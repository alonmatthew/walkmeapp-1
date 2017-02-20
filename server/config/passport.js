const
  passport = require('passport'),
  flash = require('connect-flash'),
  LocalStrategy = require('passport-local').Strategy,
  Owner = require('../models/Owner.js'),
  Walker = require('../models/Walker.js')

passport.serializeUser((user, done) => {
  done(null, user.id)
})



passport.deserializeUser((id, done) => {
  Owner.findById(id, function(err, owner) {
    if(owner) return done(err, owner)
    Walker.findById(id, function(err, walker) {
      if(walker) { return done(err, walker) }
      else { return done(false)}
    })
  })
})

passport.use('local-owner-signup', new LocalStrategy({
  usernameField: 'email',
  passwordField: 'password',
  passReqToCallback: true
}, (req, email, password, done) => {
  console.log("local signup hit")
  console.log(req.body)
  Owner.findOne({'local.email': email}, (err, owner) => {
    if(err) {
      return done(err)
    }
    if(owner) {
      return done(null, false, req.flash('signupMessage', 'That username is taken.'))
    }
    var newOwner = new Owner()
    newOwner.local.email = email
    newOwner.local.fName = req.body.fName
    newOwner.local.lName = req.body.lName
    newOwner.local.birthday = req.body.birthday
    newOwner.local.address1 = req.body.address1
    newOwner.local.address2 = req.body.address2
    newOwner.local.city = req.body.city
    newOwner.local.state = req.body.state
    newOwner.local.zip = req.body.zip
    newOwner.local.phoneNumber = req.body.phoneNumber
    newOwner.local.password = newOwner.generateHash(password)
    newOwner.local.owner = true
    newOwner.save((err, owner) => {
      if(err) return done(err, false)
      return done(null, owner, null)
    })
  })
}))
passport.use('local-walker-signup', new LocalStrategy({
  usernameField: 'email',
  passwordField: 'password',
  passReqToCallback: true
}, (req, email, password, done) => {
  console.log("local signup hit")
  Walker.findOne({'local.email': email}, (err, walker) => {
    if(err) {
      return done(err)
    }
    if(walker) {
      return done(null, false, req.flash('signupMessage', 'That username is taken.'))
    }
    var newWalker = new Walker()
    newWalker.local.email = email
    newWalker.local.fName = req.body.fName
    newWalker.local.lName = req.body.lName
    newWalker.local.birthday = req.body.birthday
    newWalker.local.address1 = req.body.address1
    newWalker.local.address2 = req.body.address2
    newWalker.local.city = req.body.city
    newWalker.local.state = req.body.state
    newWalker.local.zip = req.body.zip
    newWalker.local.phoneNumber = req.body.phoneNumber
    newWalker.local.password = newWalker.generateHash(password)
    newWalker.local.walker = true
    newWalker.save((err, walker) => {
      if(err) return done(err, false)
      return done(null, walker, null)
    })
  })
}))

passport.use('local-walker-login', new LocalStrategy({
  usernameField: 'email',
  passwordField: 'password',
  passReqToCallback: true
}, (req, email, password, done) => {
  console.log(req.body)
  Walker.findOne({'local.email': email}, (err, walker) => {
    if(err) return done(err)
    if(!walker) return done(null, false, req.flash('loginMessage', 'No user found...'))
    if(!walker.validPassword(password)) return done(null, false, req.flash('loginMessage', 'Wrong Password'))
    return done(null, walker)
  })
}))

passport.use('local-owner-login', new LocalStrategy({
  usernameField: 'email',
  passwordField: 'password',
  passReqToCallback: true
}, (req, email, password, done) => {
  console.log(req)
  Owner.findOne({'local.email': email}, (err, owner) => {
    if(err) return done(err)
    if(!owner) return done(null, false, req.flash('loginMessage', 'No user found...'))
    if(!owner.validPassword(password)) return done(null, false, req.flash('loginMessage', 'Wrong Password'))
    return done(null, owner)
  })
}))

module.exports = passport
