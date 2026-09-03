import { Router } from "express"
import { createEvent, getAllEvents, getOneEvent, updateEvent, updateOwnEvent, cancelOwnEvent, deleteEvent, restoreEvent } from "../controllers/event.controller.js"
import { authenticate } from "../middlewares/authentication.middleware.js"
import { authorize } from "../middlewares/role.middleware.js"
import { uploadCloudinary } from "../middlewares/upload.middleware.js"
import { validate } from "../middlewares/validate.middleware.js"
import { createEventSchema, updateEventSchema, getOneEventSchema, getAllEventsSchema, updateOwnEventSchema, deleteEventSchema, restoreEventSchema } from "../validation/event.validation.js"

const router = Router()

/**
 * @openapi
 * /api/events:
 *   get:
 *     tags:
 *       - Events
 *     summary: Retrieve a list of events
 *     responses:
 *       200:
 *         description: A JSON array of event objects
 */
router.post("/", validate(createEventSchema), authenticate, authorize("organizer"), uploadCloudinary.single("bannerImage"), createEvent)
router.get("/", getAllEvents)
/**
 * @openapi
 * /api/events/{id}:
 *   get:
 *     tags:
 *       - Events
 *     summary: Retrieve a single event by ID
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: string
 *     responses:
 *       200:
 *         description: Event object
 *       404:
 *         description: Event not found
 */
router.get("/:id", getOneEvent)
router.patch("/:id", validate(updateEventSchema), authenticate, authorize("admin"), updateEvent)
router.patch("/update/:id", validate(updateEventSchema), authenticate, authorize("organizer"),  updateOwnEvent)
router.delete("/:id", validate(deleteEventSchema), authenticate, authorize("admin"),  deleteEvent)
router.delete("/cancel/:id", authenticate, authorize("organizer"), cancelOwnEvent)
router.patch("/restore/:id", validate(restoreEventSchema), authenticate, authorize("admin"), restoreEvent)

export default router
