const
  mongoose = require('mongoose'),
  passport = require('passport'),
  bcrypt = require('bcrypt-nodejs'),
  walkerSchema = new mongoose.Schema({
    local: {
      name: String,
      password: String
    },
    dogs: [{type: mongoose.Schema.Types.ObjectId, ref: 'Dog'}]
  })

walkerSchema.pre('findOne', function() {
  this.populate('dogs')
})

walkerSchema.methods.generateHash = function(password) {
  return bcrypt.hashSync(password, bcrypt.genSaltSync(10))
}

walkerSchema.methods.validPassword = function(password) {
  return bcrypt.compareSync(password, this.local.password)
}

module.exports = mongoose.model('Walker', walkerSchema)
