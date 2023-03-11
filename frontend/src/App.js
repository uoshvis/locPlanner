import React from 'react'
import { Routes, Route } from 'react-router-dom'
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
import Home from './components/Home'
import NoMatch from './components/NoMatch'
import { MainLayout, AppLayout } from './components/Layouts'
import SignIn from './features/auth/SignIn'
import SignUp from './features/auth/SignUp'
import Logout from './features/auth/Logout'
import Users from './features/users/Users'
import Events from './features/events/Events'
import Meetings from './features/meetings/Meetings'
import UserProfile from './features/users/UserProfile'
import BackDropLoader from './components/BackDropLoader'
import RequireLogin from './routing/RequireLogin'
import RequireAdminRole from './routing/RequireAdmin'

const About = loadable(() => import('./components/About'))

function App() {
    const notificationIsOpen = useSelector(isNotificationOpen)
    const notificationType = useSelector(getNotificationType)
    const notificationMsg = useSelector(getNotificationMsg)
    const apiStatus = useSelector(getApiStatus)
    const open = useSelector((state) => state.calendar.showModal)

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
                    <Route element={<RequireLogin />}>
                        <Route element={<AppLayout />}>
                            <Route index element={<Home />} />
                            <Route path="calendar" element={<MainCalendar />} />
                            <Route path="events" element={<Events />} />
                            <Route path="meetings" element={<Meetings />} />
                            <Route path="about" element={<About />} />
                            <Route
                                path="user-profile"
                                element={<UserProfile />}
                            />
                            <Route element={<RequireAdminRole />}>
                                <Route path="users/*" element={<Users />} />
                            </Route>
                        </Route>
                    </Route>
                </Route>
            </Routes>
        </div>
    )
}

export default App
