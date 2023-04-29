import bcrypt from 'bcryptjs'
import { mongoose } from 'mongoose'

const eventSchema = mongoose.Schema({
    id: {
        type: Number,
        required: true,
        unique: true,
        immutable: true,
    },
    start: {
        type: Date,
        required: true,
    },
    end: {
        type: Date,
    },
    title: {
        type: String,
        required: true,
    },
    location: {
        type: String,
        enum: ['loc1', 'loc2'],
        required: true,
    },
    userId: {
        type: Number,
        required: true,
    },
    isCompleted: {
        type: Boolean,
    },
})

const Event = mongoose.model('Event', eventSchema)

export default Event
