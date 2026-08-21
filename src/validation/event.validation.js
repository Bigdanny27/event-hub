import * as z from "zod"

export const createEventSchema = z.object({
    title: z.coerce.string().min(2).max(100),
    description: z.coerce.string().min(10).max(2000),
    location: z.coerce.string().min(2).max(200),
    date:z.coerce.string().datetime(),
    time: z.coerce.string().min(4).max(10),
    category: z.coerce.string().min(1),
    capacity:  z.coerce.string().min(1).max(10000),
    availableTickets: z.coerce.string().min(1).max(10000)
}).strict()

export const updateEventSchema = z.object({
    title: z.coerce.string().min(2).max(100).optional(),
    description: z.coerce.string().min(10).max(2000).optional(),
    location: z.coerce.string().min(2).max(200).optional(),
    date: z.coerce.string().datetime().optional(),
    time: z.coerce.string().min(4).max(10).optional(),
    category: z.coerce.string().min(1).optional(),
    capacity:  z.coerce.string().min(1).max(10000),
    availableTickets: z.coerce.string().min(1).max(10000)
}).strict()

export const getOneEventSchema = z.object({
    id: z.coerce.string().min(1),
}).strict()

export const getAllEventsSchema = z.object({
    search: z.coerce.string().optional(),
    location: z.coerce.string().optional(),
    category: z.coerce.string().optional(),
    sort: z.enum(["newest", "oldest", "alphabetical", "reverseAlphabetical"]).optional(),
    page: z.coerce.number().int().positive().optional(),
    limit: z.coerce.number().int().positive().optional(),
}).strict()

export const updateOwnEventSchema = z.object({
    id: z.coerce.string().min(1),
}).strict()

export const deleteEventSchema = z.object({
    id: z.coerce.string().min(1),
}).strict()

export const restoreEventSchema = z.object({
    id: z.coerce.string().min(1),
}).strict()
