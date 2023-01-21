import React, { useEffect, useState } from "react";
import { FormControl, InputLabel, MenuItem, Select } from "@mui/material";
import { Controller } from "react-hook-form";
import { useSelector } from 'react-redux';


export const UserSelectDropdown = ({name, control, label, setValue}) => {

    const { userDetails, userInfo } = useSelector(state => state.auth)
    const users = useSelector(state => state.users)
    const [usersList, setUsersList] = useState([])
    
    useEffect(() => {
        if(userInfo.roles.includes('admin')) {
            setUsersList(users)
        } else {
            setValue('userId', userDetails.id)
            setUsersList([userDetails])
        }
    },[ userDetails,userInfo, users, setValue ])
          
    const generateSingleOptions = (usersList) => {
        return usersList.map((user) => {
            return (
                <MenuItem key={user.id} value={user.id}>
                    { user.firstName + ' ' + user.lastName }
                </MenuItem>
            );
        });
    };

    return (
        <FormControl fullWidth>  
            <InputLabel>{label}</InputLabel>
            <Controller
                control={control}
                name={name}
                render={({ field: { onChange, value } }) => (
                    <Select 
                        onChange={onChange}
                        value={value}
                        disabled={usersList.length === 1}
                        label={label}
                    >
                        {generateSingleOptions(usersList)}
                    </Select>
            )}
        />
        </FormControl>
    );
};