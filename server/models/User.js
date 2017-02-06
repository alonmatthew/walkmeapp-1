const
  mongoose = require('mongoose'),
  userSchema = new mongoose.Schema({
    fname: String,
    lname: String,
    password: String,
    walker: false,
    owner: false
  })

const User = mongoose.model('User', userSchema)

module.exports = User
