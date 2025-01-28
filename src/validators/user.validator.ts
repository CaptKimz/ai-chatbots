import { z } from 'zod'

export const UserCreateSchema = z.object({
    name: z.string().min(2),
    email: z.string().email(),
    age: z.number().int().positive().optional(),
})

export const UserUpdateSchema = UserCreateSchema.partial()

export type UserCreateInput = z.infer<typeof UserCreateSchema>
export type UserUpdateInput = z.infer<typeof UserUpdateSchema>
