import asyncHandler from 'express-async-handler'
import User from '../models/userModel.js'

const getProfile = asyncHandler(async (req, res) => {
    // req.user was set in authMiddleware.js
    const user = await User.findById(req.user._id)

    if (user) {
        res.json({
            id: user.id,
            userName: user.userName,
            firstName: user.firstName,
            lastName: user.lastName,
            role: user.role,
            userColor: user.userColor,
        })
    } else {
        res.status(404)
        throw new Error('User profile not found')
    }
})

const getUsers = asyncHandler(async (req, res) => {
    const users = await User.find({}, 'id firstName lastName userColor')
    if (users) {
        res.json(users)
    } else {
        res.status(404)
        throw new Error('Users not found')
    }
})

const getUsersData = asyncHandler(async (req, res) => {
    // req.user was set in authMiddleware.js
    const user = await User.findById(req.user._id)
    if (['admin', 'superAdmin'].includes(user.role)) {
        const users = await User.find({})
        if (users) {
            res.json(users)
        } else {
            res.status(404)
            throw new Error('No Users')
        }
    } else {
        res.status(401)
        throw new Error('Only for admin role users')
    }
})

const getUser = asyncHandler(async (req, res) => {
    // req.user was set in authMiddleware.js
    const reqUser = await User.findById(req.user._id)
    const id = req.params.id
    if (['admin', 'superAdmin'].includes(reqUser.role)) {
        const user = await User.findOne({ id })
        if (user) {
            res.json(user)
        } else {
            res.status(404)
            throw new Error('User not Found')
        }
    } else {
        res.status(401)
        throw new Error('Only for admin role users')
    }
})

const updateUser = asyncHandler(async (req, res) => {
    // req.user was set in authMiddleware.js
    const reqUser = await User.findById(req.user._id)
    const id = req.params.id
    const data = req.body

    const userToUpdate = await User.findOne({ id })

    if (userToUpdate) {
        if (
            userToUpdate.id === reqUser.id ||
            ['admin', 'superAdmin'].includes(reqUser.role)
        ) {
            const doc = await User.findOneAndUpdate({ id }, data, {
                new: true,
            })
            if (doc) {
                res.json(doc)
            } else {
                res.status(500)
                throw new Error('User not edited')
            }
        }
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
        const deleted = await User.deleteOne({ id })
        if (deleted) {
            res.json(deleted)
        } else {
            res.status(404)
            throw new Error('User not Found')
        }
    } else {
        res.status(401)
        throw new Error('Only for superAdmin')
    }
})

export { getUser, getProfile, getUsers, getUsersData, updateUser, deleteUser }
