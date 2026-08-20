import { Router } from "express"
import { createEvent, getAllEvents, getOneEvent, updateEvent, updateOwnEvent, cancelOwnEvent, deleteEvent, restoreEvent } from "../controllers/event.controller.js"
import { authenticate } from "../middlewares/authentication.middleware.js"
import { authorize } from "../middlewares/role.middleware.js"
import { uploadCloudinary } from "../middlewares/upload.middleware.js"

const router = Router()

router.post("/", authenticate, authorize("organizer", "admin"), uploadCloudinary.single("bannerImage"), createEvent)
router.get("/", getAllEvents)
router.get("/:id", getOneEvent)
router.patch("/:id", authenticate, authorize("admin"), updateEvent)
router.patch("/update/:id", authenticate, authorize("organizer"), updateOwnEvent)
router.delete("/:id", authenticate, authorize("admin"), deleteEvent)
router.delete("/cancel/:id", authenticate, authorize("organizer"), cancelOwnEvent)
router.patch("/restore/:id", authenticate, authorize("admin"), restoreEvent)


export default router

