import express from 'express'
import { protect } from '../middleware/authMiddleware.js'
import * as userController from '../controllers/usersController.js'

const router = express.Router()

router.route('/').get(protect, userController.getUsers)
router.route('/users-data').get(protect, userController.getUsersData)
router.route('/profile').get(protect, userController.getUserProfile)
router.route('/:id').put(protect, userController.updateUser)
router.route('/:id').get(protect, userController.getUser)
router.route('/:id/delete').delete(protect, userController.deleteUser)

export default router
