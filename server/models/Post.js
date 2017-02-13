const
  mongoose = require('mongoose'),
  Dog = require('./Dog.js'),
  Owner = require('./Owner.js'),
  postSchema = mongoose.Schema({
    content: String,
    date: Date,
    owner: {type: mongoose.Schema.Types.ObjectId, ref: 'Owner'},
    dog: {type: mongoose.Schema.Types.ObjectId, ref: 'Dog'}
  }, {
    timestamps: true
  })

postSchema.pre('findOne', function() {
  this.populate('dog owner')
})

// postSchema.pre('findOne', function() {
//   this.populate('_owner')
// })

module.exports = mongoose.model('Post', postSchema)
