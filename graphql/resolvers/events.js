const Event = require('../../models/event');
const User = require('../../models/user');

const { transformEvent } = require('./merge');

module.exports = {
  // names of queries and resolvers are same
  events: async () => {
    //   populate -- mongoose populates all relations
    // return Event.find().populate('creator')
    try {
      const events = await Event.find();
      return events.map(event => {
        // convert mongoDB _id to a string so that it can be viewed & understood by graphQL
        // return {...event._doc,_id:event._doc._id.toString()};
        // or
        return transformEvent(event);
      });
    } catch (err) {
      throw err;
    }
  },
  createEvent: async (args, req) => {
    if (!req.isAuth) {
      throw new Error('Unauthenticated!');
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
      creator: req.userId
    });
    let createdEvent;
    // return/await here will show graphql to wait while Operation is completed
    try {
      const result = await event.save();
      createdEvent = transformEvent(result);
      const creator = await User.findById(req.userId);
      // for user.findById()
      if (!creator) {
        throw new Error('User not found.');
      }
      creator.createdEvents.push(event);
      await creator.save();

      return createdEvent;
    } catch (err) {
      console.log(err);
      throw err;
    }
  }
};
