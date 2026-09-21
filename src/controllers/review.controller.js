import {
  createReviewService,
  getReviewService,
} from "../services/review.service.js";

const handleServiceError = (error, res) => {
  const statusCode = error.statusCode || 500;
  return res.status(statusCode).json({
    message: error.message || "failed to create review",
    ...(statusCode >= 500 ? { error: error.message } : {}),
  });
};

export const createReview = async (req, res) => {
  try {
    const result = await createReviewService({
      userId: req.user._id,
      eventId: req.params.eventId,
      ...req.body,
    });

    return res.status(result.statusCode).json({
      message: result.message,
      review: result.review,
    });
  } catch (error) {
    return handleServiceError(error, res);
  }
};

export const getReview = async (req, res) => {
  try {
    const result = await getReviewService({ eventId: req.params.eventId });
    return res.status(result.statusCode).json({
      message: result.message,
      review: result.review,
    });
  } catch (error) {
    return handleServiceError(error, res);
  }
};