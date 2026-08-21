import { z } from "zod"

export const createCategorySchema = z.object({
    name: z.string().required("name is required").min(2).max(50),
    description: z.string().max(500).optional(),
}).strict()

export const updateCategorySchema = z.object({
    name: z.string().min(2).max(50).optional(),
    description: z.string().max(500).optional(),
}).strict()

export const getCategorySchema = z.object({
    id: z.string().required("id is required"),
}).strict()

export const deleteCategorySchema = z.object({
    id: z.string().required("id is required"),
}).strict()
