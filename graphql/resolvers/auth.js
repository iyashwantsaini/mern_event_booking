const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');

const User = require('../../models/user');

module.exports = {
  createUser: async args => {
    try {
      const existingUser = await User.findOne({ email: args.userInput.email });
      if (existingUser) {
        throw new Error('User exists already.');
      }
      // if no valid user with same email is found
      const hashedPassword = await bcrypt.hash(args.userInput.password, 12);
      // result of bcrypt.hash(..)
      const user = new User({
        email: args.userInput.email,
        password: hashedPassword
      });
      // return promise like object
      const result = await user.save();
      // result of user.save()
      // password:null so that hashed pass will not even show up
      return { ...result._doc, password: null, _id: result.id };
    } catch (err) {
      throw err;
    }
  },
  login: async ({ email, password }) => {
    const user = await User.findOne({ email: email });
    if (!user) {
      throw new Error('User does not exist!');
    }
    // compare stored and incoming password
    const isEqual = await bcrypt.compare(password, user.password);
    // user present but pass incorrect
    if (!isEqual) {
      throw new Error('Password is incorrect!');
    }
    // user is loggedin
    // now generate a token
    // this is a synchronous task
    // provide private key for hashing
    // expires in 1 hour
    const token = jwt.sign(
      { userId: user.id, email: user.email },
      'somesupersecretkey',
      {
        expiresIn: '1h'
      }
    );
    return { userId: user.id, token: token, tokenExpiration: 1 };
  }
};


// Simple Promise syntax

//   const events = (eventIds) => {
//     return Event.find({ _id: { $in: eventIds } })
//       .then((events) => {
//         return events.map((event) => {
//           return {
//             ...event._doc,
//             _id: event.id,
//             creator: user.bind(this, event.creator),
//           };
//         });
//       })
//       .catch((err) => {
//         throw err;
//       });
//   };
