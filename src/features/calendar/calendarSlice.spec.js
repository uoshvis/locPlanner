import moment from 'moment'
import calendarReducer, {
    toggleShowModal,
    selectCurrentEvent,
    setCurrentLocation,
} from './calendarSlice'

describe('calendar reducer', () => {
    const initialState = {
        items: [],
        currentItem : {},
        currentLocation: 'all',
        showModal: false,
        status: 'idle',
        error: null, 
        eventStatus: '' 
    }

    it('should handle initial state', () => {
        expect(calendarReducer(undefined, { type: 'unknown' })).toEqual({
            items: [],
            currentItem : {},
            currentLocation: 'all',
            showModal: false,
            status: 'idle',
            error: null, 
            eventStatus: '' 
        })
    })

    it('should toggle showModal', () => {
        const actual = calendarReducer(initialState, toggleShowModal())
        expect(actual.showModal).toBe(true)
    })

    it('should set current event', () => {
        const event = {
            id: 10,
            start: moment().toDate(),
            end: moment().add(1, "hours").toDate(),
            title: "Some title 1",
            location: 'loc1',
        }
        const actual = calendarReducer(initialState, selectCurrentEvent(event))
        expect(actual.currentItem).toEqual(event)
    })

    it('should reset current event on toggle', () => {
        const event = {
            id: 10,
            start: moment().toDate(),
            end: moment().add(1, "hours").toDate(),
            title: "Some title 1",
            location: 'loc1',
        }
        const stateOne = calendarReducer(initialState, selectCurrentEvent(event))
        const stateTwo = calendarReducer(stateOne, toggleShowModal())
        expect(stateTwo.showModal).toBe(true)
        const actual = calendarReducer(stateTwo, toggleShowModal())
        expect(actual.currentItem).toEqual({})
        expect(actual.showModal).toBe(false)
    })
    
    it('should set currentEventLocation', () => {
        const actual = calendarReducer(initialState, setCurrentLocation('loc1'))
        expect(actual.currentLocation).toEqual('loc1')
    })
})