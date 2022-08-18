import { useSelector, useDispatch } from "react-redux";
import { Calendar, momentLocalizer } from "react-big-calendar";
import moment from "moment";
import withDragAndDrop from "react-big-calendar/lib/addons/dragAndDrop";
import "react-big-calendar/lib/addons/dragAndDrop/styles.css";
import "react-big-calendar/lib/css/react-big-calendar.css";

import { setEventStatus, selectCurrentEvent, toggleShowModal, updateEventData, fetchEventsByLocation } from "./calendarSlice";
import EventForm from "../eventForm/EventForm"
import LocationBtn from "../locationBtn/LocationBtn";
import { useEffect } from "react";

const localizer = momentLocalizer(moment);
const DnDCalendar = withDragAndDrop(Calendar);


function MainCalendar() {
    const dispatch = useDispatch()
    const events = useSelector(state => state.calendar.items)
    const open = useSelector(state => state.calendar.showModal)
    const location = useSelector(state => state.calendar.currentLocation)
    const status = useSelector(state => state.calendar.status)


    useEffect(() => {
        // https://github.com/facebook/react/issues/14326
        let didCancel = false

        async function fetchAPI() {
            try {
                await dispatch(fetchEventsByLocation(location)).unwrap()
            } catch (err) {
                console.log('Failed ', err)
            }
            if (!didCancel) {}
        }

        fetchAPI()
        return () => {didCancel = true}   
    }, [dispatch, location, status])

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
            console.log('Failed to update on Drop', err)
        }
    };

    const handleSelectEvent = (data) => {
        dispatch(setEventStatus('updating'))
        dispatch(selectCurrentEvent(data))
        dispatch(toggleShowModal())
    }

    const handleSelectSlot = (data) => {
        const {start, end} = data
        dispatch(setEventStatus('adding'))
        dispatch(selectCurrentEvent({
            location,
            start: start.toISOString(),
            end: end.toISOString()
        }))
        dispatch(toggleShowModal())
    }


    return (
        <div className="MainCalendar">
            <LocationBtn />
            
            <DnDCalendar
                style={{ height: "100vh" }}
                defaultDate={moment().toDate()}
                defaultView="month"
                events={events}
                localizer={localizer}
                resizable
                selectable
                onEventDrop={handleEventDrop}
                onSelectEvent={handleSelectEvent}
                onSelectSlot={handleSelectSlot}
            />
            <EventForm open={open}/>


        </div>
    );
}


export default MainCalendar;