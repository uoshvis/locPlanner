import React from 'react'
import { Routes, Route, Navigate, Outlet, useLocation } from 'react-router-dom'
import { useSelector } from 'react-redux'
import loadable from '@loadable/component'
import './App.css'
import MainCalendar from './features/calendar/Calendar'
import Notification from './features/notification/Notification'
import {
    getApiStatus,
    getNotificationType,
    isNotificationOpen,
    getNotificationMsg,
} from './features/notification/notificationSlice'
import Navbar from './components/Navbar'
import Home from './components/Home'
import NoMatch from './components/NoMatch'
import DashboardStyleLayout from './components/Dashboard'
import SignIn from './features/auth/SignIn'
import SignUp from './features/auth/SignUp'
import Logout from './features/auth/Logout'
import Users from './features/users/Users'
import Events from './features/events/Events'
import Meetings from './features/meetings/Meetings'
import UserProfile from './features/users/UserProfile'
import BackDropLoader from './components/BackDropLoader'

const About = loadable(() => import('./components/About'))

function App() {
    const notificationIsOpen = useSelector(isNotificationOpen)
    const notificationType = useSelector(getNotificationType)
    const notificationMsg = useSelector(getNotificationMsg)
    const apiStatus = useSelector(getApiStatus)
    const open = useSelector((state) => state.calendar.showModal)
    const isLoggedIn = useSelector((state) => state.auth.isLoggedIn)

    return (
        <div className="App">
            <React.Fragment>
                {notificationIsOpen && !open && (
                    <Notification
                        type={notificationType}
                        message={notificationMsg}
                    />
                )}

                <BackDropLoader apiStatus={apiStatus} />
            </React.Fragment>

            <Routes>
                <Route element={<MainLayout />}>
                    <Route path="login" element={<SignIn />} />
                    <Route path="register" element={<SignUp />} />
                    <Route path="logout" element={<Logout />} />
                    <Route path="*" element={<NoMatch />} />
                    <Route element={<RequireAuth isAllowed={!!isLoggedIn} />}>
                        <Route element={<DashboardStyleLayout />}>
                            <Route index element={<Home />} />
                            <Route path="calendar" element={<MainCalendar />} />
                            <Route path="events" element={<Events />} />
                            <Route path="meetings" element={<Meetings />} />
                            <Route path="about" element={<About />} />
                            <Route path="profile" element={<UserProfile />} />
                            <Route
                                element={
                                    <RequireAuthorization redirectPath="/" />
                                }
                            >
                                <Route path="users/*" element={<Users />} />
                            </Route>
                        </Route>
                    </Route>
                </Route>
            </Routes>
        </div>
    )
}

function MainLayout() {
    return (
        <div>
            <Navbar />
            <Outlet />
        </div>
    )
}

function RequireAuth({ isAllowed, redirectPath = '/login', children }) {
    // isAllowed = true  // uncomment for dev
    let location = useLocation()
    if (!isAllowed) {
        return <Navigate to={redirectPath} state={{ from: location }} replace />
    }
    return children ? children : <Outlet /> // to use as wrapping component
}

function RequireAuthorization({ redirectPath = '/', children }) {
    const adminRoles = ['admin', 'superAdmin']

    const { isLoggedIn } = useSelector((state) => state.auth)
    const {
        userDetails: { role },
    } = useSelector((state) => state.users)

    const isAllowed = isLoggedIn && adminRoles.includes(role)

    if (!isAllowed) {
        return (
            <div>
                <h1>You dont have permissions</h1>
                <span>Contact admin</span>
            </div>
        )
    }

    return children ? children : <Outlet /> // to use as wrapping component
}

export default App
