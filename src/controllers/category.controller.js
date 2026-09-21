import {
  createCategoryService,
  getCategoriesService,
  getCategoryService,
  updateCategoryService,
  deleteCategoryService,
} from "../services/category.service.js";

const handleServiceError = (error, res) => {
  const statusCode = error.statusCode || 500;
  return res.status(statusCode).json({
    message: error.message || "Internal server error",
    ...(statusCode >= 500 ? { error: error.message } : {}),
  });
};

export const createCategory = async (req, res) => {
  try {
    const result = await createCategoryService(req.body);
    return res.status(result.statusCode).json({
      message: result.message,
      category: result.category,
    });
  } catch (error) {
    return handleServiceError(error, res);
  }
};

export const getCategories = async (req, res) => {
  try {
    const result = await getCategoriesService();
    return res.status(result.statusCode).json({
      message: result.message,
      categories: result.categories,
    });
  } catch (error) {
    return handleServiceError(error, res);
  }
};

export const getCategory = async (req, res) => {
  try {
    const result = await getCategoryService({ id: req.params.id });
    return res.status(result.statusCode).json({
      message: result.message,
      category: result.category,
    });
  } catch (error) {
    return handleServiceError(error, res);
  }
};

export const updateCategory = async (req, res) => {
  try {
    const result = await updateCategoryService({
      id: req.params.id,
      ...req.body,
    });
    return res.status(result.statusCode).json({
      message: result.message,
      category: result.category,
    });
  } catch (error) {
    return handleServiceError(error, res);
  }
};

export const deleteCategory = async (req, res) => {
  try {
    const result = await deleteCategoryService({ id: req.params.id });
    return res.status(result.statusCode).json({ message: result.message });
  } catch (error) {
    return handleServiceError(error, res);
  }
};