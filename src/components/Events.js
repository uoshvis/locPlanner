import React, { useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";
import { fetchEventsByLocation } from "../features/calendar/calendarSlice";
import { filterEventsByLocation } from "../features/calendar/calendarSlice";
import { fetchUsers } from "../features/users/usersSlice";

import { DataGrid } from '@mui/x-data-grid/';
import Box from "@mui/material/Box";

 
const Events = ({ handleUserItemClick}) => {
    //  redux part
    const dispatch = useDispatch()
    const events = useSelector(state => filterEventsByLocation(state, 'all'))
    // ToDo filter events by user
    // ToDo userId as current user all events for administrator
    // UserId as authenticated userId
    const user = useSelector(state => state.auth.userDetails)
    // ToDo add remove selected events
    const [selectedIds, setSelectedIds] = React.useState(new Set())


    // https://stackoverflow.com/questions/67100027/dispatch-multiple-async-actions-with-redux-toolkit
    useEffect(() => {     
        dispatch(fetchEventsByLocation('all'))
        dispatch(fetchUsers())
    }, [dispatch])


    function createData(events, userId) {
        let userEvents = []
        if(user) {
            userEvents = events.filter(event => event.userId === user.id)
            userEvents = userEvents.map(event => ({
                ...event,
                userFullName: user.firstName + ' ' + user.lastName
                })        
            )
        }
        return userEvents
    }

    const handleSelection = (ids) => {
        const selectedIds = new Set(ids)
        setSelectedIds(selectedIds)
    }

    const columns = [
        { field: 'id', headerName: 'ID', width: 20 },
        { field: 'title', headerName: 'Title', width: 200 },
        { field: 'start', headerName: 'Start Date', width: 300, type: 'dateTime' },
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
      ];

      
    return (
        <div>
            <h2>My Events</h2>

            <Box sx={{height: 400}}>
                <DataGrid
                    sx = {{width: '80%', margin: 'auto'}}
                    rows={createData(events, user)}
                    columns={columns}
                    pageSize={5}
                    rowsPerPageOptions={[5]}
                    checkboxSelection
                    onSelectionModelChange = { handleSelection }
                />
            </Box>    
        </div>
    )
}

export default Events