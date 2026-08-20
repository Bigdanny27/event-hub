import {Router} from "express"
import {loginUser, registerUser,logoutUser, changePassword, forgotPassword, resetPassword, verifyEmail} from "../controllers/auth.controller.js"
import { uploadCloudinary } from "../middlewares/upload.middleware.js"
import { validate } from "../middlewares/validate.middleware.js"
import { registerUserSchema, loginUserSchema, resetPasswordSchema, forgotPasswordSchema, changePasswordSchema } from "../validation/auth.validation.js"
import { rateLimiter } from "../utils/rateLimit.util.js"
import { authenticate } from "../middlewares/authentication.middleware.js"

const router = Router()

router.post("/register", validate(registerUserSchema), uploadCloudinary.single("avatar"), registerUser)
router.post("/login", rateLimiter, validate(loginUserSchema), loginUser)
router.post("/logout", logoutUser)
router.post("/verify-email", rateLimiter, verifyEmail)
router.patch("/change-password", authenticate, rateLimiter, validate(changePasswordSchema), changePassword)
router.post("/forgot-password", rateLimiter, validate(changePasswordSchema), forgotPassword)
router.post("/reset-password", rateLimiter, validate(changePasswordSchema), resetPassword)

export default router