const
  express = require('express'),
  app = express(),
  logger = require('morgan'),
  mongoose = require('mongoose'),
  bodyParser = require('body-parser'),
  // apiRoutes = require('./routes/cars.js')
  PORT = process.env.port || 3000

app.get('/', (req,res) => {
  res.sendFile(process.env.PWD + '/client/index.html')
})

app.listen(PORT, (err) => {
  console.log(err || "Server running on port: " + PORT)
})
