import { combineReducers, configureStore } from '@reduxjs/toolkit';
import calendarReducer from '../features/calendar/calendarSlice';
import notificationReducer from '../features/notification/notificationSlice'
import usersReducer from '../features/users/usersSlice'
import authReducer from '../features/auth/authSlice'


const combineReducer = combineReducers({
    calendar: calendarReducer,
    notification: notificationReducer,
    users: usersReducer,
    auth: authReducer,
})

const rootReducer = (state, action) => {
    if (action.type === 'auth/logout/fulfilled') {
        state = undefined
    }
    return combineReducer(state, action)

}
export const store = configureStore({
  reducer: rootReducer,
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
