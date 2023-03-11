import React, { useEffect, useState } from 'react'
import { useSelector, useDispatch } from 'react-redux'
import { DataGrid } from '@mui/x-data-grid'
import Box from '@mui/material/Box'
import CustomFooterComponent from './CustomFooter'
import {
    fetchEventsByLocation,
    filterEventsByLocation,
    setFormType,
    selectCurrentEvent,
    toggleShowModal,
    deleteEvents,
} from './eventsSlice'
import { EventForm } from './EventForm'
import { fetchUsers } from '../users/usersSlice'
import AlertDialog from '../../components/DeleteAlertDialog'

const Events = () => {
    const dispatch = useDispatch()
    const events = useSelector((state) => filterEventsByLocation(state, 'all'))
    const user = useSelector((state) => state.auth.userInfo)
    const open = useSelector((state) => state.calendar.showModal)
<<<<<<< HEAD:src/features/events/Events.js
    const users = useSelector((state) => state.users)
    const [isDialogOpen, setDialogIsOpen] = useState(false)

||||||| d0ae4e2:src/features/events/Events.js
=======
    const users = useSelector((state) => state.users.items)
    const [isDialogOpen, setDialogIsOpen] = useState(false)

>>>>>>> development:frontend/src/features/events/Events.js
    const [selectedIds, setSelectedIds] = useState(new Set())
    const adminRoles = ['admin', 'superAdmin']
    const adminPermission = adminRoles.includes(user.role)

    // https://stackoverflow.com/questions/67100027/dispatch-multiple-async-actions-with-redux-toolkit
    useEffect(() => {
        if (adminPermission) {
            dispatch(fetchUsers())
        }
    }, [dispatch, adminPermission])

    useEffect(() => {
        dispatch(fetchEventsByLocation('all'))
    }, [dispatch])

    function createData(events, userId) {
        let userEvents = []

        if (user) {
            if (!adminPermission) {
                userEvents = events.filter((event) => event.userId === user.id)
                userEvents = userEvents.map((event) => ({
                    ...event,
                    userFullName: user.firstName + ' ' + user.lastName,
                }))
                return userEvents
            } else {
                userEvents = events.map((event) => ({
                    ...event,
                    userFullName:
                        users.find((user) => user.id === event.userId)
                            .firstName +
                        ' ' +
                        users.find((user) => user.id === event.userId).lastName,
                }))
            }
        }
        return userEvents
    }

    const handleSelection = (selection) => {
        const selectedIds = new Set(selection)
        setSelectedIds(selectedIds)
    }
    const handleRowDoubleClick = ({ id }) => {
        const selectedEvent = events.find((event) => event.id === id)
        dispatch(setFormType('update'))
        dispatch(selectCurrentEvent(selectedEvent))
        dispatch(toggleShowModal())
    }
    const handleDeleteEvents = () => {
        const idsString = [...selectedIds].join(';')
        dispatch(deleteEvents(idsString)).then(() => {
            setSelectedIds([])
        })
        setDialogIsOpen(false)
    }

    const columns = [
        { field: 'id', headerName: 'ID', width: 20 },
        { field: 'title', headerName: 'Title', width: 200 },
        {
            field: 'start',
            headerName: 'Start Date',
            width: 200,
            type: 'dateTime',
        },
        { field: 'location', headerName: 'Location', width: 80 },
        {
            field: 'userFullName',
            headerName: 'User',
            width: 150,
        },
        {
            field: 'isCompleted',
            headerName: 'Completed',
            type: 'boolean',
            description: 'This column has a value getter and is not sortable.',
            width: 90,
        },
    ]

    return (
        <div>
<<<<<<< HEAD:src/features/events/Events.js
            {isDialogOpen && (
                <AlertDialog
                    isDialogOpen={isDialogOpen}
                    setDialogIsOpen={setDialogIsOpen}
                    onDelete={handleDeleteEvents}
                />
            )}
            <h2>My Events</h2>
||||||| d0ae4e2:src/features/events/Events.js
            <h2>My Events</h2>

=======
            <AlertDialog
                isDialogOpen={isDialogOpen}
                setDialogIsOpen={setDialogIsOpen}
                onDelete={handleDeleteEvents}
            />

            <h2>My Events</h2>
>>>>>>> development:frontend/src/features/events/Events.js
            <Box sx={{ height: 700, width: 840, m: 'auto' }}>
                <DataGrid
                    rows={createData(events, user)}
                    columns={columns}
                    pageSize={5}
                    rowsPerPageOptions={[5]}
                    pagination
                    checkboxSelection
                    disableSelectionOnClick
                    onSelectionModelChange={handleSelection}
                    onRowDoubleClick={handleRowDoubleClick}
                    components={{
                        Footer: CustomFooterComponent,
                    }}
                    componentsProps={{
                        footer: { setDialogIsOpen },
                    }}
                />
            </Box>

            {open && <EventForm open={open} />}
        </div>
    )
}

export default Events
