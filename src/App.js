import React from 'react';
import { Routes, Route } from "react-router-dom";
import { useSelector } from 'react-redux';
import './App.css';
import MainCalendar from './features/calendar/Calendar';
import Notification from './features/notification/Notification';
import { getNotificationType, isNotificationOpen, getNotificationMsg } from './features/notification/notificationSlice';
import Navbar from './components/Navbar'
import Home from './components/Home'


function App() {
  const notificationIsOpen = useSelector(isNotificationOpen)
  const notificationType = useSelector(getNotificationType)
  const notificationMsg = useSelector(getNotificationMsg)
  const open = useSelector(state => state.calendar.showModal)

  return (
    <div className="App">
        <Navbar />
            <React.Fragment>
                {
                    notificationIsOpen &&
                    !open && 
                    <Notification 
                        type={notificationType}
                        message={notificationMsg}
                    />
                }                
            </React.Fragment>
        <Routes>
            <Route path="/" element={<Home />} />
            <Route path="calendar" element={<MainCalendar />} />           
        </Routes>
    </div>
  );
}

export default App;
