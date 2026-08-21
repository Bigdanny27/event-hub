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
router.patch("/:id", authenticate, authorize("admin"), validate(updateCategorySchema), validate(getCategorySchema, "params"), updateCategory)
router.delete("/:id", authenticate, authorize("admin"), validate(deleteCategorySchema, "params"), deleteCategory)

export default router
