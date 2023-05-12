import { combineReducers, configureStore } from '@reduxjs/toolkit'
import calendarReducer from '../features/events/eventsSlice'
import notificationReducer from '../features/notification/notificationSlice'
import authReducer from '../features/auth/authSlice'
import { api } from './services/api'

const combineReducer = combineReducers({
    calendar: calendarReducer,
    notification: notificationReducer,
    auth: authReducer,
    // Add the generated reducer as a specific top-level slice
    [api.reducerPath]: api.reducer,
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
                    'payload.value',
                    'meta.baseQueryMeta.request',
                    'meta.baseQueryMeta.response',
                ],
                // Ignore these paths in the state
                ignoredPaths: [
                    'calendar.selectedEvent.start',
                    'calendar.selectedEvent.end',
                ],
            },
        })
            /*
                Adding the api middleware enables caching, invalidation, polling, and other useful features of `rtk-query`.
            */
            .concat(api.middleware),
})
