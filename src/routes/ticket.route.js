import { Router } from "express"
import { createTicket, getTicketsByEvent, updateTicket, deleteTicket } from "../controllers/ticket.controller.js"
import { authenticate } from "../middlewares/authentication.middleware.js"
import { authorize } from "../middlewares/role.middleware.js"
import { uploadCloudinary } from "../middlewares/upload.middleware.js"
import { validate } from "../middlewares/validate.middleware.js"


const router = Router()

router.post("/")