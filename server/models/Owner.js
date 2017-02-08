const
  mongoose = require('mongoose'),
  passport = require('passport'),
  bcrypt = require('bcrypt-nodejs'),
  ownerSchema = new mongoose.Schema({
    local: {
      name: String,
      password: String
    },
    dogs: [{type: mongoose.Schema.Types.ObjectId, ref: 'Dog'}]
})

ownerSchema.pre('findOne', function() {
  this.populate('dogs')
})

ownerSchema.methods.generateHash = function(password) {
  return bcrypt.hashSync(password, bcrypt.genSaltSync(10))
}

ownerSchema.methods.validPassword = function(password) {
  return bcrypt.compareSync(password, this.local.password)
}

module.exports = mongoose.model('Owner', ownerSchema)
