import { useState } from "react";
import { useSelector } from "react-redux";
import { Calendar, momentLocalizer } from "react-big-calendar";
import moment from "moment";
import withDragAndDrop from "react-big-calendar/lib/addons/dragAndDrop";

import "react-big-calendar/lib/addons/dragAndDrop/styles.css";
import "react-big-calendar/lib/css/react-big-calendar.css";

const localizer = momentLocalizer(moment);
const DnDCalendar = withDragAndDrop(Calendar);


function MainCalendar() {
    const initialEvents = useSelector(state => state.events)
     
    const [events, setEvents] = useState(initialEvents)

    const onEventResize = (data) => {
        console.log(data)

    };

    const onEventDrop = (data) => {
        console.log(data)

    };


    return (
        <div className="MainCalendar">
            <DnDCalendar
                defaultDate={moment().toDate()}
                defaultView="month"
                events={events}
                localizer={localizer}
                onEventDrop={onEventDrop}
                onEventResize={onEventResize}
                resizable
                style={{ height: "100vh" }}
            />
        </div>
    );

}

export default MainCalendar;