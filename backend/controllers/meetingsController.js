import asyncHandler from 'express-async-handler'
import Meeting from '../models/meetingModel.js'

const getMeetings = asyncHandler(async (req, res) => {
    const meetings = await Meeting.find({})

    if (meetings) {
        res.json(meetings)
    } else {
        res.status(404)
        throw new Error('No meetings')
    }
})

const getMeeting = asyncHandler(async (req, res) => {
    const id = req.params.id
    const meeting = await Meeting.find({ id })

    if (meeting) {
        res.json(meeting)
    } else {
        res.status(404)
        throw new Error(`Meeting with id ${id} not found`)
    }
})

const createMeeting = asyncHandler(async (req, res) => {
    const data = req.body
    const id = Date.now()

    const meeting = await Meeting.create({ id, ...data })

    if (meeting) {
        res.status(201).json({
            id: meeting.id,
            title: meeting.title,
        })
    } else {
        res.status(400)
        throw new Error('Invalid meeting data')
    }
})

const updateMeeting = asyncHandler(async (req, res) => {
    // req.user was set in authMiddleware.js
    const id = req.params.id
    const data = req.body
    const itemToEdit = await Meeting.findOne({ id })

    if (itemToEdit) {
        const edited = await Meeting.findOneAndUpdate({ id }, data, {
            new: true,
        })
        if (edited) {
            res.json(edited)
        } else {
            res.status(500)
            throw new Error('Meeting not edited')
        }
    } else {
        res.status(404)
        throw new Error('Meeting not Found')
    }
})

export { getMeetings, getMeeting, createMeeting, updateMeeting }
