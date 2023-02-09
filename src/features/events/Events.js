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

const Events = () => {
    const dispatch = useDispatch()
    const events = useSelector((state) => filterEventsByLocation(state, 'all'))
    const user = useSelector((state) => state.auth.userDetails)
    const open = useSelector((state) => state.calendar.showModal)
    const [selectedIds, setSelectedIds] = useState(new Set())

    // https://stackoverflow.com/questions/67100027/dispatch-multiple-async-actions-with-redux-toolkit
    useEffect(() => {
        dispatch(fetchEventsByLocation('all'))
    }, [dispatch])

    function createData(events, userId) {
        let userEvents = []
        if (user) {
            userEvents = events.filter((event) => event.userId === user.id)
            userEvents = userEvents.map((event) => ({
                ...event,
                userFullName: user.firstName + ' ' + user.lastName,
            }))
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
            <h2>My Events</h2>

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
                        footer: { handleDeleteEvents },
                    }}
                />
            </Box>

            {open && <EventForm open={open} />}
        </div>
    )
}

export default Events
