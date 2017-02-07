const
  express = require('express'),
  Walker = require('../models/Walker.js'),
  walkerRoutes = express.Router()

walkerRoutes.route('/')
  .get((req,res) => {
    res.sendFile(process.env.PWD + '/client/index.html')
  })

walkerRoutes.route('/signup')
  .get((req,res) => {
    res.sendFile(process.env.PWD + '/client/public/templates/walkerSignup.html')
  })

walkerRoutes.route('/profile')
  .get((req,res) => {
    res.sendFile(process.env.PWD + '/client/public/templates/walkerProfile.html')
  })

module.exports = walkerRoutes
