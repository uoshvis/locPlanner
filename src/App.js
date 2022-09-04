import React from 'react';
import { useSelector } from 'react-redux';
import './App.css';
import MainCalendar from './features/calendar/Calendar';
import Notification from './features/notification/Notification';
import { getNotificationType, isNotificationOpen, getNotificationMsg } from './features/notification/notificationSlice';


function App() {
  const notificationIsOpen = useSelector(isNotificationOpen)
  const notificationType = useSelector(getNotificationType)
  const notificationMsg = useSelector(getNotificationMsg)
  const open = useSelector(state => state.calendar.showModal)


  return (
    <div className="App">
      {
        notificationIsOpen && !open && <Notification type={notificationType} message={notificationMsg}/>
      }
      <MainCalendar />

    </div>
  );
}

export default App;
