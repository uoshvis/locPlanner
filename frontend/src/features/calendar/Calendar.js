import { useMemo, useState } from 'react'
import { useSelector, useDispatch } from 'react-redux'
import { Calendar, momentLocalizer } from 'react-big-calendar'
import withDragAndDrop from 'react-big-calendar/lib/addons/dragAndDrop'
import 'react-big-calendar/lib/addons/dragAndDrop/styles.css'
import 'react-big-calendar/lib/css/react-big-calendar.css'
import moment from 'moment'
import 'moment/locale/lt'
import styles from './Calendar.module.css'
import { setNotification } from '../notification/notificationSlice'
import LocationBtn from './LocationBtn'
import { EventForm } from '../events/EventForm'
import {
    useGetEventsQuery,
    useUpdateEventMutation,
} from '../../app/services/events'
import { useGetUsersQuery } from '../../app/services/users'
import { dateTimeToDateObj } from '../events/eventsHelpers'
import { BackdropCircular } from '../../components/Spinners'

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
    const [open, setOpen] = useState(false)
    const [formType, setFormType] = useState('view') // 'view' |'add' | 'update'
    const { userInfo } = useSelector((state) => state.auth)
    const { isLoading } = useSelector((state) => state.notification)
    const [eventData, setEventData] = useState({ userId: userInfo.id })
    const { data: userData = [] } = useGetUsersQuery()
    const { data: eventsData = [] } = useGetEventsQuery({ location })
    const [updateEvent] = useUpdateEventMutation()

    const adminRoles = ['admin', 'superAdmin']

    const userColors = useMemo(() => getUserColors(userData), [userData])
    const events = useMemo(() => dateTimeToDateObj(eventsData), [eventsData])

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
            setFormType('update')
        } else if (adminRoles.includes(userInfo.role)) {
            setFormType('update')
        } else {
            setFormType('view')
        }
        setEventData(data)
        setOpen((prevOpen) => !prevOpen)
    }

    const handleSelectSlot = (data) => {
        const { start, end } = data
        const loc = location === 'all' ? '' : location
        setFormType('add')
        setEventData({
            location: loc,
            userId: userInfo.id,
            start: start.toISOString(),
            end: end.toISOString(),
        })
        setOpen((prevOpen) => !prevOpen)
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
            <BackdropCircular open={isLoading} />

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

            {open && (
                <EventForm
                    open={open}
                    setOpen={setOpen}
                    event={eventData}
                    formType={formType}
                />
            )}
        </div>
    )
}

export default MainCalendar
