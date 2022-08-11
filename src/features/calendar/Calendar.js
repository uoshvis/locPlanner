import { useSelector, useDispatch } from "react-redux";
import { Calendar, momentLocalizer } from "react-big-calendar";
import moment from "moment";
import withDragAndDrop from "react-big-calendar/lib/addons/dragAndDrop";
import "react-big-calendar/lib/addons/dragAndDrop/styles.css";
import "react-big-calendar/lib/css/react-big-calendar.css";

import { selectCurrentEvent, toggleShowModal, updateEventData, fetchEventsByLocation, fetchEvents } from "./eventsSlice";
import FormDialog from "../eventForm/EventForm"
import LocationBtn from "../locationBtn/LocationBtn";
import { useEffect } from "react";

const localizer = momentLocalizer(moment);
const DnDCalendar = withDragAndDrop(Calendar);


function MainCalendar() {
    const dispatch = useDispatch()
    const events = useSelector(state => state.events.items)
    const open = useSelector(state => state.events.showModal)
    const location = useSelector(state => state.events.currentLocation)


    useEffect(() => {
        dispatch(fetchEventsByLocation(location))
    }, [dispatch, location])

    const handleEventResize = (data) => {
        alert('handleEventResize not implemented')
    };

    const handleEventDrop = (data) => {
        const { start, end } = data
        const updatedEvent = {
            ...data.event,
            start: start.toString(),
            end: end.toString()
        }
        dispatch(updateEventData(updatedEvent))
        // TODO implement fetchEvents after update
        
        // dispatch(fetchEvents())


    };

    const handleSelectEvent = (data) => {
        dispatch(selectCurrentEvent(data))
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
                onEventResize={handleEventResize}
                onSelectEvent={handleSelectEvent}
            />
            <FormDialog open={open}/>


        </div>
    );
}


export default MainCalendar;