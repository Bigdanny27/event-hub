import {Router} from "express"
import {loginUser, registerUser,logoutUser, changePassword, forgotPassword, resetPassword, verifyEmail} from "../controllers/auth.controller.js"
import { uploadCloudinary } from "../middlewares/upload.middleware.js"

const router = Router()

router.post("/register", uploadCloudinary.single("avatar"), registerUser)
router.post("/login", loginUser)
router.post("/logout", logoutUser)
router.post("/verify-email", verifyEmail)
router.patch("/change-password", changePassword)
router.post("/forgot-password", forgotPassword)
router.post("/reset-password", resetPassword)

export default router