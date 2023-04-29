import { combineReducers, configureStore } from '@reduxjs/toolkit'
import calendarReducer from '../features/events/eventsSlice'
import notificationReducer from '../features/notification/notificationSlice'
import usersReducer from '../features/users/usersSlice'
import authReducer from '../features/auth/authSlice'
import { meetingsApi } from './services/meetings/meetingsService'
// import { authApi } from './services/auth/authService'
import { usersApi } from './services/users/usersService'
import { eventsApi } from './services/events/eventsService'

const combineReducer = combineReducers({
    calendar: calendarReducer,
    notification: notificationReducer,
    users: usersReducer,
    auth: authReducer,
    // Add the generated reducer as a specific top-level slice
    [usersApi.reducerPath]: usersApi.reducer,
    [meetingsApi.reducerPath]: meetingsApi.reducer,
    // [authApi.reducerPath]: authApi.reducer,
    [eventsApi.reducerPath]: eventsApi.reducer,
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
                    'calendar.items',
                    'calendar.currentItem.start',
                    'calendar.currentItem.end',
                ],
            },
        })
            /*
                Adding the api middleware enables caching, invalidation, polling, and other useful features of `rtk-query`.
            */
            .concat(meetingsApi.middleware)
            .concat(usersApi.middleware)
            // .concat(authApi.middleware)
            .concat(eventsApi.middleware),
})
