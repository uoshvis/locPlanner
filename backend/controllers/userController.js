import asyncHandler from 'express-async-handler'
import User from '../models/userModel.js'
import generateToken from '../utils/generateToken.js'

const registerUser = asyncHandler(async (req, res) => {
    const data = req.body

    // check if email exists in db
    const userExists = await User.findOne({ userName: data.userName })

    if (userExists) {
        res.status(404)
        throw new Error('User already exists')
    }

    // create new user document in db
    const user = await User.create(data)

    if (user) {
        res.status(201).json({
            _id: user._id,
            firstName: user.firstName,
            userName: user.userName,
        })
    } else {
        res.status(400)
        throw new Error('Invalid user data')
    }
})

const loginUser = asyncHandler(async (req, res) => {
    const { userName, password } = req.body

    // check if user email exists in db
    const user = await User.findOne({ userName })

    // return user obj if their password matches
    if (user && (await user.matchPassword(password))) {
        res.json({
            _id: user._id,
            userName: user.userName,
            firstName: user.firstName,
            lastName: user.lastName,
            role: user.role,
            userToken: generateToken(user._id),
        })
    } else {
        res.status(401)
        throw new Error('Invalid userName or password')
    }
})

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

export { registerUser, loginUser, getUserProfile }
