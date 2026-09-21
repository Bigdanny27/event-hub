import Event from "../models/event.model.js";
import Category from "../models/category.model.js";

const makeError = (message, statusCode) => {
  const error = new Error(message);
  error.statusCode = statusCode;
  return error;
};

export const createEventService = async ({
  title,
  description,
  location,
  date,
  time,
  category,
  capacity,
  availableTickets,
  bannerImage,
  organizerId,
}) => {
  if (!title || !description || !location || !date || !time || !category || !capacity || !availableTickets) {
    throw makeError("All field are required before creating an event", 400);
  }

  const categoryExists = await Category.findOne({ name: category });
  if (!categoryExists) {
    throw makeError("Category not found", 404);
  }

  const event = await Event.create({
    title,
    description,
    location,
    date,
    time,
    category: categoryExists._id,
    capacity,
    availableTickets,
    status: "upcoming",
    bannerImage: bannerImage || null,
    organizer: organizerId,
  });

  return {
    statusCode: 201,
    message: "Event created successfully",
    event,
  };
};

export const getAllEventsService = async ({ search, location, category, sort = "newest", page = "1", limit = "10" }) => {
  const filter = {};

  if (search) {
    filter.title = { $regex: search, $options: "i" };
  }

  if (location) {
    filter.location = location;
  }

  if (category) {
    filter.category = category;
  }

  let sortOption = {};
  if (sort === "newest") {
    sortOption = { createdAt: -1 };
  } else if (sort === "oldest") {
    sortOption = { createdAt: 1 };
  } else if (sort === "alphabetical") {
    sortOption = { title: 1 };
  } else if (sort === "reverseAlphabetical") {
    sortOption = { title: -1 };
  }

  const pageNumber = parseInt(page, 10) || 1;
  const limitNumber = parseInt(limit, 10) || 10;
  const skip = (pageNumber - 1) * limitNumber;

  const events = await Event.find(filter)
    .populate("organizer", "name lastname email")
    .sort(sortOption)
    .skip(skip)
    .limit(limitNumber);

  const totalEvents = await Event.countDocuments(filter);

  return {
    statusCode: 200,
    message: "Event retrieved successfully",
    totalEvents,
    currentPage: pageNumber,
    totalPages: Math.ceil(totalEvents / limitNumber),
    events,
  };
};

export const getOneEventService = async ({ id }) => {
  const event = await Event.findById(id).populate("organizer", "name lastname email");

  if (!event) {
    throw makeError("Event not found", 404);
  }

  return {
    statusCode: 200,
    message: "Event successfully found",
    event,
  };
};

export const updateEventService = async ({ id, updateData }) => {
  const { title, description, location, date, time, category, capacity, availableTickets } = updateData;

  if (!title || !description || !location || !date || !time || !category || !capacity || !availableTickets) {
    throw makeError("All fields are required before updating an event", 400);
  }

  const event = await Event.findById(id);
  if (!event) {
    throw makeError("Event not found", 404);
  }

  const categoryExists = await Category.findOne({ name: category });
  if (!categoryExists) {
    throw makeError("Category not found", 404);
  }

  const updatedEvent = await Event.findByIdAndUpdate(
    id,
    {
      ...updateData,
      category: categoryExists._id,
    },
    { new: true, runValidators: true }
  );

  return {
    statusCode: 200,
    message: "Event updated successfully",
    event: updatedEvent,
  };
};

export const updateOwnEventService = async ({ id, userId, updateData }) => {
  const event = await Event.findOne({ _id: id, organizer: userId });

  if (!event) {
    throw makeError("You are not the organizer of this event", 400);
  }

  const updatedEvent = await Event.findOneAndUpdate(
    { _id: id, organizer: userId },
    updateData,
    { new: true, runValidators: true }
  );

  return {
    statusCode: 200,
    message: "Event updated successfully",
    event: updatedEvent,
  };
};

export const cancelOwnEventService = async ({ id, userId }) => {
  const event = await Event.findOne({ _id: id, organizer: userId });

  if (!event) {
    throw makeError("Event not found", 404);
  }

  event.status = "cancelled";
  await event.save();

  return {
    statusCode: 200,
    message: "Event cancelled successfully",
  };
};

export const deleteEventService = async ({ id }) => {
  const event = await Event.findById(id);

  if (!event) {
    throw makeError("Event not found", 404);
  }

  event.deletedAt = new Date();
  await event.save();

  return {
    statusCode: 200,
    message: "Event deleted successfully",
  };
};

export const restoreEventService = async ({ id }) => {
  const event = await Event.findById(id);

  if (!event) {
    throw makeError("Event not found", 400);
  }

  event.deletedAt = null;
  await event.save();

  return {
    statusCode: 200,
    message: "Event restored successfully",
    event,
  };
};
