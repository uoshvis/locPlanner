import express from 'express'
import { protect } from '../middleware/authMiddleware.js'
import * as eventsController from '../controllers/eventsController.js'

const router = express.Router()

router.route('/').get(protect, eventsController.getEvents)
router.route('/').post(protect, eventsController.createEvent)
router.route('/:id').get(protect, eventsController.getEvent)
router.route('/:id').put(protect, eventsController.updateEvent)
router.route('/:id/delete').delete(protect, eventsController.deleteEvent)

export default router
