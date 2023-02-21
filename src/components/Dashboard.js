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

const Item = styled(Paper)(({ theme }) => ({
    backgroundColor: theme.palette.mode === 'dark' ? '#1A2027' : '#fff',
    ...theme.typography.body2,
    padding: theme.spacing(1),
    textAlign: 'center',
    color: theme.palette.text.secondary,
    height: '100%',
}))

function MenuItems() {
    const [selectedIndex, setSelectedIndex] = React.useState()

    const handleListItemClick = (event, index) => {
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
            <List component="nav" aria-label="secondary mailbox folder">
                <ListItem>
                    <ListItemButton
                        selected={selectedIndex === 0}
                        onClick={(event) => handleListItemClick(event, 0)}
                        component={Link}
                        to={'users'}
                    >
                        <ListItemText primary="Users" />
                    </ListItemButton>
                </ListItem>
                <ListItem>
                    <ListItemButton
                        selected={selectedIndex === 1}
                        onClick={(event) => handleListItemClick(event, 1)}
                        component={Link}
                        to={'info'}
                    >
                        <ListItemText primary="Info" />
                    </ListItemButton>
                </ListItem>
            </List>
        </Box>
    )
}

function DashboardLayout() {
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

export default DashboardLayout
