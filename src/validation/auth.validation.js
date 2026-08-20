import { z } from "zod"

export const registerUserSchema = z.object({
    name: z.string().min(2).max(50),
    lastname: z.string().min(2).max(50),
    email: z.string().email().transform((s) => s.toLowerCase()),
    password: z.string().min(12).max(128),
}).strict()

export const loginUserSchema = z.object({
    email: z.string().email().transform((s) => s.toLowerCase()),
    password: z.string().min(12).max(128),
}).strict()

export const changePasswordSchema = z.object({
    email: z.string().email().transform((s) => s.toLowerCase()),
    oldPassword: z.string().min(12).max(128),
    newPassword: z.string().min(12).max(128)
}).strict()

export const forgotPasswordSchema = z.object({
    email: z.string().email().transform((s) => s.toLowerCase())
}).strict()

export const resetPasswordSchema = z.object({
    email: z.string().email().transform((s) => s.toLowerCase()),
    password: z.string().min(12).max(128),
    otp: z.string().length(6, "OTP must be a 6 digits").regex(/^\d+$/, "OTP must contain only numbers")
})

export const verifyEmailSchema = z.object({
     email: z.string().email().transform((s) => s.toLowerCase()),
     otp: z.string().length(6, "OTP must be a 6 digits").regex(/^\d+$/, "OTP must contain only numbers")
})