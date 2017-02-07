const
  mongoose = require('mongoose'),
  dogSchema = mongoose.Schema({
    name: String,
    _owner: {type: mongoose.Schema.Type.ObjectId, ref: 'Owner'},
    _walker: {type: mongoose.Schema.Type.ObjectId, ref: 'Walker'}
  })

dogSchema.pre('findOne', function() {
  this.populate('_owner')
})

dogSchema.pre('findOne', function() {
  this.populate('_walker')
})

module.exports = mongoose.model('Dog', dogSchema)
