const { dateToString } = require("../../helpers/date");
// Models
const Event = require("../../models/event");
const {transformEvent,user } =require('./resolverhelpers');
const User=require('../../models/user');


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
        return transformEvent(event);
      });
    } catch (err) {
      throw err;
    }
  },
  createEvent: async (args,req) => {
    if(!req.isAuth){
      throw new Error('User unauthenticated!');
    }
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
        date: dateToString(event._doc.date),
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
};
