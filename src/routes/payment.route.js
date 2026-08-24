import { Router } from "express"
import { makePayment, getMyPayments, getPayment } from "../controllers/payment.controller.js"
import { makePaymentSchema, getPaymentSchema } from "../validation/payment.validation.js"
import { authenticate } from "../middlewares/authentication.middleware.js"
import { authorize } from "../middlewares/role.middleware.js"
import { validate } from "../middlewares/validate.middleware.js"



const router = Router()

router.post("/", validate(makePaymentSchema), authenticate, authorize("customer"), makePayment)
router.get("/", getMyPayments)
router.get("/:id", getPayment)

export default router