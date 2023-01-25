import React from "react";
import {  MenuItem, TextField } from "@mui/material";
import { Controller } from "react-hook-form";


export const UserSelectDropdown = ({name, control, label, usersList, disabled}) => {

    const generateSingleOptions = (usersList) => {
        console.log("🚀 ~ file: UserSelectDropdown.js:17 ~ returnusersList.map ~ user", usersList[0]+"")
        return usersList.map((user) => {
            
            return (
                <MenuItem key={user.id} value={user.id}>
                    { user.firstName + ' ' + user.lastName }
                </MenuItem>
            );
        });
    };

    return (
        <Controller
            control={control}
            name={name}
            rules={{
                required: "Please select user"
            }}
            render={({ field: { onChange, value, ref }, fieldState: {error}}) => (
                <TextField
                    onChange={onChange}
                    value={value}
                    ref={ref}
                    label={label}
                    id="outlined-select-location"
                    select
                    error={!!error}
                    helperText={error?.message}
                    disabled={disabled}
                >
                    {generateSingleOptions(usersList)}
                </TextField>
            )}
        />
    );
};