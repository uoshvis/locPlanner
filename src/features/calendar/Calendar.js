import { useState } from "react";
import { useSelector, useDispatch } from "react-redux";
import { Calendar, momentLocalizer } from "react-big-calendar";
import moment from "moment";
import withDragAndDrop from "react-big-calendar/lib/addons/dragAndDrop";
import "react-big-calendar/lib/addons/dragAndDrop/styles.css";
import "react-big-calendar/lib/css/react-big-calendar.css";

import { updateEvent } from "./eventsSlice";

const localizer = momentLocalizer(moment);
const DnDCalendar = withDragAndDrop(Calendar);


function MainCalendar() {
    const dispatch = useDispatch()
    const events = useSelector(state => state.events.items)

    const [currentEvent, setCurrentEvent] = useState({})

    const handleEventResize = (data) => {
        const { start, end } = data
        const updatedEvent = {
            ...data.event,
            start: start.toString(),
            end: end.toString()
        }
        dispatch(updateEvent(updatedEvent))
    };

    const handleEventDrop = (data) => {
        const { start, end } = data
        const updatedEvent = {
            ...data.event,
            start: start.toString(),
            end: end.toString()
        }
        dispatch(updateEvent(updatedEvent))
    };

    const handleSelectEvent = (data) => {
        setCurrentEvent(data)
    }


    return (
        <div className="MainCalendar">
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
        </div>
    );
}


export default MainCalendar;