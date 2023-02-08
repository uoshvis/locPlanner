import React, { useEffect, useState } from 'react'
import { useSelector, useDispatch } from 'react-redux'
import {
    DataGrid,
    gridPageCountSelector,
    gridPageSelector,
    useGridApiContext,
    useGridSelector,
    selectedGridRowsCountSelector,
} from '@mui/x-data-grid'
import Box from '@mui/material/Box'
import Button from '@mui/material/Button'
import Pagination from '@mui/material/Pagination'
import Grid from '@mui/material/Grid'
import {
    fetchEventsByLocation,
    filterEventsByLocation,
    setFormType,
    selectCurrentEvent,
    toggleShowModal,
    deleteEvents,
} from './eventsSlice'
import { EventForm } from './EventForm'

function CustomFooterComponent({ handleDeleteEvents }) {
    const apiRef = useGridApiContext()
    const page = useGridSelector(apiRef, gridPageSelector)
    const pageCount = useGridSelector(apiRef, gridPageCountSelector)
    const selectedCount = useGridSelector(apiRef, selectedGridRowsCountSelector)

    return (
        <Box sx={{ p: 1 }}>
            <Grid
                container
                direction="row"
                justifyContent="space-between"
                alignItems="center"
            >
                {
                    <Box sx={{ width: 150, p: 0 }}>
                        {selectedCount > 0
                            ? `${selectedCount} events selected`
                            : ''}
                    </Box>
                }
                <Button
                    variant="contained"
                    onClick={handleDeleteEvents}
                    disabled={selectedCount === 0}
                >
                    Delete
                </Button>
                <Pagination
                    color="primary"
                    count={pageCount}
                    page={page + 1}
                    onChange={(event, value) =>
                        apiRef.current.setPage(value - 1)
                    }
                />
            </Grid>
        </Box>
    )
}

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
            width: 300,
            type: 'dateTime',
        },
        { field: 'location', headerName: 'Location', width: 100 },
        {
            field: 'userFullName',
            headerName: 'User',
            width: 200,
        },
        {
            field: 'isCompleted',
            headerName: 'Completed',
            type: 'boolean',
            description: 'This column has a value getter and is not sortable.',
            width: 100,
        },
    ]

    return (
        <div>
            <h2>My Events</h2>

            <Box sx={{ height: 400, width: '100%' }}>
                <DataGrid
                    sx={{ width: '80%', margin: 'auto' }}
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
