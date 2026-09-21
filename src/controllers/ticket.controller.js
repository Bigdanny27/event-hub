import {
  createTicketService,
  getTicketsByEventService,
  updateTicketService,
  deleteTicketService,
} from "../services/ticket.service.js";

const handleServiceError = (error, res) => {
  const statusCode = error.statusCode || 500;
  return res.status(statusCode).json({
    message: error.message || "internal server error",
    ...(statusCode >= 500 ? { error: error.message } : {}),
  });
};

export const createTicket = async (req, res) => {
  try {
    const result = await createTicketService({
      eventId: req.params.eventId,
      ...req.body,
      organizerId: req.user._id,
    });

    return res.status(result.statusCode).json({
      message: result.message,
      ticket: result.ticket,
    });
  } catch (error) {
    return handleServiceError(error, res);
  }
};

export const getTicketsByEvent = async (req, res) => {
  try {
    const result = await getTicketsByEventService({ eventId: req.params.eventId });
    return res.status(result.statusCode).json({
      message: result.message,
      tickets: result.tickets,
    });
  } catch (error) {
    return handleServiceError(error, res);
  }
};

export const updateTicket = async (req, res) => {
  try {
    const result = await updateTicketService({
      id: req.params.id,
      ticketData: req.body,
    });

    return res.status(result.statusCode).json({
      message: result.message,
      ticket: result.ticket,
    });
  } catch (error) {
    return handleServiceError(error, res);
  }
};

export const deleteTicket = async (req, res) => {
  try {
    const result = await deleteTicketService({ id: req.params.id });
    return res.status(result.statusCode).json({ message: result.message });
  } catch (error) {
    return handleServiceError(error, res);
  }
};
