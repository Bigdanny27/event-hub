import Event from "../models/event.model.js";
import Ticket from "../models/ticket.model.js";
import Booking from "../models/booking.model.js";

const makeError = (message, statusCode) => {
  const error = new Error(message);
  error.statusCode = statusCode;
  return error;
};

export const createBookingService = async ({ eventId, ticketId, quantity, userId }) => {
  const event = await Event.findById(eventId);
  if (!event) {
    throw makeError("Event not found", 404);
  }

  const ticket = await Ticket.findById(ticketId);
  if (!ticket) {
    throw makeError("Ticket not found", 404);
  }

  if (ticket.availableQuantity < quantity) {
    throw makeError(`Only ${ticket.availableQuantity} tickets are available`, 400);
  }

  const totalPrice = ticket.price * quantity;

  const booking = await Booking.create({
    event: eventId,
    ticket: ticketId,
    quantity,
    user: userId,
    totalPrice,
  });

  ticket.availableQuantity -= quantity;
  await ticket.save();

  return {
    statusCode: 201,
    message: "Booking created successfully",
    booking,
  };
};
