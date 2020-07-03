const mongoose = require('mongoose');

const Schema = mongoose.Schema;

const userSchema = new Schema({
  email: {
    type: String,
    required: true
  },
  password: {
    type: String,
    required: true
  },
  // array of objects having id's of events of that user
  createdEvents: [
    {
      type: Schema.Types.ObjectId,
      // relation between events and users
      // use same name as in event.js
      ref: 'Event'
    }
  ]
});

module.exports = mongoose.model('User', userSchema);
