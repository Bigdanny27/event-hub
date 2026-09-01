import { Router } from "express";
import { createReview, getReview } from "../controllers/review.controller.js";
import { createReviewSchema } from "../validation/review.validation.js";
import { validate } from "../middlewares/validate.middleware.js";
import { authenticate } from "../middlewares/authentication.middleware.js";
import { authorize } from "../middlewares/role.middleware.js";


const router = Router()


router.post("/:eventId", validate(createReviewSchema), authenticate, authorize("customer"), createReview)
router.get("/:eventId", getReview)

export default router