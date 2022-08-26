import React from 'react';
import { useSelector } from 'react-redux';
import logo from './logo.svg';
import { Counter } from './features/counter/Counter';
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
      <header className="App-header">
        <img src={logo} className="App-logo" alt="logo" />
        <Counter />
        <p>
          Edit <code>src/App.js</code> and save to reload.
        </p>
        <span>
          <span>Learn </span>
          <a
            className="App-link"
            href="https://reactjs.org/"
            target="_blank"
            rel="noopener noreferrer"
          >
            React
          </a>
          <span>, </span>
          <a
            className="App-link"
            href="https://redux.js.org/"
            target="_blank"
            rel="noopener noreferrer"
          >
            Redux
          </a>
          <span>, </span>
          <a
            className="App-link"
            href="https://redux-toolkit.js.org/"
            target="_blank"
            rel="noopener noreferrer"
          >
            Redux Toolkit
          </a>
          ,<span> and </span>
          <a
            className="App-link"
            href="https://react-redux.js.org/"
            target="_blank"
            rel="noopener noreferrer"
          >
            React Redux
          </a>
        </span>
      </header>
    </div>
  );
}

export default App;
