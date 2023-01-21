import * as React from 'react';
import { Controller } from "react-hook-form";
import { MenuItem, TextField } from "@mui/material";


const options = [
    {
        label: "Location 1",
        value: "loc1",
    },
    {
        label: "Location 2",
        value: "loc2",
    },  
];

export const LocationInputDropDown = ({name, control, label}) => {

    const generateSingleOptions = () => {
        return options.map((option) => {
            return (
            <MenuItem key={option.value} value={option.value}>
                {option.label}
            </MenuItem>
            );
        });
    };
    // https://stackoverflow.com/questions/56122219/in-mui-when-do-we-use-input-vs-textfield-for-building-a-form/69416366?answertab=trending#tab-top
    return (
        <Controller
            control={control}
            name={name}
            render={({ field: { onChange, value } }) => (
                <TextField
                    id="outlined-select-location"
                    select
                    label="Location"
                    value={value}
                    onChange={onChange}
                    // defaultValue="EUR"
                    // helperText="Please select location"
                    >
                    {generateSingleOptions()}
                </TextField>
            )}
        />
    );
};
