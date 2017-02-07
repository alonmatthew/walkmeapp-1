const
  express = require('express'),
  app = express(),
  logger = require('morgan'),
  mongoose = require('mongoose'),
  bodyParser = require('body-parser'),
  passport = require('passport'),
  appRoutes = require('./routes/app.js'),
  ownerRoutes = require('./routes/owner.js'),
  walkerRoutes = require('./routes/walker.js'),

  PORT = process.env.port || 3000,
  mongooseConnectionString = process.env.MONGODB_URL || 'mongodb://localhost/walkme-app'

mongoose.connect(mongooseConnectionString, (err) => {
  console.log(err || "Connected to MongoDB(walkme-app)")
})

app.use(express.static(process.env.PWD + '/client/public'))

app.use('/', appRoutes)
app.use('/owner', ownerRoutes)
app.use('/walker', walkerRoutes)

app.listen(PORT, (err) => {
  console.log(err || "Server running on port: " + PORT)
})
