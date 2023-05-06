import React, { useEffect } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { Outlet } from 'react-router-dom'
// MUI imports
import Box from '@mui/material/Box'
import CssBaseline from '@mui/material/CssBaseline'
import Divider from '@mui/material/Divider'
import Drawer from '@mui/material/Drawer'
import MenuItems from './MenuItems'
import Toolbar from '@mui/material/Toolbar'

// Local imports
import { useGetUserProfileQuery } from '../features/users/usersService'
import { setUserInfo } from '../features/auth/authSlice'
import {
    clearNotification,
    setNotification,
} from '../features/notification/notificationSlice'
import MainAppBar from './MainAppBar'

const drawerWidth = 240

function RespDrawerLayout(props) {
    const dispatch = useDispatch()
    const { window } = props

    const [mobileOpen, setMobileOpen] = React.useState(false)

    const { isLoggedIn } = useSelector((state) => state.auth)

    const { data, isFetching } = useGetUserProfileQuery('userProfile', {
        // perform a refetch every 15mins
        pollingInterval: 900000,
    })

    useEffect(() => {
        if (data) dispatch(setUserInfo(data))
    }, [data, dispatch])

    // Show refetch notification
    useEffect(() => {
        if (isFetching) {
            dispatch(
                setNotification({
                    message: 'Auto fetching your profile...',
                    type: 'info',
                })
            )
        } else {
            const timeId = setTimeout(() => {
                dispatch(clearNotification())
            }, 2000)

            return () => {
                clearTimeout(timeId)
            }
        }
    }, [isFetching, dispatch])

    const handleDrawerToggle = () => {
        setMobileOpen(!mobileOpen)
    }

    const drawer = (
        <div>
            <Toolbar />
            <Divider />
            <MenuItems />
        </div>
    )

    const container =
        window !== undefined ? () => window().document.body : undefined

    return (
        <Box sx={{ display: 'flex' }}>
            <CssBaseline />

            {/* AppBar */}

            {isLoggedIn && (
                <MainAppBar
                    drawerWidth={drawerWidth}
                    handleDrawerToggle={handleDrawerToggle}
                />
            )}

            {/* Drawers */}

            {isLoggedIn && (
                <Box
                    component="nav"
                    sx={{
                        width: { md: drawerWidth },
                        flexShrink: { md: 0 },
                    }}
                    aria-label="mailbox folders"
                >
                    {/* The implementation can be swapped with js to avoid SEO duplication of links. */}

                    {/* Temporary drawer */}

                    <Drawer
                        container={container}
                        variant="temporary"
                        open={mobileOpen}
                        onClose={handleDrawerToggle}
                        ModalProps={{
                            keepMounted: true, // Better open performance on mobile.
                        }}
                        sx={{
                            display: { xs: 'block', sm: 'block', md: 'none' },
                            '& .MuiDrawer-paper': {
                                boxSizing: 'border-box',
                                width: drawerWidth,
                            },
                        }}
                    >
                        {drawer}
                    </Drawer>

                    {/* Permanent drawer */}

                    <Drawer
                        variant="permanent"
                        sx={{
                            display: { xs: 'none', sm: 'none', md: 'block' },
                            '& .MuiDrawer-paper': {
                                boxSizing: 'border-box',
                                width: drawerWidth,
                            },
                        }}
                        open
                    >
                        {drawer}
                    </Drawer>
                </Box>
            )}

            {/* Main box */}
            <Box
                component="main"
                sx={{
                    flexGrow: 1,
                    p: 3,
                    width: { md: `calc(100% - ${drawerWidth}px)` },
                }}
            >
                <Toolbar />
                <Outlet />
            </Box>
        </Box>
    )
}

export default RespDrawerLayout
