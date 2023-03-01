import React from 'react'
import { NavLink } from 'react-router-dom'
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
        text: 'Users',
        to: 'users',
    },
    {
        text: 'About',
        to: 'about',
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
                {menuItemsData.map((menuItem, idx) => (
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
