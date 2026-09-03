import { Router } from "express"
import { createBooking } from "../controllers/booking.controller.js"
import { createBookingSchema } from "../validation/booking.validation.js"
import { authenticate } from "../middlewares/authentication.middleware.js"
import { authorize } from "../middlewares/role.middleware.js"
import { validate } from "../middlewares/validate.middleware.js"



const router = Router()

/**
 * @openapi
 * /api/bookings/{eventId}/{ticketId}:
 *   post:
 *     tags:
 *       - Bookings
 *     summary: Create a booking for an event ticket
 *     parameters:
 *       - in: path
 *         name: eventId
 *         required: true
 *         schema:
 *           type: string
 *       - in: path
 *         name: ticketId
 *         required: true
 *         schema:
 *           type: string
 *     responses:
 *       201:
 *         description: Booking created
 */
router.post("/:eventId/:ticketId", validate(createBookingSchema), authenticate, authorize("customer"), createBooking)


export default router