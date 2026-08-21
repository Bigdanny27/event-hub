import * as z from "zod"

export const createCategorySchema = z.object({
    name: z.coerce.string().min(2).max(50),
    description: z.string().max(500).optional(),
}).strict()

export const updateCategorySchema = z.object({
    name: z.coerce.string().min(2).max(50).optional(),
    description: z.string().max(500).optional(),
}).strict()

export const getCategorySchema = z.object({
    id: z.coerce.string()
}).strict()

export const deleteCategorySchema = z.object({
    id: z.coerce.string()
}).strict()
