import asyncHandler from 'express-async-handler'
import User from '../models/userModel.js'
import generateToken from '../utils/generateToken.js'

const registerUser = asyncHandler(async (req, res) => {
    const data = req.body
    const id = Date.now()

    // check if email exists in db
    const userExists = await User.findOne({ userName: data.userName })

    if (userExists) {
        res.status(404)
        throw new Error('User already exists')
    }

    // create new user document in db
    const user = await User.create({ ...data, id })

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
            userToken: generateToken(user._id),
            userInfo: {
                id: user.id,
                userName: user.userName,
                firstName: user.firstName,
                lastName: user.lastName,
                role: user.role,
                userColor: user.userColor,
            },
        })
    } else {
        res.status(401)
        throw new Error('Invalid userName or password')
    }
})

export { registerUser, loginUser }
