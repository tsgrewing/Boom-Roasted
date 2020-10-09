const mongoose = require("mongoose");
const Schema = mongoose.Schema;

// Create Schema
const RoastSchema = new Schema({
  name: {
    type: String,
    required: true
  },
  weight: {
    type: Number,
    required: true
  },
  events: {
    type: String,
    required: true
  },
  first: {
    time: {
      type: String
    },
    temp: {
      type: String
    }
  },
  drop: {
    time: {
      type: String
    },
    temp: {
      type: String
    }
  },
  change: {
    time: {
      type: String
    },
    temp: {
      type: String
    }
  },
  turn: {
    time: {
      type: String
    },
    temp: {
      type: String
    }
  },
  date: {
    type: Date,
    default: Date.now
  }
});

module.exports = Roast = mongoose.model("roasts", RoastSchema);
