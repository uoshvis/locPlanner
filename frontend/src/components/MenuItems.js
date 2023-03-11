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
        disabled: false,
    },
    {
        text: 'Events',
        to: 'events',
        disabled: false,
    },
    {
        text: 'Meetings',
        to: 'meetings',
        disabled: false,
    },
    {
        text: 'Users',
        to: 'users',
        disabled: true,
    },

    {
        text: 'About',
        to: 'about',
        disabled: false,
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

const DashboardMenuItem = ({ text, to, disabled }) => (
    <ListItem>
        <ListItemButton component={CustomNavLink} to={to} disabled={disabled}>
            <ListItemText primary={text} />
        </ListItemButton>
    </ListItem>
)

function MenuItems() {
    const [menuList, setMenuList] = useState(menuItemsData)
    const { userInfo } = useSelector((state) => state.auth)

    useEffect(() => {
        if (['admin', 'superAdmin'].includes(userInfo.role)) {
            const adminMenu = menuItemsData.map((item) => {
                if (item.to === 'users') {
                    return { ...item, disabled: false }
                } else {
                    return item
                }
            })
            setMenuList(adminMenu)
        }
    }, [userInfo.role])

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
                        disabled={menuItem.disabled}
                    />
                ))}
            </List>
        </Box>
    )
}

export default MenuItems
