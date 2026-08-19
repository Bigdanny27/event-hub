import {Router} from "express"
import {loginUser, registerUser,logoutUser, changePassword, forgotPassword, resetPassword, verifyEmail} from "../controllers/auth.controller.js"
import { uploadCloudinary } from "../middlewares/upload.middleware.js"
import { validate } from "../middleware/validate.middleware.js"
import { registerSchema, loginSchema } from "../validation/auth.validation.js"
import { loginLimiter } from "../utils/rate-limit.util.js"


const router = Router()

router.post("/register", validate(registerSchema), uploadCloudinary.single("avatar"), registerUser)
router.post("/login", loginLimiter, validate(loginSchema), loginUser)
router.post("/logout", logoutUser)
router.post("/verify-email", verifyEmail)
router.patch("/change-password", changePassword)
router.post("/forgot-password", forgotPassword)
router.post("/reset-password", resetPassword)

export default router