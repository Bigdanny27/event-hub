import Review from "../models/review.model.js";

const makeError = (message, statusCode) => {
  const error = new Error(message);
  error.statusCode = statusCode;
  return error;
};

export const createReviewService = async ({ userId, eventId, rating, comment }) => {
  const existingReview = await Review.findOne({
    user: userId,
    event: eventId,
  });

  if (existingReview) {
    throw makeError("You have already review this event", 400);
  }

  const review = await Review.create({
    user: userId,
    event: eventId,
    rating,
    comment,
  });

  return {
    statusCode: 201,
    message: "Review created successfully",
    review,
  };
};

export const getReviewService = async ({ eventId }) => {
  const review = await Review.find({ event: eventId });

  return {
    statusCode: 200,
    message: "Reviews retrieved successfully",
    review,
  };
};
