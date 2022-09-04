import { configureStore } from '@reduxjs/toolkit';
import calendarReducer from '../features/calendar/calendarSlice';
import notificationReducer from '../features/notification/notificationSlice'

export const store = configureStore({
  reducer: {
    calendar: calendarReducer,
    notification: notificationReducer,
  },
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware({
      serializableCheck: {
        // Ignore these action types
        ignoredActions: ['calendar/fetchEventsByLocation/fulfilled'],
        // Ignore these field paths in all actions
        ignoredActionPaths: [
          'payload.start',
          'payload.end',
          'meta.arg.start',
          'meta.arg.end',
          'payload.value'
        ],
        // Ignore these paths in the state
        ignoredPaths: [
          'calendar.items', 
          'calendar.currentItem.start',
          'calendar.currentItem.end',     
        ],
      },
    }),
});
