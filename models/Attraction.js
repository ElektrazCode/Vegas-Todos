const mongoose = require('mongoose')

const AttractionSchema = new mongoose.Schema({
  attraction: {
    type: String,
    required: true,
  },
  completed: {
    type: Boolean,
    required: true,
  },
  userId: {
    type: String,
    required: true
  }
})

module.exports = mongoose.model('Attraction', AttractionSchema)
