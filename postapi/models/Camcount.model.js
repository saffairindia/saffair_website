const mongoose = require("mongoose");


const eventSchema = new mongoose.Schema({
  eventId: { type: String, required: true },
  yesCount: { type: Number, default: 0 },
  noCount: { type: Number, default: 0 },
  maybeCount: { type: Number, default: 0 }, 
  userResponses: [{
    userId: {
      type: String,
    }, response: {
      type: String
    }
  }],
});

const campcount = mongoose.model('Campcount', eventSchema); 

module.exports = campcount;