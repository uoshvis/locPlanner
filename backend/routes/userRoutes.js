import express from 'express'
import { protect } from '../middleware/authMiddleware.js'
import * as userController from '../controllers/usersController.js'

const router = express.Router()

router.route('/').get(protect, userController.getUsers)
router.route('/profile').get(protect, userController.getUserProfile)

export default router
