// Models
const Event = require('../../models/event');
const Booking = require("../../models/booking");
const { dateToString } = require("../../helpers/date");
const {transformBooking,singleEvent,user} =require('./resolverhelpers');

module.exports = {
  bookings: async (args,req) => {
    if(!req.isAuth){
      throw new Error('User unauthenticated!');
    }
    try {
      const bookings = await Booking.find();
      return bookings.map((booking) => {
        return transformBooking(booking);
      });
    } catch (err) {
      throw err;
    }
  },
  bookEvent: async (args,req) => {
    if(!req.isAuth){
      throw new Error('User unauthenticated!');
    }
    const fetchedEvent = await Event.findOne({ _id: args.eventId });
    const booking = new Booking({
      user: "5ef5d699c216df6db7194a64",
      event: fetchedEvent,
    });
    const result = await booking.save();
    return transformBooking(result);
  },
  cancelBooking: async (args,req) => {
    if(!req.isAuth){
      throw new Error('User unauthenticated!');
    }
    try {
      const booking = await Booking.findById(args.bookingId).populate("event");
      const event = transformEvent(booking.event);
      await Booking.deleteOne({ _id: args.bookingId });
      return event;
    } catch (err) {
      throw err;
    }
  },
};
