const bcrypt = require("bcryptjs");

// Models
const Event = require("../../models/event");
const User = require("../../models/user");

const events = async (eventIds) => {
  try {
    const events = await Event.find({ _id: { $in: eventIds } });
    return events.map((event) => {
      return {
        ...event._doc,
        _id: event.id,
        creator: user.bind(this, event.creator),
      };
    });
  } catch (err) {
    throw err;
  }
};

const user = async (userId) => {
  try {
    const user = await User.findById(userId);
    return {
      ...user._doc,
      _id: user.id,
      createdEvents: events.bind(this, user._doc.createdEvents),
    };
  } catch (err) {
    throw err;
  }
};

module.exports = {
  // names of queries and resolvers are same
  events: async () => {
    //   populate -- mongoose populates all relations
    // return Event.find().populate('creator')
    try {
      const events = await Event.find();
      return events.map((event) => {
        // convert mongoDB _id to a string so that it can be viewed & understood by graphQL
        // return {...event._doc,_id:event._doc._id.toString()};
        // or
        return {
          ...event._doc,
          _id: event.id,
          date: new Date(event._doc.date).toISOString(),
          creator: user.bind(this, event._doc.creator),
        };
      });
    } catch (err) {
      throw err;
    }
  },
  createEvent: async (args) => {
    // simple static method
    // const event={
    //     _id:Math.random().toString(),
    //     title:args.eventInput.title,
    //     description:args.eventInput.description,
    //     price:+args.eventInput.price,
    //     date:args.eventInput.date
    // };
    // events.push(event);
    // return event;

    // using mongoDB to make event on ATLAS
    const event = new Event({
      title: args.eventInput.title,
      description: args.eventInput.description,
      price: +args.eventInput.price,
      date: new Date(args.eventInput.date),
      creator: "5ef5d699c216df6db7194a64",
    });

    let createdEvent;
    // return/await here will show graphql to wait while Operation is completed
    try {
      const result = await event.save();
      createdEvent = {
        ...result._doc,
        password: null,
        _id: result.id,
        date: new Date(event._doc.date).toISOString(),
        creator: user.bind(this, result._doc.creator),
      };
      const creator = await User.findById("5ef5d699c216df6db7194a64");
      // for user.findById()

      if (!creator) {
        throw new Error("User does not exist!");
      }
      creator.createdEvents.push(event);
      await creator.save();
      return createdEvent;
    } catch (err) {
      console.log(err);
      throw err;
    }
  },
  createUser: async (args) => {
    try {
      const existingUser = await User.findOne({ email: args.userInput.email });

      if (existingUser) {
        throw new Error("User with same email exists already!");
      }
      // if no valid user with same email is found
      const hashedPass = await bcrypt.hash(args.userInput.password, 12);

      // result of bcrypt.hash(..)
      const user = new User({
        email: args.userInput.email,
        password: hashedPass,
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
