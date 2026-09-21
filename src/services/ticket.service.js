import Ticket from "../models/ticket.model.js";

const makeError = (message, statusCode) => {
  const error = new Error(message);
  error.statusCode = statusCode;
  return error;
};

export const createTicketService = async ({ eventId, name, price, quantity, ticketType, organizerId }) => {
  if (!name || !price || !quantity || !ticketType) {
    throw makeError("All field are required to create a ticket", 400);
  }

  const ticket = await Ticket.create({
    event: eventId,
    name,
    price,
    quantity,
    availableQuantity: quantity,
    ticketType,
    organizer: organizerId,
  });

  return {
    statusCode: 201,
    message: "Tickets successfully created",
    ticket,
  };
};

export const getTicketsByEventService = async ({ eventId }) => {
  const tickets = await Ticket.find({ event: eventId })
    .populate("organizer", "name lastname email")
    .populate("event", "title");

  return {
    statusCode: 200,
    message: "Tickets retrieve successfully",
    tickets,
  };
};

export const updateTicketService = async ({ id, ticketData }) => {
  const { event, name, price, quantity, ticketType } = ticketData;

  if (!event || !name || !price || !quantity || !ticketType) {
    throw makeError("All fields are required before updating a ticket", 400);
  }

  const updatedTicket = await Ticket.findByIdAndUpdate(id, ticketData, { new: true });

  if (!updatedTicket) {
    throw makeError("Ticket not found", 404);
  }

  return {
    statusCode: 200,
    message: "Ticket updated successfully",
    ticket: updatedTicket,
  };
};

export const deleteTicketService = async ({ id }) => {
  const ticket = await Ticket.findById(id);

  if (!ticket) {
    throw makeError("ticket not found", 404);
  }

  await ticket.deleteOne();

  return {
    statusCode: 200,
    message: "ticket deleted successfully",
  };
};
