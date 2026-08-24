import * as z from "zod"


export const createReviewSchema = z.object({
    rating: z.coerce.string().min(1).max(5),
    comment: z.coerce.string().min(1)
}).strict()