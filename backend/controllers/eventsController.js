import asyncHandler from 'express-async-handler'
import Event from '../models/eventModel.js'
import User from '../models/userModel.js'

const getEvents = asyncHandler(async (req, res) => {
    const events = await Event.find({})

    if (events) {
        res.json(events)
    } else {
        res.status(404)
        throw new Error('No events')
    }
})

const getEvent = asyncHandler(async (req, res) => {
    const id = req.params.id
    const event = await Event.find({ id })

    if (event) {
        res.json(event)
    } else {
        res.status(404)
        throw new Error('Event not Found')
    }
})

const createEvent = asyncHandler(async (req, res) => {
    const data = req.body
    const id = Date.now()

    const event = await Event.create({ id, ...data })

    if (event) {
        res.status(201).json({
            id: event.id,
            title: event.title,
        })
    } else {
        res.status(400)
        throw new Error('Invalid event data')
    }
})

const updateEvent = asyncHandler(async (req, res) => {
    // req.user was set in authMiddleware.js
    const reqUser = await User.findById(req.user._id)
    const id = req.params.id
    const data = req.body
    const eventToEdit = await Event.findOne({ id })
    if (eventToEdit) {
        if (
            eventToEdit.userId === reqUser.id ||
            ['admin', 'superAdmin'].includes(reqUser.role)
        ) {
            const edited = await Event.findOneAndUpdate({ id }, data, {
                new: true,
            })
            if (edited) {
                res.json(edited)
            } else {
                res.status(500)
                throw new Error('Event not edited')
            }
        }
    } else {
        res.status(404)
        throw new Error('Event not Found')
    }
})

const deleteEvent = asyncHandler(async (req, res) => {
    // req.user was set in authMiddleware.js
    const reqUser = await User.findById(req.user._id)
    const id = req.params.id
    const eventToDelete = await Event.findOne({ id })
    if (eventToDelete) {
        if (
            eventToDelete.userId === reqUser.id ||
            ['admin', 'superAdmin'].includes(reqUser.role)
        ) {
            const deleted = await Event.deleteOne({ id })
            if (deleted) {
                res.json(deleted)
            } else {
                res.status(500)
                throw new Error('Event not deleted')
            }
        }
    } else {
        res.status(404)
        throw new Error('Event not Found')
    }
})

export { getEvents, getEvent, createEvent, updateEvent, deleteEvent }
