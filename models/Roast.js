const mongoose = require("mongoose");
const Schema = mongoose.Schema;

// Create Schema
const RoastSchema = new Schema({
  name: {
    type: String,
    required: true
  },
  weight: {
    type: String,
    required: true
  },
  events: {
    type: String,
    required: true
  },
  date: {
    type: Date,
    default: Date.now
  }
});

module.exports = Roast = mongoose.model("roasts", RoastSchema);
