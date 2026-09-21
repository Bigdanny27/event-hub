import {
  createEventService,
  getAllEventsService,
  getOneEventService,
  updateEventService,
  updateOwnEventService,
  cancelOwnEventService,
  deleteEventService,
  restoreEventService,
} from "../services/event.service.js";

const handleServiceError = (error, res) => {
  const statusCode = error.statusCode || 500;
  return res.status(statusCode).json({
    message: error.message || "internal server error",
    ...(statusCode >= 500 ? { error: error.message } : {}),
  });
};

export const createEvent = async (req, res) => {
  try {
    const result = await createEventService({
      ...req.body,
      bannerImage: req.file ? req.file.path : null,
      organizerId: req.user._id,
    });

    return res.status(result.statusCode).json({
      message: result.message,
      event: result.event,
    });
  } catch (error) {
    return handleServiceError(error, res);
  }
};

export const getAllEvents = async (req, res) => {
  try {
    const result = await getAllEventsService(req.query);
    return res.status(result.statusCode).json({
      message: result.message,
      totalEvents: result.totalEvents,
      currentPage: result.currentPage,
      totalPages: result.totalPages,
      events: result.events,
    });
  } catch (error) {
    return handleServiceError(error, res);
  }
};

export const getOneEvent = async (req, res) => {
  try {
    const result = await getOneEventService({ id: req.params.id });
    return res.status(result.statusCode).json({
      message: result.message,
      event: result.event,
    });
  } catch (error) {
    return handleServiceError(error, res);
  }
};

export const updateEvent = async (req, res) => {
  try {
    const result = await updateEventService({
      id: req.params.id,
      updateData: req.body,
    });
    return res.status(result.statusCode).json({
      message: result.message,
      event: result.event,
    });
  } catch (error) {
    return handleServiceError(error, res);
  }
};

export const updateOwnEvent = async (req, res) => {
  try {
    const result = await updateOwnEventService({
      id: req.params.id,
      userId: req.user._id,
      updateData: req.body,
    });
    return res.status(result.statusCode).json({
      message: result.message,
      event: result.event,
    });
  } catch (error) {
    return handleServiceError(error, res);
  }
};

export const cancelOwnEvent = async (req, res) => {
  try {
    const result = await cancelOwnEventService({
      id: req.params.id,
      userId: req.user._id,
    });
    return res.status(result.statusCode).json({ message: result.message });
  } catch (error) {
    return handleServiceError(error, res);
  }
};

export const deleteEvent = async (req, res) => {
  try {
    const result = await deleteEventService({ id: req.params.id });
    return res.status(result.statusCode).json({ message: result.message });
  } catch (error) {
    return handleServiceError(error, res);
  }
};

export const restoreEvent = async (req, res) => {
  try {
    const result = await restoreEventService({ id: req.params.id });
    return res.status(result.statusCode).json({
      message: result.message,
      event: result.event,
    });
  } catch (error) {
    return handleServiceError(error, res);
  }
};