import { Router } from "express"
import { createEvent, getAllEvents, getOneEvent, updateEvent, updateOwnEvent, cancelOwnEvent, deleteEvent, restoreEvent } from "../controllers/event.controller.js"
import { authenticate } from "../middlewares/authentication.middleware.js"
import { authorize } from "../middlewares/role.middleware.js"
import { uploadCloudinary } from "../middlewares/upload.middleware.js"
import { validate } from "../middlewares/validate.middleware.js"
import { createEventSchema, updateEventSchema, getEventParamsSchema, getAllEventsQuerySchema } from "../validation/event.validation.js"

const router = Router()

router.post("/", authenticate, authorize("organizer", "admin"), validate(createEventSchema), uploadCloudinary.single("bannerImage"), createEvent)
router.get("/", validate(getAllEventsQuerySchema, "query"), getAllEvents)
router.get("/:id", validate(getEventParamsSchema, "params"), getOneEvent)
router.patch("/:id", authenticate, authorize("admin"), validate(updateEventSchema), validate(getEventParamsSchema, "params"), updateEvent)
router.patch("/update/:id", authenticate, authorize("organizer"), validate(updateEventSchema), validate(getEventParamsSchema, "params"), updateOwnEvent)
router.delete("/:id", authenticate, authorize("admin"), validate(getEventParamsSchema, "params"), deleteEvent)
router.delete("/cancel/:id", authenticate, authorize("organizer"), validate(getEventParamsSchema, "params"), cancelOwnEvent)
router.patch("/restore/:id", authenticate, authorize("admin"), validate(getEventParamsSchema, "params"), restoreEvent)

export default router
