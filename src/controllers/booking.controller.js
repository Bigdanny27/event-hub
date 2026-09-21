import { createBookingService } from "../services/booking.service.js";

const handleServiceError = (error, res) => {
  const statusCode = error.statusCode || 500;
  return res.status(statusCode).json({
    message: error.message || "Failed to create booking",
    ...(statusCode >= 500 ? { error: error.message } : {}),
  });
};

export const createBooking = async (req, res) => {
  try {
    const { eventId, ticketId } = req.params;
    const { quantity } = req.body;

    const result = await createBookingService({
      eventId,
      ticketId,
      quantity,
      userId: req.user._id,
    });

    return res.status(result.statusCode).json({
      message: result.message,
      booking: result.booking,
    });
  } catch (error) {
    return handleServiceError(error, res);
  }
};
