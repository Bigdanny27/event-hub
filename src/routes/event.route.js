import { Router } from "express"
import { createEvent, getAllEvents, getOneEvent, updateEvent, deleteEvent, restoreEvent } from "../controllers/event.controller.js"
import { authenticate } from "../middlewares/authentication.middleware.js"
import { authorize } from "../middlewares/role.middleware.js"
import { uploadCloudinary } from "../middlewares/upload.middleware.js"

const router = Router()

router.post("/", authenticate, authorize("organizer", "admin"), uploadCloudinary.single("bannerImage"), createEvent)
router.get("/", getAllEvents)
router.get("/:id", getOneEvent)
router.patch("/:id", authenticate, authorize("organizer", "admin"), updateEvent)
router.delete("/:id", authenticate, authorize("organizer", "admin"), deleteEvent)
router.patch("/restore/:id", authenticate, authorize("organizer", "admin"), restoreEvent)


export default router
