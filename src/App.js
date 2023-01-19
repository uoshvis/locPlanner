import React, { useEffect } from "react";
import {
    Routes,
    Route,
    Navigate,
    Outlet, 
    useLocation
    } from "react-router-dom";
import { useSelector, useDispatch} from 'react-redux';
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
import SignIn from './features/auth/SignIn';
import Logout from './features/auth/Logout';
import Users from './components/Users';
import Info from './components/Info';
import Events from './components/Events';
import Profile from './components/Profile';

import BackDropLoader from './components/BackDropLoader';
import { fetchUserInfo } from "./features/auth/authSlice";

const About = loadable(() => import('./components/About'));

 
function App() {    
    const dispatch = useDispatch()
    
    const notificationIsOpen = useSelector(isNotificationOpen)
    const notificationType = useSelector(getNotificationType)
    const notificationMsg = useSelector(getNotificationMsg)
    const apiStatus = useSelector(getApiStatus)
    const open = useSelector(state => state.calendar.showModal)
    const isLoggedIn = useSelector(state => state.auth.isLoggedIn)
    const userId = useSelector(state => state.auth.userId)


    useEffect(() => {
        const fetch = () => {
            dispatch(fetchUserInfo(userId))
        }
        if (isLoggedIn) {
            fetch()
        }
      }, [isLoggedIn, dispatch, userId])


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
                    <Route path="/login" element={<SignIn />} />
                    <Route path="/logout" element={<Logout />} />
                    <Route element={<RequireAuth isAllowed={!!isLoggedIn} />}>
                        <Route index element={<Home />} />
                        <Route path="/calendar" element={<MainCalendar />} />
                        <Route path="/events" element={<Events />} />
                        <Route path="/profile" element={<Profile />} />
                    
                        <Route element={
                                    <RequireAuthorization
                                        redirectPath="/"
                                    />}
                        >
                            <Route path="dashboard" element={<DashboardLayout />}>
                                <Route path="users/*" element={<Users handleUserItemClick={()=> {console.log('clicked item')}} />}>
                                </Route>
                                <Route path="info" element={<Info />} />
                                <Route path="*" element={<NoMatch />} />
                            </Route>
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


function RequireAuthorization({
    redirectPath = '/',
    children }) {
        const {userInfo, isLoggedIn} = useSelector((state) => state.auth)

        const isAllowed = isLoggedIn && userInfo.roles.includes('admin')        
        if (!isAllowed) {
            return (
                <div>
                    <h1>You dont have permissions</h1>
                    <span>Contact admin</span>
                </div>
            )
        }
        return children ? children : <Outlet />; // to use as wrapping component
}

export default App;
