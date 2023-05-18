import * as z from 'zod'

const meetingSchema = z.object({
    firstName: z.string().min(1, { message: 'First name required' }),
    lastName: z.string().min(1, { message: 'Last name required' }),
    personalId: z.string().min(1, { message: 'ID required' }),
    meetingDate: z.coerce.date(),
    md: z.string().min(1, { message: 'MD required' }),
    firstDate: z.coerce.date().optional().or(z.literal('')),
})

export default meetingSchema
