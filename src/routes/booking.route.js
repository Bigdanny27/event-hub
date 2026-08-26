import { Router } from "express"
import {findEvent, findTicket, checkTicketAvailability, calculateTotalPrice, createBooking, reduceTicketQuantity, createPaymentRecord } from "../controllers/booking.controller.js"
import { findEventSchema, findTicketSchema, createBookingSchema } from "../validation/booking.validation.js"
import { authenticate } from "../middlewares/authentication.middleware.js"
import { authorize } from "../middlewares/role.middleware.js"
import { validate } from "../middlewares/validate.middleware.js"


const router = Router()

router.get("/find-event/:eventId", findEvent)
router.get("/find-ticket/:ticketId", findTicket)
router.get("/tickets/:ticketId/availability", checkTicketAvailability)
router.post("/bookings/calculate-price", calculateTotalPrice)
router.post("/:eventId/:ticketId", validate(createBookingSchema), authenticate, authorize("customer", "organizer"), createBooking)
router.patch("/tickets/:ticketId/reduce-quantity", reduceTicketQuantity)
router.post("/bookings/:bookingId/payment", authenticate, createPaymentRecord)

export default router