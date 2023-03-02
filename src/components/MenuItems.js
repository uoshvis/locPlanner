import React, { useEffect, useState } from 'react'
import { NavLink } from 'react-router-dom'
import { useSelector } from 'react-redux'
import Box from '@mui/material/Box'
import List from '@mui/material/List'
import ListItem from '@mui/material/ListItem'
import ListItemButton from '@mui/material/ListItemButton'
import ListItemText from '@mui/material/ListItemText'

const menuItemsData = [
    {
        text: 'Calendar',
        to: 'calendar',
    },
    {
        text: 'Events',
        to: 'events',
    },
    {
        text: 'Meetings',
        to: 'meetings',
    },

    {
        text: 'About',
        to: 'about',
    },
]

const adminMenuItems = [
    {
        text: 'Users',
        to: 'users',
    },
]

// https://stackoverflow.com/questions/71350481/react-router-dom-v6-navlink-and-mui-listitem-not-working-with-classname?answertab=trending#tab-top

const CustomNavLink = React.forwardRef((props, ref) => (
    <NavLink
        ref={ref}
        {...props}
        className={({ isActive }) =>
            isActive ? props.className + ' Mui-selected' : props.className
        }
    />
))

const DashboardMenuItem = ({ text, to }) => (
    <ListItem>
        <ListItemButton component={CustomNavLink} to={to}>
            <ListItemText primary={text} />
        </ListItemButton>
    </ListItem>
)

function MenuItems() {
    const [menuList, setMenuList] = useState(menuItemsData)
    const user = useSelector((state) => state.users.userDetails)

    useEffect(() => {
        if (['admin', 'superAdmin'].includes(user.role)) {
            const adminMenu = [
                ...menuItemsData.slice(0, 3),
                ...adminMenuItems,
                ...menuItemsData.slice(3),
            ]
            setMenuList([...adminMenu])
        }
    }, [user.role])

    return (
        <Box
            sx={{
                width: '100%',
                maxWidth: 360,
                height: '100%',
                bgcolor: 'background.paper',
            }}
        >
            <List component="nav" aria-label="menu nav items">
                {menuList.map((menuItem, idx) => (
                    <DashboardMenuItem
                        key={idx}
                        text={menuItem.text}
                        to={menuItem.to}
                    />
                ))}
            </List>
        </Box>
    )
}

export default MenuItems
