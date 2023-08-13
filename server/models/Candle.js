const { Schema } = require('mongoose');

// This is a subdocument schema, it won't become its own model but we'll use it as the schema for the User's `savedCandles` array in User.js
const candleSchema = new Schema({

  candleId: {
    type: String,
    required: true,
  },
  candleTitle: {
    type: String,
    required: true,
  },
  candleSize: {
    type: String,
  },
  candleColor: {
    type: String,
  },
  candleScent: {
    type: String,
    required: true,
  },
  candlePrice: {
    type: String,
    required: true,
  },
  candleDescription: {
    type: String,
  },
  candleImage: {
    type: String,
  },
});

module.exports = candleSchema;
