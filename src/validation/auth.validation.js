import { z } from "zod"

export const registerSchema = z.object({
    name: z.string().min(2).max(50),
    lastname: z.string().min(2).max(50),
    email: z.string().email().transform((s) => s.toLowerCase()),
    password: z.string().min(12).max(128),
}).strict()

export const loginSchema = z.object({
    email: z.string().email().transform((s) => s.toLowerCase()),
    password: z.string().min(12).max(128),
}).strict()