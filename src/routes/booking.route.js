import { Router } from "express"
import { createBooking } from "../controllers/booking.controller.js"
import { createBookingSchema } from "../validation/booking.validation.js"
import { authenticate } from "../middlewares/authentication.middleware.js"
import { authorize } from "../middlewares/role.middleware.js"
import { validate } from "../middlewares/validate.middleware.js"


const router = Router()

router.post("/:eventId/:ticketId", validate(createBookingSchema), authenticate, authorize("customer", "organizer"), createBooking)


export default router