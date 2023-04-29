import { useEffect } from 'react'
import { useSelector, useDispatch } from 'react-redux'
import { Calendar, momentLocalizer } from 'react-big-calendar'
import withDragAndDrop from 'react-big-calendar/lib/addons/dragAndDrop'
import 'react-big-calendar/lib/addons/dragAndDrop/styles.css'
import 'react-big-calendar/lib/css/react-big-calendar.css'
import moment from 'moment'
import 'moment/locale/lt'
import styles from './Calendar.module.css'
import {
    setFormType,
    selectCurrentEvent,
    toggleShowModal,
    updateEventData,
} from '../events/eventsSlice'
import {
    setNotification,
} from '../notification/notificationSlice'
import { fetchUsers, getUserColors } from '../users/usersSlice'
import LocationBtn from './LocationBtn'
import { EventForm } from '../events/EventForm'
import { useGetEventsQuery } from '../../app/services/events/eventsService'

moment.updateLocale('lt', {
    week: {
        dow: 1,
        doy: 1,
    },
})

const localizer = momentLocalizer(moment)
const DnDCalendar = withDragAndDrop(Calendar)

function MainCalendar() {
    const dispatch = useDispatch()
    const location = useSelector((state) => state.calendar.currentLocation)
    const open = useSelector((state) => state.calendar.showModal)
    const userColors = useSelector((state) => getUserColors(state))
    const { userInfo } = useSelector((state) => state.auth)

    const { data: events = [] } = useGetEventsQuery({ location })

    const adminRoles = ['admin', 'superAdmin']

    useEffect(() => {
        let didCancel = false

        async function dofetchUsers() {
            try {
                await dispatch(fetchUsers()).unwrap()
            } catch {
                // error catched in reject case
                // swallow error
            }
            if (!didCancel) {
            }
        }
        dofetchUsers()

        return () => {
            didCancel = true
        }
    }, [dispatch])

    const handleEventDrop = async (data) => {
        const { start, end } = data
        const updatedEvent = {
            ...data.event,
            start: start.toISOString(),
            end: end.toISOString(),
        }
        try {
            await dispatch(updateEventData(updatedEvent)).unwrap()
        } catch (err) {
            dispatch(setNotification({ message: err.message, type: 'error' }))
        }
    }

    const handleSelectEvent = (data) => {
        if (data.userId === userInfo.id) {
            dispatch(setFormType('update'))
        } else if (adminRoles.includes(userInfo.role)) {
            dispatch(setFormType('update'))
        } else {
            dispatch(setFormType('view'))
        }
        dispatch(selectCurrentEvent(data))
        dispatch(toggleShowModal())
    }

    const handleSelectSlot = (data) => {
        const { start, end } = data
        const loc = location === 'all' ? '' : location
        dispatch(setFormType('add'))
        dispatch(
            selectCurrentEvent({
                location: loc,
                userId: userInfo.id,
                start: start.toISOString(),
                end: end.toISOString(),
            })
        )
        dispatch(toggleShowModal())
    }

    const eventStyleGetter = (event) => {
        const userColor = userColors[event.userId]
        const style = {
            backgroundColor: userColor,
        }
        return {
            style: style,
        }
    }

    return (
        <div className={styles.MainCalendar}>
            <LocationBtn />

            <DnDCalendar
                style={{ height: '75vh' }}
                defaultDate={moment().toDate()}
                defaultView="month"
                events={events}
                localizer={localizer}
                selectable
                onEventDrop={handleEventDrop}
                onSelectEvent={handleSelectEvent}
                onSelectSlot={handleSelectSlot}
                eventPropGetter={eventStyleGetter}
            />

            {open && <EventForm open={open} />}
        </div>
    )
}

export default MainCalendar
