import express from 'express'
import { protect } from '../middleware/authMiddleware.js'
import * as userController from '../controllers/userController.js'

const router = express.Router()

router.route('/').get(protect, userController.getUsers)
router.route('/profile').get(protect, userController.getUserProfile)
router.post('/register', userController.registerUser)
router.post('/login', userController.loginUser)

export default router
