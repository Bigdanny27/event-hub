import Payment from "../models/payment.model.js";
import Booking from "../models/booking.model.js";

const makeError = (message, statusCode) => {
  const error = new Error(message);
  error.statusCode = statusCode;
  return error;
};

export const makePaymentService = async ({ bookingId, userId }) => {
  const booking = await Booking.findOne({
    _id: bookingId,
    user: userId,
  }).populate("ticket");

  if (!booking) {
    throw makeError("Booking not found", 404);
  }

  const existingPayment = await Payment.findOne({ booking: bookingId });
  if (existingPayment) {
    throw makeError("Payment already exists", 400);
  }

  const amount = booking.ticket.price * booking.quantity;
  const reference = `PAY-${Date.now()}-${Math.floor(Math.random() * 10000)}`;

  const payment = await Payment.create({
    user: userId,
    booking: bookingId,
    amount,
    reference,
    status: "successful",
    paymentDate: new Date(),
  });

  return {
    statusCode: 201,
    message: "Payment successfully created",
    payment,
  };
};

export const getPaymentService = async ({ id }) => {
  const payment = await Payment.findById(id)
    .populate("user", "name lastname email")
    .populate("booking");

  if (!payment) {
    throw makeError("Payment not found", 404);
  }

  return {
    statusCode: 200,
    message: "Payment retrieved successfully",
    payment,
  };
};
