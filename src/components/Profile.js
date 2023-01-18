import React from "react";
import { useSelector, useDispatch } from "react-redux";
import { Controller, useController, useForm } from "react-hook-form";
import { CirclePicker } from 'react-color';

import Container from '@mui/material/Container';
import Box from '@mui/material/Box';
import TextField from '@mui/material/TextField';
import Card from '@mui/material/Card';
import Popover from '@mui/material/Popover';
import Typography from '@mui/material/Typography';
import CardActions from '@mui/material/CardActions';
import CardContent from '@mui/material/CardContent';
import Button from "@mui/material/Button";

import { updateUser } from "../features/auth/authSlice";


function Input( {control, name, label, readOnly, id, maxLength=20 }) { 
    const {
        field,
        fieldState: { error }
    } = useController({
        name,
        control,
        rules: { required: 'Required', maxLength: {
            value: maxLength, 
            message: `Too long.. Max ${maxLength}`} },
    })

    return (
        <TextField 
            onChange={field.onChange} // send value to hook form 
            onBlur={field.onBlur} // notify when input is touched/blur
            value={field.value || ''} // input value
            name={field.name} // send down the input name
            inputRef={field.ref} // send input ref, so we can focus on input when error appearhelperText
            id={id}
            label={label}
            error={Boolean(error)}
            helperText={error?.message}
            InputProps={{
                        readOnly
                    }}
            // InputLabelProps={{ shrink: true }}  
        />
    )
}  


function Profile() {
    const dispatch = useDispatch()
    const { userDetails } = useSelector(state => state.auth)
    const { handleSubmit, reset, setValue, watch, control } = useForm({
            defaultValues: {
                'userName': '',
                'firstName': '',
                'lastName': '',
                'userColor': ''
            },
            values: userDetails

        });

    const watchColor = watch("userColor", '');
    const [readOnly, setReadOnly] = React.useState(true)
    const [anchorEl, setAnchorEl] = React.useState(null);
    const open = Boolean(anchorEl);
    const id = open ? 'color-popover' : undefined;
     

    const handleColorChangeSubmit =() => {
        setAnchorEl(null)
    }

    const onSaveSubmit = (data) => {
        dispatch(updateUser(data))
            .unwrap()
            .then(() => {
                reset()
                setReadOnly(true)
            })
            .catch(() => {
                reset(userDetails)
            })
    }

    const handleClick = (event) => {
      setAnchorEl(event.currentTarget);
    };
  
    const handleClose = () => {
      setAnchorEl(null);
    }; 

    const handleCancel = () => {
        reset()
        setReadOnly(true)
    }


    return (
        <Container maxwidth="xs">
            <Box
                component="form"
                onSubmit={handleSubmit(onSaveSubmit)}
                sx={{
                    '& > :not(style)': { m: 1, width: '25ch' },                
                    display: 'flex',
                    flexDirection: 'column',
                    alignItems: 'center',
                    m: 5,
                }}
                noValidate
                autoComplete="off"
            >
                <Input
                    control={control}
                    name='userName'
                    label='User Name'
                    id="userName"
                    readOnly={readOnly}
                    maxLength={15}
                />
                <Input
                    control={control}
                    name='firstName'
                    label='First Name'
                    id="firstName"
                    readOnly={readOnly}
                />
                <Input
                    control={control}
                    name='lastName'
                    label='Last Name'
                    id="lastName"
                    readOnly={readOnly}
                />


                <Button aria-describedby={id}
                    required
                    name="color"
                    variant="contained"  
                    sx={{
                        "&.Mui-disabled": {
                        background: watchColor,
                        color: "#fff"
                        },
                        backgroundColor: watchColor,
                        "&.MuiButton-root:hover": {
                            background: watchColor
                        }
                    }}
                    onClick={handleClick}
                    disabled={readOnly}
                    >
                    Your color
                </Button>

                <Popover
                    id={id}
                    open={open}
                    anchorEl={anchorEl}
                    onClose={handleClose}
                    anchorOrigin={{
                        vertical: 'bottom',
                        horizontal: 'left',
                    }}
                >
                    <Card sx={{ minWidth: 275 }}>
                        <CardContent>
                            <Typography sx={{ fontSize: 14 }} color="text.secondary" gutterBottom>
                                Select your color
                            </Typography>

                            <Controller
                                control={control}
                                name="userColor"
                                render={({ field: { onChange, value, name } }) => (
                                    <CirclePicker
                                        color={value}
                                        onChange={(e) => setValue(name, e.hex) }
                                    />                          
                                )}
                            />
                        </CardContent>
                        <CardActions sx={{ justifyContent: "center" }}>
                            <Button size="small" onClick={handleColorChangeSubmit}>
                                Ok
                            </Button>
                        </CardActions>
                    </Card>
                </Popover>    

            <Button disabled={!readOnly} onClick={() => setReadOnly(prev => !prev)}>Edit</Button>
            
            <Button type="submit" disabled={readOnly}>Save</Button>

            <Button disabled={readOnly} onClick={handleCancel}>Cancel</Button>

            </Box>
        
        </Container>
    );
  }


  export default Profile