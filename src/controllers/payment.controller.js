import {
  makePaymentService,
  getPaymentService,
} from "../services/payment.service.js";

const handleServiceError = (error, res) => {
  const statusCode = error.statusCode || 500;
  return res.status(statusCode).json({
    message: error.message || "failed to create payment",
    ...(statusCode >= 500 ? { error: error.message } : {}),
  });
};

export const makePayment = async (req, res) => {
  try {
    const { bookingId } = req.params;
    const result = await makePaymentService({
      bookingId,
      userId: req.user._id,
    });

    return res.status(result.statusCode).json({
      message: result.message,
      payment: result.payment,
    });
  } catch (error) {
    return handleServiceError(error, res);
  }
};

export const getPayment = async (req, res) => {
  try {
    const result = await getPaymentService({ id: req.params.id });
    return res.status(result.statusCode).json({
      message: result.message,
      payment: result.payment,
    });
  } catch (error) {
    return handleServiceError(error, res);
  }
};