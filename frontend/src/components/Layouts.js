import React from 'react'
import { Outlet } from 'react-router-dom'
import ResponsiveDrawer from './ResponsiveDrawer'

export function AppLayout() {
    return <Outlet />
}

export function MainLayout() {
    return <ResponsiveDrawer />
}
