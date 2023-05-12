import React, { useEffect } from 'react'
import { Routes, Route } from 'react-router-dom'
import { useSelector, useDispatch } from 'react-redux'
import loadable from '@loadable/component'
import './App.css'
import MainCalendar from './features/calendar/Calendar'
import Notification from './features/notification/Notification'
import {
    getNotificationType,
    isNotificationOpen,
    getNotificationMsg,
} from './features/notification/notificationSlice'
import Home from './components/Home'
import NoMatch from './components/NoMatch'
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
import RespDrawerLayout from './components/RespDrawerLayout'
import { useLazyGetUserProfileQuery } from './app/services/users'
import { setUserInfo } from './features/auth/authSlice'

const About = loadable(() => import('./components/About'))

function App() {
    const dispatch = useDispatch()
    const notificationIsOpen = useSelector(isNotificationOpen)
    const notificationType = useSelector(getNotificationType)
    const notificationMsg = useSelector(getNotificationMsg)

    const { isLoading } = useSelector((state) => state.notification)

    const { userToken, isLoggedIn } = useSelector((state) => state.auth)
    const [triggerGetProfile, result] = useLazyGetUserProfileQuery()

    useEffect(() => {
        if (userToken && !isLoggedIn) {
            triggerGetProfile()
        }
    }, [userToken, isLoggedIn, triggerGetProfile])

    useEffect(() => {
        if (result.data) {
            try {
                dispatch(setUserInfo(result.data))
            } catch (err) {
                console.log(err)
            }
        }
    }, [result, dispatch])

    return (
        <div className="App">
            <React.Fragment>
                {notificationIsOpen && (
                    <Notification
                        type={notificationType}
                        message={notificationMsg}
                    />
                )}

                <BackDropLoader isLoading={isLoading} />
            </React.Fragment>

            <Routes>
                <Route element={<RespDrawerLayout />}>
                    <Route path="login" element={<SignIn />} />
                    <Route path="register" element={<SignUp />} />
                    <Route path="logout" element={<Logout />} />
                    <Route path="*" element={<NoMatch />} />
                    <Route element={<RequireLogin />}>
                        <Route index element={<Home />} />
                        <Route path="calendar" element={<MainCalendar />} />
                        <Route path="events" element={<Events />} />
                        <Route path="meetings" element={<Meetings />} />
                        <Route path="about" element={<About />} />
                        <Route path="user-profile" element={<UserProfile />} />
                        <Route element={<RequireAdminRole />}>
                            <Route path="users/*" element={<Users />} />
                        </Route>
                    </Route>
                </Route>
            </Routes>
        </div>
    )
}

export default App
