import React from 'react'
import { Link, Outlet } from 'react-router-dom'
import { styled } from '@mui/material/styles'
import Box from '@mui/material/Box'
import Paper from '@mui/material/Paper'
import Grid from '@mui/material/Grid'
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
const Item = styled(Paper)(({ theme }) => ({
    backgroundColor: theme.palette.mode === 'dark' ? '#1A2027' : '#fff',
    ...theme.typography.body2,
    padding: theme.spacing(1),
    textAlign: 'center',
    color: theme.palette.text.secondary,
    height: '100%',
}))

const DashboardMenuItem = ({
    selectedIndex,
    onListItemClick,
    menuIdex,
    text = '',
    to = '',
}) => (
    <ListItem>
        <ListItemButton
            selected={selectedIndex === menuIdex}
            onClick={() => onListItemClick(menuIdex)}
            component={Link}
            to={to}
        >
            <ListItemText primary={text} />
        </ListItemButton>
    </ListItem>
)

function MenuItems() {
    const [selectedIndex, setSelectedIndex] = React.useState()

    const handleListItemClick = (index) => {
        setSelectedIndex(index)
    }

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
                        selectedIndex={selectedIndex}
                        onListItemClick={handleListItemClick}
                        menuIdex={idx}
                        text={menuItem.text}
                        to={menuItem.to}
                    />
                ))}
            </List>
        </Box>
    )
}

function DashboardStyleLayout() {
    return (
        <Box sx={{ flexGrow: 1 }}>
            <Grid container spacing={0}>
                <Grid item xs={2}>
                    <Item>
                        <MenuItems />
                    </Item>
                </Grid>
                <Grid item xs={10}>
                    <Item>
                        <Outlet />
                    </Item>
                </Grid>
            </Grid>
        </Box>
    )
}

export default DashboardStyleLayout
