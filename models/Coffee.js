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
  importer: {
    type: String,
    required: true
  },
  Weight: {
    type: Interger,
    required: true
  },
  Cost: {
    type: Interger,
    required: true
  }
});

module.exports = Coffee = mongoose.model("coffees", CoffeeSchema);
