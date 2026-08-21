import { Router } from "express"
import { createEvent, getAllEvents, getOneEvent, updateEvent, updateOwnEvent, cancelOwnEvent, deleteEvent, restoreEvent } from "../controllers/event.controller.js"
import { authenticate } from "../middlewares/authentication.middleware.js"
import { authorize } from "../middlewares/role.middleware.js"
import { uploadCloudinary } from "../middlewares/upload.middleware.js"
import { validate } from "../middlewares/validate.middleware.js"
import { createEventSchema, updateEventSchema, getOneEventSchema, getAllEventsSchema, updateOwnEventSchema, deleteEventSchema, restoreEventSchema } from "../validation/event.validation.js"

const router = Router()

router.post("/", authenticate, authorize("organizer", "admin"), validate(createEventSchema), uploadCloudinary.single("bannerImage"), createEvent)
router.get("/", getAllEvents)
router.get("/:id", getOneEvent)
router.patch("/:id", validate(updateEventSchema), authenticate, authorize("admin"), updateEvent)
router.patch("/update/:id", validate(updateEventSchema), authenticate, authorize("organizer"),  updateOwnEvent)
router.delete("/:id", validate(deleteEventSchema), authenticate, authorize("admin"),  deleteEvent)
router.delete("/cancel/:id", authenticate, authorize("organizer"), cancelOwnEvent)
router.patch("/restore/:id", validate(restoreEventSchema), authenticate, authorize("admin"), restoreEvent)

export default router
