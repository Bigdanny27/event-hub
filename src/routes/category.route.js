import { Router } from "express"
import { authenticate} from "../middlewares/authentication.middleware.js"
import { authorize } from "../middlewares/role.middleware.js"
import { createCategory, getCategories, getCategory, updateCategory, deleteCategory } from "../controllers/category.controller.js"

const router = Router()

router.post("/", authenticate, authorize("admin"), createCategory)
router.get("/", getCategories)
router.get("/:id", getCategory)
router.patch("/:id", authenticate, authorize("admin"), updateCategory)
router.delete("/:id", authenticate, authorize("admin"), deleteCategory)

export default router