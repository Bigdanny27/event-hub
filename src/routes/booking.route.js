import { Router } from "express"
import {findEvent, findTicket, checkTicketAvailability, calculateTotalPrice, createBooking, reduceTicketQuantity, createPaymentRecord } from "../controllers/booking.controller.js"
import { findEventSchema, findTicketSchema, createBookingSchema } from "../validation/booking.validation.js"
import { authenticate } from "../middlewares/authentication.middleware.js"
import { authorize } from "../middlewares/role.middleware.js"
import { validate } from "../middlewares/validate.middleware.js"


const router = Router()

router.get("/:id", findEvent)
router.get("/find-ticket/:id", findTicket)
router.get("/tickets/:id/availability", checkTicketAvailability)
router.post("/bookings/calculate-price", calculateTotalPrice)
router.post("/", validate(createBookingSchema), authenticate, authorize("customer"), createBooking)
router.patch("/tickets/:id/reduce-quantity", reduceTicketQuantity)
router.post("/bookings/:id/payment", createPaymentRecord)

export default router