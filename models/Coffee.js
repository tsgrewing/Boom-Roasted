const mongoose = require("mongoose");
const Schema = mongoose.Schema;

// Create Schema
const CoffeeSchema = new Schema({
  name: {
    type: String,
    required: true
  },
  process: {
    type: String,
    required: true
  },
  country: {
    type: String,
    required: true
  },
  weight: {
    type: Number,
    required: true
  },
  cost: {
    type: Number,
    required: true
  },
  user: {
    type: String,
    required: true
  }
});

const Coffee = mongoose.model("coffee", CoffeeSchema)

module.exports = Coffee;