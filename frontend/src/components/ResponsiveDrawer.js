import React, { useEffect } from 'react'
import PropTypes from 'prop-types'
import AppBar from '@mui/material/AppBar'
import Box from '@mui/material/Box'
import CssBaseline from '@mui/material/CssBaseline'
import Divider from '@mui/material/Divider'
import Drawer from '@mui/material/Drawer'
import IconButton from '@mui/material/IconButton'

import MenuIcon from '@mui/icons-material/Menu'
import Toolbar from '@mui/material/Toolbar'
import Typography from '@mui/material/Typography'
import MenuItems from './MenuItems'
import { Outlet } from 'react-router-dom'
import { useTheme } from '@mui/material'

import Tooltip from '@mui/material/Tooltip'
import Avatar from '@mui/material/Avatar'
import Menu from '@mui/material/Menu'
import MenuItem from '@mui/material/MenuItem'
import { Link } from 'react-router-dom'
import { useDispatch, useSelector } from 'react-redux'
import { useGetUserProfileQuery } from '../app/services/auth/authService'
import { setUserInfo } from '../features/auth/authSlice'
import {
    clearNotification,
    setNotification,
} from '../features/notification/notificationSlice'

const drawerWidth = 240

const settings = [
    { text: 'Profile', href: '/user-profile' },
    { text: 'Logout', href: '/logout' },
]
function ResponsiveDrawer(props) {
    const dispatch = useDispatch()
    const { isLoggedIn, userInfo } = useSelector((state) => state.auth)

    const theme = useTheme()
    const { window } = props
    const [mobileOpen, setMobileOpen] = React.useState(false)

    const [anchorElUser, setAnchorElUser] = React.useState(null)

    const avatarString = userInfo?.firstName[0] + userInfo?.lastName[0]

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

    const handleOpenUserMenu = (event) => {
        setAnchorElUser(event.currentTarget)
    }

    const handleCloseUserMenu = () => {
        setAnchorElUser(null)
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
                <AppBar
                    position="fixed"
                    sx={{
                        width: '100%',
                        ml: { md: `${drawerWidth}px` },
                        zIndex: theme.zIndex['drawer'] + 1,
                    }}
                >
                    <Toolbar>
                        <IconButton
                            color="inherit"
                            aria-label="open drawer"
                            edge="start"
                            onClick={handleDrawerToggle}
                            sx={{
                                mr: 2,
                                display: { md: 'none' },
                            }}
                        >
                            <MenuIcon />
                        </IconButton>

                        <Typography
                            variant="h6"
                            noWrap
                            component={Link}
                            to="/"
                            sx={{
                                mr: 2,
                                display: { xs: 'none', sm: 'flex' },
                                fontFamily: 'monospace',
                                fontWeight: 700,
                                letterSpacing: '.3rem',
                                color: 'inherit',
                                textDecoration: 'none',
                            }}
                        >
                            LocPlanner
                        </Typography>

                        <Typography
                            sx={{
                                ml: 'auto',
                                display: { xs: 'none', sm: 'flex' },
                                fontWeight: 700,
                                color: 'inherit',
                            }}
                        >
                            Welcome back {userInfo.firstName}!
                        </Typography>

                        <Box sx={{ flexGrow: 0, ml: { xs: 'auto', sm: 2 } }}>
                            <Tooltip title="Open settings">
                                <IconButton
                                    onClick={handleOpenUserMenu}
                                    sx={{
                                        p: 0,
                                    }}
                                >
                                    <Avatar
                                        sx={{
                                            bgcolor: userInfo.userColor,
                                            color: '#fff',
                                        }}
                                        alt={userInfo.firstName}
                                    >
                                        {avatarString}
                                    </Avatar>
                                </IconButton>
                            </Tooltip>
                            <Menu
                                sx={{ mt: '45px' }}
                                id="menu-appbar"
                                anchorEl={anchorElUser}
                                anchorOrigin={{
                                    vertical: 'top',
                                    horizontal: 'right',
                                }}
                                keepMounted
                                transformOrigin={{
                                    vertical: 'top',
                                    horizontal: 'right',
                                }}
                                open={Boolean(anchorElUser)}
                                onClose={handleCloseUserMenu}
                            >
                                {settings.map((setting) => (
                                    <MenuItem
                                        key={setting.text}
                                        component={Link}
                                        to={setting.href}
                                        onClick={handleCloseUserMenu}
                                    >
                                        <Typography textAlign="center">
                                            {setting.text}
                                        </Typography>
                                    </MenuItem>
                                ))}
                            </Menu>
                        </Box>
                    </Toolbar>
                </AppBar>
            )}
            {/* Drawer box */}

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

ResponsiveDrawer.propTypes = {
    /**
     * Injected by the documentation to work in an iframe.
     * You won't need it on your project.
     */
    window: PropTypes.func,
}

export default ResponsiveDrawer
