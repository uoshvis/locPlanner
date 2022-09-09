import { useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";
import { Calendar, momentLocalizer } from "react-big-calendar";
import withDragAndDrop from "react-big-calendar/lib/addons/dragAndDrop";
import "react-big-calendar/lib/addons/dragAndDrop/styles.css";
import "react-big-calendar/lib/css/react-big-calendar.css";
import moment from "moment";
import Backdrop from '@mui/material/Backdrop';
import CircularProgress from '@mui/material/CircularProgress';
import styles from './Calendar.module.css'
import { 
    setFormType, selectCurrentEvent, toggleShowModal, updateEventData, fetchEventsByLocation, filterEventsByLocation } from "./calendarSlice";
import { setNotification, 
    isNotificationOpen } from "../notification/notificationSlice";
import { fetchUsers } from "../users/usersSlice";
import LocationBtn from "./LocationBtn";
import { EventForm } from "./EventForm";

const localizer = momentLocalizer(moment);
const DnDCalendar = withDragAndDrop(Calendar);


function MainCalendar() {
    const dispatch = useDispatch()
    const location = useSelector(state => state.calendar.currentLocation)
    const events = useSelector(state => filterEventsByLocation(state, location))
    const open = useSelector(state => state.calendar.showModal)
    const status = useSelector(state => state.calendar.status)
    const notificationIsOpen = useSelector(isNotificationOpen)



    useEffect(() => {
        // https://github.com/facebook/react/issues/14326
        let didCancel = false

        async function fetchAPI() {
            try {
                await dispatch(fetchEventsByLocation(location)).unwrap()
            }
            catch {
                // error catched in reject case
                // swallow error
            }
            if (!didCancel) {}
        }
        if (!notificationIsOpen) {
            fetchAPI()
        }
        return () => {didCancel = true}
           
    }, [dispatch, 
        location,
        notificationIsOpen, // do fetch if notification is closed
    ])
    
    useEffect(() => {
        let didCancel = false

        async function dofetchUsers() {
            try {
                await dispatch(fetchUsers()).unwrap()
            }
            catch {
                // error catched in reject case
                // swallow error
            }
            if (!didCancel) {}
        }
        dofetchUsers()

        return () => {didCancel = true}
           
    }, [dispatch, ]) 

    const handleEventDrop = async (data) => {
        const { start, end } = data
        const updatedEvent = {
            ...data.event,
            start: start.toISOString(),
            end: end.toISOString()
        }        
        try {
            await dispatch(updateEventData(updatedEvent)).unwrap()
        } catch (err) {
            dispatch(setNotification({message: err.message, type: 'error'}))
        }
    };

    const handleSelectEvent = (data) => {
        dispatch(setFormType('update'))
        dispatch(selectCurrentEvent(data))
        dispatch(toggleShowModal())
    }

    const handleSelectSlot = (data) => {
        const {start, end} = data
        dispatch(setFormType('add'))
        dispatch(selectCurrentEvent({
            location,
            start: start.toISOString(),
            end: end.toISOString()
        }))
        dispatch(toggleShowModal())
    }


    return (
        <div className={styles.MainCalendar}>
            <Backdrop
                sx={{ color: '#fff', zIndex: (theme) => theme.zIndex.drawer + 1 }}
                open={status === 'loading'}
            >       
            {status === 'loading' && <CircularProgress color="inherit" />}
            </Backdrop>

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
            />
            
            {open && <EventForm open={open}/>}

        </div>
    );
}


export default MainCalendar;