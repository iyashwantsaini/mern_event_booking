const mongoose = require('mongoose');

const Schema = mongoose.Schema;

// make this same as graphql schema
const eventSchema = new Schema({
  title: {
    type: String,
    required: true
  },
  description: {
    type: String,
    required: true
  },
  price: {
    type: Number,
    required: true
  },
  date: {
    type: Date,
    required: true
  },
  creator: {
      type: Schema.Types.ObjectId,
    // make connection to User model
    ref: "User",
  },
});

// now create model from schema & export it
module.exports = mongoose.model('Event', eventSchema);
