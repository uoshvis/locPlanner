import { createSlice } from '@reduxjs/toolkit'

const conditionError = 'ConditionError'

const initialState = {
    message: null,
    type: null, // Available types: error, warning, info, success
    open: false,
    isLoading: false,
}

function isPendingAction(action) {
    return action.type.endsWith('/pending')
}

function isFulfilledAction(action) {
    return action.type.endsWith('/fulfilled')
}

function isRejectedAction(action) {
    return action.type.endsWith('/rejected')
}

export const notificationSlice = createSlice({
    name: 'notification',
    initialState,
    reducers: {
        setNotification: (state, action) => {
            state.message = action.payload.message
            state.type = action.payload.type
            state.open = true
        },
        clearNotification: (state) => {
            state.message = null
            state.type = null
            state.open = false
        },
    },
    // https://stackoverflow.com/questions/68721734/how-can-i-change-state-of-another-reducer-from-extra-reducers-add-cases
    extraReducers: (builder) => {
        builder
            .addMatcher(isPendingAction, (state, action) => {
                state.isLoading = true
                state.message = 'Loading...'
                state.type = 'info'
                state.open = true
            })
            .addMatcher(isFulfilledAction, (state, action) => {
                return initialState
            })
            .addMatcher(isRejectedAction, (state, action) => {
                // Skip "Aborted due to condition callback returning false."
                if (action.error.name !== conditionError) {
                    state.isLoading = false
                    state.message = action?.error?.message
                    state.type = 'error'
                    state.open = true
                }
            })
    },
})

export const getNotificationMsg = (state) => state.notification.message
export const getNotificationType = (state) => state.notification.type
export const isNotificationOpen = (state) => state.notification.open

export const { clearNotification, setNotification } = notificationSlice.actions

export default notificationSlice.reducer
