import User from "../models/user.model.js";

const makeError = (message, statusCode) => {
  const error = new Error(message);
  error.statusCode = statusCode;
  return error;
};

export const getAllUsersService = async () => {
  const users = await User.find().select("-password");

  if (!users || users.length === 0) {
    throw makeError("no users found", 404);
  }

  return {
    statusCode: 200,
    message: "users successfully found",
    users,
  };
};

export const deleteUserService = async ({ id }) => {
  const user = await User.findByIdAndDelete(id);

  if (!user) {
    throw makeError("user not found", 404);
  }

  return {
    statusCode: 200,
    message: "user successfully deleted",
  };
};

export const uploadProfilePictureService = async ({ file }) => {
  if (!file) {
    throw makeError("No file uploaded", 400);
  }

  return {
    statusCode: 200,
    message: "File uploaded successfully",
    url: file.path,
  };
};
