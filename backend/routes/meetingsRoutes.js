import express from 'express'
import { protect } from '../middleware/authMiddleware.js'
import * as meetingsController from '../controllers/meetingsController.js'

const router = express.Router()

router.route('/').get(protect, meetingsController.getMeetings)
router.route('/').post(protect, meetingsController.createMeeting)
router.route('/:id').get(protect, meetingsController.getMeeting)
router.route('/:id').put(protect, meetingsController.updateMeeting)
router.route('/:id/delete').delete(protect, meetingsController.deleteMeeting)
// router.route('/delete').delete(protect, meetingsController.deleteMeetings)

export default router
