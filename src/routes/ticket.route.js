import { Router } from "express"
import { createTicket, getTicketsByEvent, updateTicket, deleteTicket } from "../controllers/ticket.controller.js"
import { authenticate } from "../middlewares/authentication.middleware.js"
import { authorize } from "../middlewares/role.middleware.js"
import { validate } from "../middlewares/validate.middleware.js"
import { createTicketSchema, updateTicketSchema, deleteTicketSchema } from "../validation/ticket.validation.js"



const router = Router()

/**
 * @openapi
 * /api/tickets/{eventId}:
 *   post:
 *     tags:
 *       - Tickets
 *     summary: Create a ticket for an event
 *     parameters:
 *       - in: path
 *         name: eventId
 *         required: true
 *         schema:
 *           type: string
 *     responses:
 *       201:
 *         description: Ticket created
 */
router.post("/:eventId", validate(createTicketSchema), authenticate, authorize("organizer"), createTicket)
router.get("/:eventId", getTicketsByEvent)
router.patch("/:id", validate(updateTicketSchema), authenticate, authorize("organizer"), updateTicket)
router.delete("/:id", validate(deleteTicketSchema), authenticate, authorize("organizer"))


export default router