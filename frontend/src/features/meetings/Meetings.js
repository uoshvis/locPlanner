import React, { useState } from 'react'
import { DataGrid } from '@mui/x-data-grid'
import Box from '@mui/material/Box'
import { useGetMeetingsQuery } from '../../app/services/meetings'
import MeetingFormDialog from './MeetingFormDialog'

const { useEffect } = React

const columns = [
    { field: 'id', headerName: 'ID', width: 70 },
    {
        field: 'fullName',
        headerName: 'Full name',
        description: 'This column has a value getter and is not sortable.',
        sortable: false,
        width: 160,
        valueGetter: (params) =>
            `${params.row.firstName || ''} ${params.row.lastName || ''}`,
    },
    {
        field: 'personalId',
        headerName: 'Personal ID',
        type: 'number',
        width: 130,
    },

    {
        field: 'meetingDate',
        headerName: 'Date of Meeting',
        type: 'date',
        width: 130,
    },
    {
        field: 'md',
        headerName: 'MD',
        width: 160,
    },
    {
        field: 'firstDate',
        headerName: 'First Meeting',
        type: 'date',
        width: 130,
    },
]
function Meetings() {
    // Using a query hook automatically fetches data and returns query values
    const { data: meetings = [], error, isLoading } = useGetMeetingsQuery()
    const [rows, setRows] = useState([])

    useEffect(() => {
        if (meetings) {
            setRows(meetings)
        }
    }, [error, isLoading, meetings])

    return (
        <div>
            <h2>Meetings</h2>
            <MeetingFormDialog />
            <Box
                sx={{
                    height: 700,
                    width: '100%',
                    m: 'auto',
                }}
            >
                <DataGrid
                    rows={rows}
                    columns={columns}
                    pageSize={10}
                    rowsPerPageOptions={[5, 10]}
                    checkboxSelection
                    sortModel={[{ field: 'id', sort: 'desc' }]}
                />
            </Box>
        </div>
    )
}

export default Meetings
