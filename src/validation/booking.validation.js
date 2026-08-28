import * as z from "zod"


export const createBookingSchema = z.object({
    quantity: z.coerce.number().int("Quantity must be an integer").min(1, "Quantity must be atleast one"),
    ticketId: z.string().regex(/^[0-9a-fA-F]{24}$/, "Invalid ticket ID"),
    eventId: z.string().regex(/^[0-9a-fA-F]{24}$/, "Invalid event ID")
}).strict()