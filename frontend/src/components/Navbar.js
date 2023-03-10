import React, { useEffect, useState } from 'react'
import { Link } from 'react-router-dom'
import { useSelector } from 'react-redux'

import AppBar from '@mui/material/AppBar'
import Box from '@mui/material/Box'
import Toolbar from '@mui/material/Toolbar'
import IconButton from '@mui/material/IconButton'
import Typography from '@mui/material/Typography'
import Menu from '@mui/material/Menu'
import MenuIcon from '@mui/icons-material/Menu'
import Container from '@mui/material/Container'
import Avatar from '@mui/material/Avatar'
import Button from '@mui/material/Button'
import Tooltip from '@mui/material/Tooltip'
import MenuItem from '@mui/material/MenuItem'

import Logo from '../logo.svg'
import { useGetUserProfileQuery } from '../app/services/auth/authService'

const pages = []

const settings = [
    { text: 'Profile', href: '/user-profile' },
    { text: 'Logout', href: '/logout' },
]
const ResponsiveAppBar = () => {
    const { isLoggedIn, userInfo } = useSelector((state) => state.auth)
    const [avatarString, setAvatarString] = useState('')

    const [anchorElNav, setAnchorElNav] = React.useState(null)
    const [anchorElUser, setAnchorElUser] = React.useState(null)

    const { data, isFetching } = useGetUserProfileQuery('userProfile', {
        // perform a refetch every 15mins
        pollingInterval: 900000,
    })

    useEffect(() => {
        if (userInfo && Object.keys(userInfo).length !== 0) {
            setAvatarString(userInfo.firstName[0] + userInfo.lastName[0])
        } else {
        }
    }, [userInfo])

    const handleOpenNavMenu = (event) => {
        setAnchorElNav(event.currentTarget)
    }
    const handleOpenUserMenu = (event) => {
        setAnchorElUser(event.currentTarget)
    }

    const handleCloseNavMenu = () => {
        setAnchorElNav(null)
    }

    const handleCloseUserMenu = () => {
        setAnchorElUser(null)
    }

    return (
        <AppBar position="static">
            <Container maxWidth="xl">
                <Toolbar disableGutters>
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

                    <Typography
                        variant="h6"
                        noWrap
                        component={Link}
                        to="/"
                        sx={{
                            mr: 2,
                            display: { xs: 'none', md: 'flex' },
                            fontFamily: 'monospace',
                            fontWeight: 700,
                            letterSpacing: '.3rem',
                            color: 'inherit',
                            textDecoration: 'none',
                        }}
                    >
                        LocPlanner
                    </Typography>
                    <Box
                        sx={{
                            flexGrow: 1,
                            display: { xs: 'flex', md: 'none' },
                        }}
                    >
                        <IconButton
                            size="large"
                            aria-label="account of current user"
                            aria-controls="menu-appbar"
                            aria-haspopup="true"
                            onClick={handleOpenNavMenu}
                            color="inherit"
                        >
                            <MenuIcon />
                        </IconButton>
                        <Menu
                            id="menu-appbar"
                            anchorEl={anchorElNav}
                            anchorOrigin={{
                                vertical: 'bottom',
                                horizontal: 'left',
                            }}
                            keepMounted
                            transformOrigin={{
                                vertical: 'top',
                                horizontal: 'left',
                            }}
                            open={Boolean(anchorElNav)}
                            onClose={handleCloseNavMenu}
                            sx={{
                                display: { xs: 'block', md: 'none' },
                            }}
                        >
                            {pages.map((page) => (
                                <MenuItem
                                    key={page.text}
                                    onClick={handleCloseNavMenu}
                                    component={Link}
                                    to={page.href}
                                >
                                    <Typography textAlign="center">
                                        {page.text}
                                    </Typography>
                                </MenuItem>
                            ))}
                        </Menu>
                    </Box>
                    <Box
                        component="img"
                        sx={{
                            display: { xs: 'flex', md: 'none' },
                            mr: 1,
                            height: '2em',
                        }}
                        alt="Logo"
                        src={Logo}
                    />
                    <Typography
                        variant="h5"
                        noWrap
                        component={Link}
                        to="/"
                        sx={{
                            mr: 2,
                            display: { xs: 'flex', md: 'none' },
                            flexGrow: 1,
                            fontFamily: 'monospace',
                            fontWeight: 700,
                            letterSpacing: '.3rem',
                            color: 'inherit',
                            textDecoration: 'none',
                        }}
                    >
                        LocPlanner
                    </Typography>
                    <Box
                        sx={{
                            flexGrow: 1,
                            display: { xs: 'none', md: 'flex' },
                        }}
                    >
                        {pages.map((page) => (
                            <Button
                                key={page.text}
                                onClick={handleCloseNavMenu}
                                sx={{ my: 2, color: 'white', display: 'block' }}
                                component={Link}
                                to={page.href}
                            >
                                {page.text}
                            </Button>
                        ))}
                    </Box>

                    {isLoggedIn && (
                        <>
                            <Typography
                                sx={{
                                    mr: 2,
                                    display: { xs: 'none', md: 'flex' },
                                    fontWeight: 700,
                                    color: 'inherit',
                                }}
                            >
                                Welcome back {userInfo.firstName}!
                            </Typography>

                            <Box sx={{ flexGrow: 0 }}>
                                <Tooltip title="Open settings">
                                    <IconButton
                                        onClick={handleOpenUserMenu}
                                        sx={{ p: 0 }}
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
                        </>
                    )}
                </Toolbar>
            </Container>
        </AppBar>
    )
}

export default ResponsiveAppBar
