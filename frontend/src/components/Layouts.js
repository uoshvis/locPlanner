import React from 'react'
import { Outlet } from 'react-router-dom'
import { styled } from '@mui/material/styles'
import Box from '@mui/material/Box'
import Paper from '@mui/material/Paper'
import Grid from '@mui/material/Grid'
import MenuItems from './MenuItems'
import Navbar from './Navbar'

const Item = styled(Paper)(({ theme }) => ({
    backgroundColor: theme.palette.mode === 'dark' ? '#1A2027' : '#fff',
    ...theme.typography.body2,
    padding: theme.spacing(1),
    textAlign: 'center',
    color: theme.palette.text.secondary,
    height: '100%',
}))

export function AppLayout() {
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

export function MainLayout() {
    return (
        <div>
            <Navbar />
            <Outlet />
        </div>
    )
}

export default AppLayout
