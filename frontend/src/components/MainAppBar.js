import React from 'react'
import { useSelector } from 'react-redux'
import { Link } from 'react-router-dom'

import AppBar from '@mui/material/AppBar'
import Avatar from '@mui/material/Avatar'
import Box from '@mui/material/Box'
import IconButton from '@mui/material/IconButton'
import Logo from '../styles/logo128.svg'
import Menu from '@mui/material/Menu'
import MenuIcon from '@mui/icons-material/Menu'
import MenuItem from '@mui/material/MenuItem'
import Toolbar from '@mui/material/Toolbar'
import Tooltip from '@mui/material/Tooltip'
import Typography from '@mui/material/Typography'
import { useTheme } from '@mui/material'

const settings = [
    { text: 'Profile', href: '/user-profile' },
    { text: 'Logout', href: '/logout' },
]

function MainAppBar({ drawerWidth, handleDrawerToggle }) {
    const theme = useTheme()

    const [anchorElUser, setAnchorElUser] = React.useState(null)
    const { userInfo } = useSelector((state) => state.auth)

    const avatarString = userInfo?.firstName[0] + userInfo?.lastName[0]

    const handleOpenUserMenu = (event) => {
        setAnchorElUser(event.currentTarget)
    }

    const handleCloseUserMenu = () => {
        setAnchorElUser(null)
    }

    return (
        <AppBar
            position="fixed"
            sx={{
                width: '100%',
                ml: { md: `${drawerWidth}px` },
                zIndex: theme.zIndex['drawer'] + 1,
            }}
        >
            <Toolbar>
                <Box
                    component="img"
                    sx={{
                        display: { xs: 'none', md: 'flex' },
                        mr: 1,
                        height: '2em',
                    }}
                    alt="Logo"
                    src={Logo}
                />

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
    )
}

export default MainAppBar
