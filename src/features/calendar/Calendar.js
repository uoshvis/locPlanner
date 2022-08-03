import { useState } from "react";
import { Calendar, momentLocalizer } from "react-big-calendar";
import moment from "moment";
import withDragAndDrop from "react-big-calendar/lib/addons/dragAndDrop";

import "react-big-calendar/lib/addons/dragAndDrop/styles.css";
import "react-big-calendar/lib/css/react-big-calendar.css";

const localizer = momentLocalizer(moment);
const DnDCalendar = withDragAndDrop(Calendar);

const initialState = {
  events: [
    {
        id: 10,
        start: moment().toDate(),
        end: moment().add(1, "hours").toDate(),
        title: "Some title",
    },
    {   
        id: 20,
        start: moment().add(2, "days").toDate(),
        end: moment().add(3, "days").toDate(),
        title: "Some title2",
      },
  ],
};

function MainCalendar() {
    const [events, setEvents] = useState(initialState.events)

    const onEventResize = (data) => {
        const { start, end } = data;
        const { id } = data.event
        const eventIndex = events.findIndex((obj => obj.id === id));
        events[eventIndex] = { ...events[eventIndex], start: start, end: end}
        setEvents(events)
    };

    const onEventDrop = (data) => {
        const { start, end } = data;
        const { id } = data.event
        const eventIndex = events.findIndex((obj => obj.id === id));
        events[eventIndex] = { ...events[eventIndex], start: start, end: end}
        setEvents(events)
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