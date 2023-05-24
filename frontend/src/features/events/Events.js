import React, { useEffect, useMemo, useState } from 'react'
import { useSelector } from 'react-redux'
import { DataGrid } from '@mui/x-data-grid'
import Box from '@mui/material/Box'
import CustomFooterComponent from './CustomFooter'
import { EventForm } from './EventForm'
import AlertDialog from '../../components/DeleteAlertDialog'
import {
    useDeleteEventsMutation,
    useGetEventsQuery,
} from '../../app/services/events'
import { useGetUsersQuery } from '../../app/services/users'

const columns = [
    { field: 'id', headerName: 'ID', width: 20 },
    { field: 'title', headerName: 'Title', width: 200 },
    {
        field: 'start',
        headerName: 'Start Date',
        width: 200,
        type: 'dateTime',
        valueFormatter: (params) =>
            new Date(params?.value).toLocaleString('lt-LT', {
                dateStyle: 'short',
                timeStyle: 'short',
            }),
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

const Events = () => {
    const user = useSelector((state) => state.auth.userInfo)
    const [open, setOpen] = useState(false)
    const [isDialogOpen, setDialogIsOpen] = useState(false)
    const [formType, setFormType] = useState('view') // 'view' |'add' | 'update'

    const [selectedIds, setSelectedIds] = useState(new Set())
    const [eventsFilter, setEventsFilter] = useState({ userId: user.id })
    const [eventData, setEventData] = useState({})

    const { data: users = [] } = useGetUsersQuery()
    const { data: events = [] } = useGetEventsQuery(eventsFilter)
    const [deleteEvents] = useDeleteEventsMutation()

    const adminRoles = ['admin', 'superAdmin']
    const adminPermission = adminRoles.includes(user.role)

    const sortedEvents = useMemo(() => {
        const sortedEvents = events.slice()
        sortedEvents.sort((a, b) => b.start.localeCompare(a.start))
        return sortedEvents
    }, [events])

    useEffect(() => {
        if (adminPermission) {
            // Admin get all events
            setEventsFilter({})
        }
    }, [adminPermission, user.id])

    function createData(events, user) {
        let eventsDataToDisplay = []

        if (user) {
            if (!adminPermission) {
                // Can be used to filter user events in frontend
                // eventsDataToDisplay = events.filter(
                //     (event) => event.userId === user.id
                // )
                eventsDataToDisplay = events.map((event) => ({
                    ...event,
                    userFullName: user.firstName + ' ' + user.lastName,
                }))
            } else {
                eventsDataToDisplay = events.map((event) => ({
                    ...event,
                    userFullName:
                        users.find((user) => user.id === event.userId)
                            .firstName +
                        ' ' +
                        users.find((user) => user.id === event.userId).lastName,
                }))
            }
        }
        return eventsDataToDisplay
    }

    const handleSelection = (selection) => {
        const selectedIds = new Set(selection)
        setSelectedIds(selectedIds)
    }
    const handleRowDoubleClick = ({ id }) => {
        const selectedEvent = events.find((event) => event.id === id)
        setFormType('update')
        setEventData(selectedEvent)
        setOpen((prevOpen) => !prevOpen)
    }
    const handleDeleteEvents = () => {
        const ids = Array.from(selectedIds)
        deleteEvents({ ids }).then(() => {
            setSelectedIds([])
        })
        setDialogIsOpen(false)
    }

    return (
        <div>
            <h2>My Events</h2>

            <Box sx={{ height: 700, width: '100%', m: 'auto' }}>
                <DataGrid
                    rows={createData(sortedEvents, user)}
                    columns={columns}
                    pageSize={10}
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

            {open && (
                <EventForm
                    open={open}
                    setOpen={setOpen}
                    formType={formType}
                    event={eventData}
                />
            )}

            {isDialogOpen && (
                <AlertDialog
                    isDialogOpen={isDialogOpen}
                    setDialogIsOpen={setDialogIsOpen}
                    onDelete={handleDeleteEvents}
                />
            )}
        </div>
    )
}

export default Events
