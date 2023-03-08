import * as z from 'zod'
import { userCreateSchema } from '../../auth/SignUp'

const userWithRoleSchema = z.object({
    role: z.string().min(1, { message: 'Select role' }),
    isActive: z.boolean({
        required_error: 'isActive is required',
        invalid_type_error: 'isActive must be a boolean',
    }),
})

export const userSchema = userCreateSchema.and(userWithRoleSchema)
