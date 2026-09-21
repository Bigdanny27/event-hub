import {
  getAllUsersService,
  deleteUserService,
  uploadProfilePictureService,
} from "../services/user.service.js";

const handleServiceError = (error, res) => {
  const statusCode = error.statusCode || 500;
  return res.status(statusCode).json({
    message: error.message || "internal server error",
    ...(statusCode >= 500 ? { error: error.message } : {}),
  });
};

export const getAllUsers = async (req, res) => {
  try {
    const result = await getAllUsersService();
    return res.status(result.statusCode).json({
      message: result.message,
      users: result.users,
    });
  } catch (error) {
    return handleServiceError(error, res);
  }
};

export const deleteUser = async (req, res) => {
  try {
    const result = await deleteUserService({ id: req.params.id });
    return res.status(result.statusCode).json({ message: result.message });
  } catch (error) {
    return handleServiceError(error, res);
  }
};

export const uploadProfilePicture = async (req, res) => {
  try {
    const result = await uploadProfilePictureService({ file: req.file });
    return res.status(result.statusCode).json({
      message: result.message,
      url: result.url,
    });
  } catch (error) {
    return handleServiceError(error, res);
  }
};