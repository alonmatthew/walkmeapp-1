const
  passport = require('passport'),
  LocalStrategy = require('passport-local').Strategy,
  Owner = require('../models/Owner.js')

passport.serializeUser((user, done) => {
  done(null, user.id)
})

passport.deserializeUser((id, done) => {
  User.findById(id, (err, user) =>{
    done(err, user)
  })
})

passport.use('local-signup', new LocalStrategy({
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
    newOwner.local.password = newOwner.generateHash(password)
    // newOwner.local.name = req.body.name
    newOwner.save((err, owner) => {
      if(err) return done(err, false)
      return done(null, owner, null)
    })
  })
}))

passport.use('local-login', new LocalStrategy({
  usernameField: 'email',
  passwordField: 'password',
  passReqToCallback: true
}, (req, email, password, done) => {
  User.findOne({'local.email': email}, (err, user) => {
    if(err) return done(err)
    if(!user) return done(null, false, req.flash('loginMessage', 'No user found...'))
    if(!user.validPassword(password)) return done(null, false, req.flash('loginMessage', 'Wrong Password'))
    return done(null, user)
  })
}))

module.exports = passport
