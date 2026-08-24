import * as z from "zod"

export const findEventSchema = z.object({
    eventId: z.coerce.string().min(1)
}).strict()

export const findTicketSchema = z.object({
    ticketId: z.coerce.string().min(1)
}).strict()

export const createBookingSchema = z.object({
    quantity: z.coerce.string().min(1, "Quantity must be atleast one"),
    totalAmount: z.coerce.string()
}).strict()