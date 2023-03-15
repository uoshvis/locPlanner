import bcrypt from 'bcryptjs'
import { mongoose } from 'mongoose'

const meetingSchema = mongoose.Schema({
    firstName: {
        type: String,
        required: true,
    },
    lastName: {
        type: String,
        required: true,
    },
    personalId: {
        type: String,
        required: true,
    },
    meetingData: {
        type: Date,
        required: true,
    },
    md: {
        type: String,
        required: true,
    },
    firstDate: {
        type: Date,
    },
})

const Meeting = mongoose.model('Meeting', meetingSchema)

export default Meeting
