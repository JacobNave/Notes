const mongoose = require('mongoose')

let Schema = mongoose.Schema

const note = new Schema({
  title: {
    type: String,
    require: true,
    default: ""
  },
  text: {
    type: String,
    require: true,
    default: ""
  },
  date: {
    type: Date,
    require: true,
    default: Date.now
  }
})

module.exports = mongoose.model('Note', note)
