const
  mongoose = require('mongoose'),
  dogSchema = mongoose.Schema({
    name: String,
    _owner: {type: mongoose.Schema.Types.ObjectId, ref: 'Owner'},
    _walker: {type: mongoose.Schema.Types.ObjectId, ref: 'Walker'}
  })

dogSchema.pre('findOne', function() {
  this.populate('_owner')
})

dogSchema.pre('findOne', function() {
  this.populate('_walker')
})

module.exports = mongoose.model('Dog', dogSchema)
