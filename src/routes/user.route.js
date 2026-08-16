import {Router} from "express"
import {getAllUsers, deleteUser, uploadProfilePicture } from "../controllers/user.controller.js"
import { authorize } from "../middlewares/role.middleware.js"
import { uploadCloudinary } from "../middlewares/upload.middleware.js"
import { authenticate } from "../middlewares/authentication.middleware.js"

const router = Router()

router.get("/:id", authenticate, authorize("admin"), getAllUsers)
router.delete("/:id", authenticate, authorize("admin"), deleteUser)
router.post("/upload-avatar", authenticate, uploadCloudinary.single('avatar'), uploadProfilePicture)

export default router