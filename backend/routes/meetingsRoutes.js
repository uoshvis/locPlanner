import express from 'express'
import { protect } from '../middleware/authMiddleware.js'
import * as meetingsController from '../controllers/meetingsController.js'

const router = express.Router()

router.route('/').get(protect, meetingsController.getMeetings)

export default router
