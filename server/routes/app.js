const
  express = require('express'),
  Owner = require('../models/Owner.js'),
  Walker = require('../models/Walker.js'),
  Post = require('../models/Post.js'),
  appRouter = express.Router()

appRouter.route('/')
  .get((req,res) => {
    res.sendFile(process.env.PWD + '/client/index.html')
  })

appRouter.route('/api/owners')
  .get((req,res) => {
    Owner.find({}, (err,owners) => {
      if(err) throw err
      res.json({owners: owners})
    })
  })

appRouter.route('/api/walkers')
  .get((req,res) => {
    Walker.find({}, (err, walkers) => {
      if(err) throw err
      res.json({walkers: walkers})
    })
  })

appRouter.route('/test')
  .get((req,res) => {
    res.sendFile(process.env.PWD + '/client/public/templates/testMap.html')
})

appRouter.route('/api/posts')
  .get((req,res) => {
    Post.find({}, (err, posts) => {
      if(err) throw err
      res.json({posts: posts})
    })
})

module.exports = appRouter
