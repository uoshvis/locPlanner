import { createSelector, createSlice } from '@reduxjs/toolkit'
import { eventsApi } from '../../app/services/events'

export const selectEventsResult = eventsApi.endpoints.getEvents.select()

const emptyEvents = []

export const selectAllEvents = createSelector(
    selectEventsResult,
    (eventResult) => eventResult?.data ?? emptyEvents
)

export const selectEventById = createSelector(
    selectAllEvents,
    (state, eventId) => eventId,
    (events, eventId) => events.find((event) => event.id === eventId)
)

export const filterEventsByLoc = createSelector(
    selectAllEvents,
    (state, eventLoc) => eventLoc,
    (events, eventLoc) => events.filter((event) => event.location === eventLoc)
)

const initialState = {
    currentItem: {},
    currentLocation: 'all',
    showModal: false,
    formType: '', // 'add' | 'update'
}

export const eventsSlice = createSlice({
    name: 'calendar',
    initialState,
    reducers: {
        addEvent: {},
        getEvent: {},

        toggleShowModal(state) {
            state.showModal = !state.showModal
            if (!state.showModal) {
                state.currentItem = {}
            }
        },
        setFormType(state, action) {
            state.formType = action.payload
        },
        setCurrentLocation(state, action) {
            state.currentLocation = action.payload
        },
        selectCurrentEvent: (state, action) => {
            state.currentItem = action.payload
        },
        updateCurrentEvent: (state, action) => {
            const { key, value } = action.payload
            state.currentItem[key] = value
        },
    },
})

export const {
    setFormType,
    toggleShowModal,
    setCurrentLocation,
    selectCurrentEvent,
    updateCurrentEvent,
} = eventsSlice.actions

export default eventsSlice.reducer
