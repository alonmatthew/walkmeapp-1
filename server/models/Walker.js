const
  mongoose = require('mongoose'),
  passport = require('passport'),
  bcrypt = require('bcrypt-nodejs'),
  Dog = require('./Dog.js'),
  Owner = require('./Owner.js'),
  Post = require('./Post.js'),
  walkerSchema = new mongoose.Schema({
    local: {
      fName: String,
      lName: String,
      birthday: String,
      address1: String,
      address2: String,
      city: String,
      state: String,
      zip: String,
      phoneNumber: String,
      email: String,
      password: String,
      messages: [],
      walker: Boolean
    },
    dogs: [{type: mongoose.Schema.Types.ObjectId, ref: 'Dog'}],
    posts: [{type: mongoose.Schema.Types.ObjectId, ref: 'Post'}]
  })

walkerSchema.pre('findOne', function() {
  this.populate([
    {path: 'posts', model: 'Post',
      populate: {
        path: 'dog',
        model: 'Dog'
      }
    },
    {path: 'posts', model: 'Post',
      populate: {
        path: 'owner',
        model: 'Owner'
      }
    }
  ])
})

walkerSchema.methods.generateHash = function(password) {
  return bcrypt.hashSync(password, bcrypt.genSaltSync(10))
}

walkerSchema.methods.validPassword = function(password) {
  return bcrypt.compareSync(password, this.local.password)
}

module.exports = mongoose.model('Walker', walkerSchema)
