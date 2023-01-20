import * as React from 'react';
import { FormControl, InputLabel, MenuItem, Select } from "@mui/material";
import { Controller } from "react-hook-form";

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
        <MenuItem key={option.value} value={option.value} disabled={option.disabled}>
          {option.label}
        </MenuItem>
      );
    });
  };

  return (
    <FormControl fullWidth>
  
      <InputLabel>{label}</InputLabel>
      <Controller
        render={({ field: { onChange, value } }) => (
          <Select onChange={onChange} value={value}>
            {generateSingleOptions()}
          </Select>
        )}
        control={control}
        name={name}
      />
    </FormControl>
  );
};