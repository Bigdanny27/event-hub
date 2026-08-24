import { Router } from "express"
import { createTicket, getTicketsByEvent, updateTicket, deleteTicket } from "../controllers/ticket.controller.js"
import { authenticate } from "../middlewares/authentication.middleware.js"
import { authorize } from "../middlewares/role.middleware.js"
import { validate } from "../middlewares/validate.middleware.js"
import { createTicketSchema, updateTicketSchema, deleteTicketSchema } from "../validation/ticket.validation.js"


const router = Router()

router.post("/", validate(createTicketSchema), authenticate, authorize("organizer"), createTicket)
router.get("/:id", getTicketsByEvent)
router.patch("/:id", validate(updateTicketSchema), authenticate, authorize("organizer"), updateTicket)
router.delete("/:id", validate(deleteTicketSchema), authenticate, authorize("organizer"))


export default router