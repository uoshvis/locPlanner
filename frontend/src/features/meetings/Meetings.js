import React, { useState } from 'react'
import { DataGrid } from '@mui/x-data-grid'
import Box from '@mui/material/Box'
import Stack from '@mui/material/Stack'
import { useGetMeetingsQuery } from '../../app/services/meetings'
import MeetingUptadeDialog from './MeetingUptadeDialog'
import MeetingFormDialog from './MeetingFormDialog'
import { CircularIndeterminate } from '../../components/Spinners'

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
        valueFormatter: (params) =>
            new Date(params?.value).toLocaleDateString('lt-LT'),
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
        valueFormatter: (params) =>
            new Date(params?.value).toLocaleDateString('lt-LT'),
    },
]

function Meetings() {
    const { data: meetings = [] } = useGetMeetingsQuery()
    // const [formType, setFormType] = useState('view') // 'add' | 'update'
    const [meetingData, setMeetingData] = useState({})
    const [open, setOpen] = useState(false)

    const handleRowDoubleClick = ({ id }) => {
        const selecteditem = meetings.find((item) => item.id === id)
        // setFormType('update')
        setMeetingData(selecteditem)
        setOpen((prevOpen) => !prevOpen)
    }
    return (
        <div>
            <h2>Meetings</h2>

            <MeetingFormDialog />

            <MeetingUptadeDialog
                open={open}
                setOpen={setOpen}
                meetingData={meetingData}
            />

            <Box
                sx={{
                    height: 700,
                    width: '100%',
                    m: 'auto',
                }}
            >
                <DataGrid
                    rows={meetings}
                    columns={columns}
                    pageSize={10}
                    rowsPerPageOptions={[5, 10]}
                    disableSelectionOnClick
                    onRowDoubleClick={handleRowDoubleClick}
                    sortModel={[{ field: 'id', sort: 'desc' }]}
                    components={{
                        NoRowsOverlay: () => (
                            <Stack
                                height="100%"
                                alignItems="center"
                                justifyContent="center"
                            >
                                <CircularIndeterminate />
                            </Stack>
                        ),
                        NoResultsOverlay: () => (
                            <Stack
                                height="100%"
                                alignItems="center"
                                justifyContent="center"
                            >
                                Local filter returns no result
                            </Stack>
                        ),
                    }}
                />
            </Box>
        </div>
    )
}

export default Meetings
