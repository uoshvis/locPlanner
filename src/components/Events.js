import React, { useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";
import {
    useQueryParams,
    StringParam,
    BooleanParam,
    withDefault,
    } from 'use-query-params';
import List from '@mui/material/List';
import ListItem from '@mui/material/ListItem';
import Checkbox from '@mui/material/Checkbox';
import { fetchEventsByLocation } from "../features/calendar/calendarSlice";
import { filterEventsByLocation } from "../features/calendar/calendarSlice";
import { fetchUsers } from "../features/users/usersSlice";

 
const bySearch = (search) => (event) =>
  event.title
    .toLowerCase()
    .includes((search.title || '').toLowerCase())
    && event.isCompleted === search.isCompleted;


const Events = ({ handleUserItemClick}) => {
    //  redux part
    const dispatch = useDispatch()
    const events = useSelector(state => filterEventsByLocation(state, 'all'))
    useEffect(() => {
        // https://github.com/facebook/react/issues/14326
        let didCancel = false

        async function fetchAPI() {
            try {
                await dispatch(fetchEventsByLocation('all')).unwrap()
            }
            catch {
                // error catched in reject case
                // swallow error
            }
            if (!didCancel) {}           
            
        }
        fetchAPI()

        return () => {didCancel = true}
           
    }, [dispatch,])
    
    useEffect(() => {
        let didCancel = false

        async function dofetchUsers() {
            try {
                await dispatch(fetchUsers()).unwrap()
            }
            catch {
                // error catched in reject case
                // swallow error
            }
            if (!didCancel) {}
        }
        dofetchUsers()

        return () => {didCancel = true}
           
    }, [dispatch, ]) 
    // End of redux part

    const handleTitle = (event) => {
        setSearch({ title: event.target.value });
      };

    const handleIsCompleted = (event) => {
        setSearch({ isCompleted: event.target.checked });
    };

    const [search, setSearch] = useQueryParams({
        title: withDefault(StringParam, ''),
        isCompleted: withDefault(BooleanParam, false),
    });

    const label = { inputProps: { 'aria-label': "Is Completed?" } };

    return (
        <>
            <h2>Events</h2>
            
            <input
                type="text"
                value={search.title}
                onChange={handleTitle}
            />
            

            <br/>
            Completed

            <Checkbox {...label}
                value={search.isCompleted}
                onChange={handleIsCompleted}
            />
                
            <List>
                {events
                .filter(bySearch(search))
                .map((event) => (
                    <ListItem key={event.id} onClick={handleUserItemClick}>
                           {event.id} - {event.title} - {event.location} - {event.userId} - {String(event.isCompleted)}
                    </ListItem>               
                ))}
            </List>
        </>
    )
}

export default Events