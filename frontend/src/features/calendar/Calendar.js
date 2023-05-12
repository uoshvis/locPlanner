import { useEffect, useState } from 'react'

import { useSelector, useDispatch } from 'react-redux'
import { Calendar, momentLocalizer } from 'react-big-calendar'
import withDragAndDrop from 'react-big-calendar/lib/addons/dragAndDrop'
import 'react-big-calendar/lib/addons/dragAndDrop/styles.css'
import 'react-big-calendar/lib/css/react-big-calendar.css'
import moment from 'moment'
import 'moment/locale/lt'
import styles from './Calendar.module.css'
import { setFormType, toggleShowModal } from '../events/eventsSlice'
import { setNotification } from '../notification/notificationSlice'
import LocationBtn from './LocationBtn'
import { EventForm } from '../events/EventForm'
import {
    useGetEventsQuery,
    useUpdateEventMutation,
} from '../../app/services/events'
import { useGetUsersQuery } from '../../app/services/users'
import { dateTimeToDateObj } from '../events/eventsHelpers'

moment.updateLocale('lt', {
    week: {
        dow: 1,
        doy: 1,
    },
})

const localizer = momentLocalizer(moment)
const DnDCalendar = withDragAndDrop(Calendar)

const getUserColors = (users) => {
    var userColors = users.reduce((obj, item) => {
        obj[item.id] = item.userColor
        return obj
    }, {})
    return userColors
}

function MainCalendar() {
    const dispatch = useDispatch()
    const [location, setLocation] = useState('all')
    const open = useSelector((state) => state.calendar.showModal)
    const { userInfo } = useSelector((state) => state.auth)
    const [userData, setUserData] = useState([])
    const [userColors, setUserColors] = useState({})
    const [events, setEvents] = useState([])
    const [eventData, setEventData] = useState({})
    const { data: users = [] } = useGetUsersQuery()
    const { data: eventsData = [] } = useGetEventsQuery({ location })
    const [updateEvent] = useUpdateEventMutation()

    const adminRoles = ['admin', 'superAdmin']

    useEffect(() => {
        if (users) {
            setUserData(users)
        }
    }, [users, userData])

    useEffect(() => {
        if (userData.length > 0) {
            const userColors = getUserColors(userData)
            setUserColors(userColors)
        }
    }, [userData])

    useEffect(() => {
        if (eventsData.length > 0) {
            const convertedEvents = dateTimeToDateObj(eventsData)
            setEvents(convertedEvents)
        }
    }, [eventsData])

    const handleEventDrop = async (data) => {
        const { start, end } = data
        const updatedEvent = {
            ...data.event,
            start: start.toISOString(),
            end: end.toISOString(),
        }
        try {
            await updateEvent(updatedEvent).unwrap()
        } catch (err) {
            dispatch(setNotification({ message: err, type: 'error' }))
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
        setEventData(data)
        dispatch(toggleShowModal())
    }

    const handleSelectSlot = (data) => {
        const { start, end } = data
        const loc = location === 'all' ? '' : location
        dispatch(setFormType('add'))
        setEventData({
            location: loc,
            userId: userInfo.id,
            start: start.toISOString(),
            end: end.toISOString(),
        })
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
            <LocationBtn setLocation={setLocation} location={location} />

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

            {open && <EventForm open={open} event={eventData} />}
        </div>
    )
}

export default MainCalendar
