import { Router } from "express"
import { authenticate} from "../middlewares/authentication.middleware.js"
import { authorize } from "../middlewares/role.middleware.js"
import { createCategory, getCategories, getCategory, updateCategory, deleteCategory } from "../controllers/category.controller.js"
import { validate } from "../middlewares/validate.middleware.js"
import { createCategorySchema, updateCategorySchema, getCategorySchema, deleteCategorySchema } from "../validation/category.validation.js"

const router = Router()

router.post("/", authenticate, authorize("admin"), validate(createCategorySchema), createCategory)
router.get("/", getCategories)
router.get("/:id", validate(getCategorySchema, "params"), getCategory)
router.patch("/:id", validate(updateCategorySchema), authenticate, authorize("admin"), validate(getCategorySchema, "params"), updateCategory)
router.delete("/:id", validate(deleteCategorySchema, "params"), authenticate, authorize("admin"), deleteCategory)

export default router
