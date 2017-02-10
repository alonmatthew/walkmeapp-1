const
  mongoose = require('mongoose'),
  postSchema = mongoose.Schema({
    content: String,
    _dog: {type: mongoose.Schema.Types.ObjectId, ref: 'Dog'},
    _owner: {type: mongoose.Schema.Types.ObjectId, ref: 'Owner'}
  })

postSchema.pre('findOne', function() {
  this.populate('_dog')
})

postSchema.pre('findOne', function() {
  this.populate('_owner')
})

module.exports = mongoose.model('Post', postSchema)
