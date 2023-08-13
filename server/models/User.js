const { Schema, model } = require('mongoose');
const bcrypt = require('bcrypt');

// import schema from Candle.js
const candleSchema = require('./Candle');

const userSchema = new Schema(
  {
    username: {
      type: String,
      required: true,
      unique: true,
    },
    email: {
      type: String,
      required: true,
      unique: true,
      match: [/.+@.+\..+/, 'Must use a valid email address'],
    },
    password: {
      type: String,
      required: true,
    },
    // set savedCandles to be an array of data that adheres to the candleSchema
    savedCandles: [candleSchema],
  },
  // set this to use virtual below
  {
    toJSON: {
      virtuals: true,
    },
  }
);

// hash user password
userSchema.pre('save', async function (next) {
  if (this.isNew || this.isModified('password')) {
    const saltRounds = 10;
    this.password = await bcrypt.hash(this.password, saltRounds);
  }

  next();
});

// custom method to compare and validate password for logging in
userSchema.methods.isCorrectPassword = async function (password) {
  return bcrypt.compare(password, this.password);
};

// when we query a user, we'll also get another field called `candleCount` with the number of saved candles we have
userSchema.virtual('candleCount').get(function () {
  return this.savedCandles.length;
});

const User = model('User', userSchema);

module.exports = User;
