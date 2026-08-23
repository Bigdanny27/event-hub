import * as z from "zod"


export const createTicketSchema = z.object({
    event: z.coerce.string().regex(/^[0-9a-fA-F]{24}$/, "Invalid event ID"),
    name: z.coerce.string().trim().min(1, "Ticket name is required"),
    price: z.coerce.string().trim().min(1, "price is required"),
    organizer: z.coerce.string().regex(/^[0-9a-fA-F]{24}$/, "Invalid organizer ID"),
    ticketType: z.enum(["Regular", "VIP", "VVIP", "Platinum", "Gold", "Silver"]),
    quantity: z.coerce.number().min(1, "Quantity must be atleast one"),
    availableQuantity: z.coerce.number().min(0, "Available quantity cannot be negative")

}).strict()

export const updateTicketSchema = z.object({
    event: z.coerce.string().regex(/^[0-9a-fA-F]{24}$/, "Invalid event ID"),
    name: z.coerce.string().trim().min(1, "Ticket name is required"),
    price: z.coerce.string().trim().min(1, "price is required"),
    ticketType: z.enum(["Regular", "VIP", "VVIP", "Platinum", "Gold", "Silver"]),
    quantity: z.coerce.number().min(1, "Quantity must be atleast one")

}).strict()

export const deleteTicketSchema = z.object({
    id: z.coerce.string().min(1),
}).strict()