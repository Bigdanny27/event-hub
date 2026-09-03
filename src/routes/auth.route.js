import {Router} from "express"
import {loginUser, registerUser, logoutUser, changePassword, forgotPassword, resetPassword, verifyEmail} from "../controllers/auth.controller.js"
import { uploadCloudinary } from "../middlewares/upload.middleware.js"
import { validate } from "../middlewares/validate.middleware.js"
import { registerUserSchema, loginUserSchema, resetPasswordSchema, forgotPasswordSchema, changePasswordSchema, verifyEmailSchema } from "../validation/auth.validation.js"
import { rateLimiter } from "../utils/rateLimit.util.js"
import { authenticate } from "../middlewares/authentication.middleware.js"

const router = Router()

/**
 * @openapi
 * /api/auth/register:
 *   post:
 *     tags:
 *       - Auth
 *     summary: Register a new user
 *     requestBody:
 *       required: true
 *     responses:
 *       201:
 *         description: User registered
 */
router.post("/register", validate(registerUserSchema), uploadCloudinary.single("avatar"), registerUser)

/**
 * @openapi
 * /api/auth/login:
 *   post:
 *     tags:
 *       - Auth
 *     summary: Login user and return JWT
 *     requestBody:
 *       required: true
 *     responses:
 *       200:
 *         description: Logged in
 */
router.post("/login", rateLimiter, validate(loginUserSchema), loginUser)
router.post("/logout", logoutUser)
router.post("/verify-email", rateLimiter, validate(verifyEmailSchema), verifyEmail)
router.patch("/change-password", validate(changePasswordSchema), authenticate, rateLimiter,  changePassword)
router.post("/forgot-password", rateLimiter, validate(forgotPasswordSchema), forgotPassword)
router.post("/reset-password", rateLimiter, validate(resetPasswordSchema), resetPassword)

export default router
