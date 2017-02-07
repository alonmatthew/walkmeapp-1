const
  express = require('express'),
  app = express(),
  PORT = process.env.port || 3000,
  logger = require('morgan'),
  mongoose = require('mongoose'),
  bodyParser = require('body-parser'),
  passport = require('passport'),
  appRoutes = require('./routes/app.js'),
  ownerRoutes = require('./routes/owner.js'),
  walkerRoutes = require('./routes/walker.js')

app.use('/', appRoutes)
app.use('/owner', ownerRoutes)
app.use('/walker', walkerRoutes)

app.listen(PORT, (err) => {
  console.log(err || "Server running on port: " + PORT)
})
