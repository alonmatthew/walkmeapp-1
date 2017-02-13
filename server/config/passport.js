const
  passport = require('passport'),
  flash = require('connect-flash'),
  LocalStrategy = require('passport-local').Strategy,
  Owner = require('../models/Owner.js'),
  Walker = require('../models/Walker.js')

passport.serializeUser((owner, done) => {
  done(null, owner.id)
})

passport.deserializeUser((id, done) => {
  Owner.findById(id, (err, owner) =>{
    done(err, owner)
  })
})

passport.use('local-owner-signup', new LocalStrategy({
  usernameField: 'name',
  passwordField: 'password',
  passReqToCallback: true
}, (req, name, password, done) => {
  console.log("local signup hit")
  Owner.findOne({'local.name': name}, (err, owner) => {
    if(err) {
      return done(err)
    }
    if(owner) {
      return done(null, false, req.flash('signupMessage', 'That username is taken.'))
    }
    var newOwner = new Owner()
    newOwner.local.name = name
    newOwner.local.address = req.body.address
    newOwner.local.password = newOwner.generateHash(password)
    newOwner.local.owner = true
    newOwner.save((err, owner) => {
      if(err) return done(err, false)
      return done(null, owner, null)
    })
  })
}))
passport.use('local-walker-signup', new LocalStrategy({
  usernameField: 'name',
  passwordField: 'password',
  passReqToCallback: true
}, (req, name, password, done) => {
  console.log("local signup hit")
  Walker.findOne({'local.name': name}, (err, walker) => {
    if(err) {
      return done(err)
    }
    if(walker) {
      return done(null, false, req.flash('signupMessage', 'That username is taken.'))
    }
    var newWalker = new Walker()
    newWalker.local.name = name
    newWalker.local.address = req.body.address
    newWalker.local.password = newWalker.generateHash(password)
    newWalker.local.walker = true
    newWalker.save((err, walker) => {
      if(err) return done(err, false)
      return done(null, walker, null)
    })
  })
}))

passport.use('local-walker-login', new LocalStrategy({
  usernameField: 'name',
  passwordField: 'password',
  passReqToCallback: true
}, (req, name, password, done) => {
  console.log(req.body)
  Walker.findOne({'local.name': name}, (err, walker) => {
    if(err) return done(err)
    if(!walker) return done(null, false, req.flash('loginMessage', 'No user found...'))
    if(!walker.validPassword(password)) return done(null, false, req.flash('loginMessage', 'Wrong Password'))
    return done(null, walker)
  })
}))

passport.use('local-owner-login', new LocalStrategy({
  usernameField: 'name',
  passwordField: 'password',
  passReqToCallback: true
}, (req, name, password, done) => {
  console.log(req)
  Owner.findOne({'local.name': name}, (err, owner) => {
    if(err) return done(err)
    if(!owner) return done(null, false, req.flash('loginMessage', 'No user found...'))
    if(!owner.validPassword(password)) return done(null, false, req.flash('loginMessage', 'Wrong Password'))
    return done(null, owner)
  })
}))

module.exports = passport
