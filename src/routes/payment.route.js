import { Router } from "express"
import { makePayment, getPayment } from "../controllers/payment.controller.js"
import { authenticate } from "../middlewares/authentication.middleware.js"
import { authorize } from "../middlewares/role.middleware.js"




const router = Router()

router.post("/:bookingId", authenticate, authorize("customer"), makePayment)
router.get("/:id", getPayment)

export default router