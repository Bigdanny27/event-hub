import { z } from "zod"

export const createEventSchema = z.object({
    title: z.string().min(2).max(100),
    description: z.string().min(10).max(2000),
    location: z.string().min(2).max(200),
    date: z.string().datetime(),
    time: z.string().min(4).max(10),
    category: z.string().min(1),
    capacity: z.coerce.number().int().positive(),
    availableTickets: z.coerce.number().int().nonNegative(),
}).strict()

export const updateEventSchema = z.object({
    title: z.string().min(2).max(100).optional(),
    description: z.string().min(10).max(2000).optional(),
    location: z.string().min(2).max(200).optional(),
    date: z.string().datetime().optional(),
    time: z.string().min(4).max(10).optional(),
    category: z.string().min(1).optional(),
    capacity: z.coerce.number().int().positive().optional(),
    availableTickets: z.coerce.number().int().nonNegative().optional(),
}).strict()

export const getOneEventSchema = z.object({
    id: z.string().min(1),
}).strict()

export const getAllEventsSchema = z.object({
    search: z.string().optional(),
    location: z.string().optional(),
    category: z.string().optional(),
    sort: z.enum(["newest", "oldest", "alphabetical", "reverseAlphabetical"]).optional(),
    page: z.coerce.number().int().positive().optional(),
    limit: z.coerce.number().int().positive().optional(),
}).strict()

export const updateOwnEventSchema = z.object({
    id: z.string().min(1),
}).strict()

export const deleteEventSchema = z.object({
    id: z.string().min(1),
}).strict()
