import React from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { fetchMeetings } from './meetingsSlice'
import { DataGrid } from '@mui/x-data-grid'
import Box from '@mui/material/Box'

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
    const dispatch = useDispatch()
    const rows = useSelector((state) => state.meetings)

    useEffect(() => {
        dispatch(fetchMeetings())
    }, [dispatch])

    return (
        <Box
            sx={{
                height: 700,
                width: 840,
                pt: 2,
                m: 'auto',
            }}
        >
            <h2>Meetings</h2>
            <DataGrid
                rows={rows}
                columns={columns}
                pageSize={10}
                rowsPerPageOptions={[5]}
                checkboxSelection
                sortModel={[{ field: 'id', sort: 'desc' }]}
            />
        </Box>
    )
}

export default Meetings
