import asyncHandler from 'express-async-handler'
import User from '../models/userModel.js'

const getUserProfile = asyncHandler(async (req, res) => {
    // req.user was set in authMiddleware.js
    const user = await User.findById(req.user._id)

    if (user) {
        res.json({
            id: user.id,
            userName: user.userName,
            firstName: user.firstName,
            lastName: user.lastName,
            role: user.role,
        })
    } else {
        res.status(404)
        throw new Error('User not found')
    }
})

const getUsers = asyncHandler(async (req, res) => {
    const user = await User.findById(req.user._id)
    if (user) {
        const users = await User.find({}, 'id firstName lastName')
        res.json(users)
    } else {
        res.status(404)
        throw new Error('No Users')
    }
})

const getUsersData = asyncHandler(async (req, res) => {
    const user = await User.findById(req.user._id)
    if (['admin', 'superAdmin'].includes(user.role)) {
        const users = await User.find({})
        res.json(users)
    } else {
        res.status(404)
        throw new Error('No Users')
    }
})

const getUser = asyncHandler(async (req, res) => {
    // req.user was set in authMiddleware.js
    const reqUser = await User.findById(req.user._id)
    const id = req.params.id
    if (['admin', 'superAdmin'].includes(reqUser.role)) {
        const user = await User.findOne({ id })
        res.json(user)
    } else {
        res.status(404)
        throw new Error('User not Found')
    }
})

const deleteUser = asyncHandler(async (req, res) => {
    // req.user was set in authMiddleware.js
    const reqUser = await User.findById(req.user._id)
    const id = req.params.id
    if (['superAdmin'].includes(reqUser.role)) {
        const user = await User.deleteOne({ id })
        res.json()
    } else {
        res.status(404)
        throw new Error('User not Found')
    }
})

export { getUser, getUserProfile, getUsers, getUsersData, deleteUser }
