import {Router} from "express"
import {getAllUsers, deleteUser, uploadProfilePicture } from "../controllers/user.controller.js"
import { authorize } from "../middlewares/role.middleware.js"
import { uploadCloudinary } from "../middlewares/upload.middleware.js"
import { authenticate } from "../middlewares/authentication.middleware.js"


const router = Router()

/**
 * @openapi
 * /api/users/{id}:
 *   get:
 *     tags:
 *       - Users
 *     summary: Get user by ID (admin only)
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: string
 *     responses:
 *       200:
 *         description: User object
 */
router.get("/:id", authenticate, authorize("admin"), getAllUsers)

/**
 * @openapi
 * /api/users/{id}:
 *   delete:
 *     tags:
 *       - Users
 *     summary: Delete a user (admin only)
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: string
 *     responses:
 *       204:
 *         description: User deleted
 */
router.delete("/:id", authenticate, authorize("admin"), deleteUser)

/**
 * @openapi
 * /api/users/upload-avatar:
 *   post:
 *     tags:
 *       - Users
 *     summary: Upload user avatar
 *     responses:
 *       200:
 *         description: Avatar uploaded
 */
router.post("/upload-avatar", authenticate, uploadCloudinary.single('avatar'), uploadProfilePicture)

export default router