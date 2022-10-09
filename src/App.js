import React from 'react';
import { Routes, Route, Navigate, Outlet, useLocation } from "react-router-dom";
import { useSelector } from 'react-redux';
import './App.css';
import MainCalendar from './features/calendar/Calendar';
import Notification from './features/notification/Notification';
import { getNotificationType, isNotificationOpen, getNotificationMsg } from './features/notification/notificationSlice';
import Navbar from './components/Navbar'
import Home from './components/Home'
import NoMatch from './components/NoMatch';
import Dashboard from './components/Dashboard';
import Account from './components/Account';
import Login from './features/auth/Login';
import Logout from './features/auth/Logout';

 
function App() {

    const notificationIsOpen = useSelector(isNotificationOpen)
    const notificationType = useSelector(getNotificationType)
    const notificationMsg = useSelector(getNotificationMsg)
    const open = useSelector(state => state.calendar.showModal)
    const isLoggedIn = useSelector(state => state.auth.isLoggedIn)
    const user = useSelector(state => state.auth.currentUser)

    return (
        <div className="App">
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
                <Route element={<Layout />}>
                    <Route path="/login" element={<Login />} />
                    <Route path="/logout" element={<Logout />} />
                    <Route element={<RequireAuth isAllowed={!!isLoggedIn} />}>
                        <Route index element={<Home />} />
                        <Route path="/calendar" element={<MainCalendar />} />
                        <Route path="/account" element={<Account />} />
                    </Route>
                    <Route
                        path="dashboard"
                        element={
                            <RequireAuth
                                redirectPath="/"
                                isAllowed={!!isLoggedIn && user.roles.includes('admin')}
                            >
                                <Dashboard />
                            </RequireAuth>
                        }
                    />
                    <Route path="*" element={<NoMatch />} />
                </Route>
            </Routes>
        </div>
    );
}


function Layout() {

    return (
        <div>
            <Navbar />
            <Outlet />
        </div>
    )
}


function RequireAuth({
    isAllowed,
    redirectPath = '/login',
    children }) {
        let location = useLocation()        
        if (!isAllowed) {
            return <Navigate 
                to={redirectPath}
                state={{from: location}}
                replace/>
        }
        return children ? children : <Outlet />; // to use as wrapping component
}


export default App;
