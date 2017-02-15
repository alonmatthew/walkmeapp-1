const
  mongoose = require('mongoose'),
  Dog = require('./Dog.js'),
  Owner = require('./Owner.js'),
  postSchema = mongoose.Schema({
    content: String,
    date: Date,
    // requested: Boolean,
    accepted: Boolean,
    dog: {type: mongoose.Schema.Types.ObjectId, ref: 'Dog'},
    owner: {type: mongoose.Schema.Types.ObjectId, ref: 'Owner'},
    requested_by: [{type: mongoose.Schema.Types.ObjectId, ref: 'Walker'}],
    walker: {type: mongoose.Schema.Types.ObjectId, ref: 'Walker'}
  }, {
    timestamps: true
  })

postSchema.pre('find', function() {
  this.populate('dog owner requested_by')
})


module.exports = mongoose.model('Post', postSchema)
