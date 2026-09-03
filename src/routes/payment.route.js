import { Router } from "express"
import { makePayment, getPayment } from "../controllers/payment.controller.js"
import { authenticate } from "../middlewares/authentication.middleware.js"
import { authorize } from "../middlewares/role.middleware.js"





const router = Router()

/**
 * @openapi
 * /api/payments/{bookingId}:
 *   post:
 *     tags:
 *       - Payments
 *     summary: Make payment for a booking
 *     parameters:
 *       - in: path
 *         name: bookingId
 *         required: true
 *         schema:
 *           type: string
 *     responses:
 *       201:
 *         description: Payment processed
 */
router.post("/:bookingId", authenticate, authorize("customer"), makePayment)
router.get("/:id", getPayment)

export default router