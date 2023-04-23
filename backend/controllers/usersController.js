import asyncHandler from 'express-async-handler'
import User from '../models/userModel.js'

const getUserProfile = asyncHandler(async (req, res) => {
    // req.user was set in authMiddleware.js
    const user = await User.findById(req.user._id)

    if (user) {
        res.json({
            id: user._id,
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
    if (['admin', 'superAdmin'].includes(user.role)) {
        const users = await User.find({})
        res.json({ users, userInfo: user })
    } else {
        res.status(404)
        throw new Error('No Users')
    }
})

export { getUserProfile, getUsers }
