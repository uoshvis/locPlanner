import asyncHandler from 'express-async-handler'
import Meeting from '../models/meetingModel.js'

const getMeetings = asyncHandler(async (req, res) => {
    // req.user was set in authMiddleware.js
    const meetings = await Meeting.find({})

    if (meetings) {
        res.json(meetings)
    } else {
        res.status(404)
        throw new Error('No meetings')
    }
})

export { getMeetings }