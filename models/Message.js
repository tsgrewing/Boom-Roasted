const mongoose = require("mongoose");
const Schema = mongoose.Schema;

// Create Schema
const MessageSchema = new Schema({
  author: {
    type: String,
    required: true
  },
  authorUsername: {
    type: String,
    required: true
  },
  title: {
    type: String,
    required: true
  },
  category: {
    type: String,
    required: true
  },
  message: {
    type: String,
    required: true
  },
  date: {
    type: Date,
    default: Date.now
  },
  replies: {
    type: Array,
    default: []
  }
});

module.exports = message = mongoose.model("messages", MessageSchema);
