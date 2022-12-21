import React from 'react';
import {
    Routes,
    Route,
    Navigate,
    Outlet, 
    useLocation
    } from "react-router-dom";
import { useSelector } from 'react-redux';
import loadable from '@loadable/component';

import './App.css';
import MainCalendar from './features/calendar/Calendar';
import Notification from './features/notification/Notification';
import { 
    getApiStatus,
    getNotificationType,
    isNotificationOpen,
    getNotificationMsg
    } from './features/notification/notificationSlice';
import Navbar from './components/Navbar'
import Home from './components/Home'
import NoMatch from './components/NoMatch';
import DashboardLayout from './components/Dashboard';
import Login from './features/auth/Login';
import Logout from './features/auth/Logout';
import Users from './components/Users';
import Info from './components/Info';
import Events from './components/Events';
import BackDropLoader from './components/BackDropLoader';

const About = loadable(() => import('./components/About'));

 
function App() {    

    const notificationIsOpen = useSelector(isNotificationOpen)
    const notificationType = useSelector(getNotificationType)
    const notificationMsg = useSelector(getNotificationMsg)
    const apiStatus = useSelector(getApiStatus)
    const open = useSelector(state => state.calendar.showModal)
    const isLoggedIn = useSelector(state => state.auth.isLoggedIn)
    const userInfo = useSelector(state => state.auth.userInfo)


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

                <BackDropLoader apiStatus={apiStatus}/>
                            
            </React.Fragment>

            <Routes>
                <Route element={<Layout />}>
                    <Route path="/login" element={<Login />} />
                    <Route path="/logout" element={<Logout />} />
                    <Route element={<RequireAuth isAllowed={!!isLoggedIn} />}>
                        <Route index element={<Home />} />
                        <Route path="/calendar" element={<MainCalendar />} />
                        <Route path="/events" element={<Events />} />
                    </Route>
                    
                    <Route element={
                                <RequireAuth
                                    redirectPath="/"
                                    isAllowed={
                                        !!isLoggedIn && userInfo.roles.includes('admin')
                                    }
                                />}
                    >
                        <Route path="dashboard" element={<DashboardLayout />}>
                            <Route path="users/*" element={<Users handleUserItemClick={()=> {console.log('clicked item')}} />}>
                            </Route>
                            <Route path="info" element={<Info />} />
                            <Route path="*" element={<NoMatch />} />
                        </Route>
                    </Route>
                    <Route path="about" element={<About />} />
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
       // isAllowed = true  // uncomment for dev
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
