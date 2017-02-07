const
  express = require('express'),
  appRouter = express.Router()

appRouter.route('/')
  .get((req,res) => {
    res.sendFile(process.env.PWD + '/client/index.html')
  })

module.exports = appRouter
