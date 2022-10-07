import React from 'react';
import { Routes, Route, Link, Navigate, Outlet, useLocation } from "react-router-dom";
import { useSelector } from 'react-redux';
import './App.css';
import MainCalendar from './features/calendar/Calendar';
import Notification from './features/notification/Notification';
import { getNotificationType, isNotificationOpen, getNotificationMsg } from './features/notification/notificationSlice';
import Navbar from './components/Navbar'
import Home from './components/Home'
import NoMatch from './components/NoMatch';
import Dashboard from './components/Dashboard';
import Login from './features/auth/Login';
import Logout from './features/auth/Logout';

 
function App() {

    const notificationIsOpen = useSelector(isNotificationOpen)
    const notificationType = useSelector(getNotificationType)
    const notificationMsg = useSelector(getNotificationMsg)
    const open = useSelector(state => state.calendar.showModal)

    const isLoggedIn = useSelector(state => state.auth.isLoggedIn)

    // const [token, setToken] = useState()

    if(!isLoggedIn) {
        return <Login />
    }

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
                    <Route path="/" element={<Home />} />
                    <Route path="/login" element={<Login />} />
                    <Route path="/logout" element={<Logout />} />
                    <Route path="/dashboard" element={<Dashboard />} />
                    <Route path="*" element={<NoMatch />} />
                    <Route 
                        path="/calendar"
                        element = {
                            <RequireAuth>
                                <MainCalendar />
                            </RequireAuth>
                        }
                    />
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


function RequireAuth({ children }) {

    let location = useLocation()
    const isLoggedIn = useSelector(state => state.auth.isLoggedIn)
    
    if (!isLoggedIn) {
        return <Navigate to='/login' state={{from: location}} replace/>
    }
    return children
    // return children ? children : <Outlet />;
}


export default App;
