import { Router } from "express"
import {findEvent, findTicket, checkTicketAvailability, calculateTotalPrice, createBooking, reduceTicketQuantity, createPaymentRecord } from "../controllers/booking.controller.js"
import { uploadCloudinary } from "../middlewares/upload.middleware.js"
import { authenticate } from "../middlewares/authentication.middleware.js"
import { authorize } from "../middlewares/role.middleware.js"
import { validate } from "../middlewares/validate.middleware.js"


const router = Router()

router.post("/", )
