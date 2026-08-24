import * as z from "zod"



export const makePaymentSchema = z.object({
    bookingId: z.coerce.string().min(1)
}).strict()

export const getPaymentSchema = z.object({
    id: z.coerce.string()
}).strict()

