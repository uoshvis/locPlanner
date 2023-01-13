import React, { useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";
import { useForm } from "react-hook-form";
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


function Profile() {
    const dispatch = useDispatch()
    const [user, setUser] =React.useState({})
    const { userDetails } = useSelector(state => state.auth)
    const { register, handleSubmit, reset, clearErrors, formState: { errors } } = useForm({
        mode: 'onChange',

        // https://stackoverflow.com/questions/62242657/how-to-change-react-hook-form-defaultvalue-with-useeffect
        // defaultValues: useMemo(() => {
        //     return userDetails
        // }, [userDetails])
        defaultValues: userDetails
    });
    const [readOnly, setReadOnly] = React.useState(true)
    const [color, setColor] = React.useState('')
    const [anchorEl, setAnchorEl] = React.useState(null);
    const open = Boolean(anchorEl);
    const id = open ? 'color-popover' : undefined;

    useEffect(() => {
        if (userDetails) {
            setColor(userDetails.userColor)
            setUser({...userDetails})
        }
      }, [setColor, userDetails]);
    
    //   https://stackoverflow.com/questions/64306943/defaultvalues-of-react-hook-form-is-not-setting-the-values-to-the-input-fields-i
    useEffect(() => {
        reset(user)
    }, [reset, user])

    const handleColorChange = (color, event) => {
        setColor(color.hex)
        // ToDo control by use form?
        setUser({...user, userColor: color.hex})
    }

    const handleColorChangeSubmit =() => {
        setAnchorEl(null)
    }

    const onSaveSubmit = (data) => {
        dispatch(updateUser(data))
        setReadOnly(true)
    }

    const handleClick = (event) => {
      setAnchorEl(event.currentTarget);
    };
  
    const handleClose = () => {
      setAnchorEl(null);
    }; 

    const handleChange = (e) => {
        const id = e.target.id
        const value = e.target.value
        clearErrors(id)
        setUser((prev) =>({
            ...prev,
            [id]: value
        }))
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
                <TextField
                    id="userName"
                    required
                    error={Boolean(errors.userName)}
                    helperText={errors.userName?.message}
                    label="Username"
                    {...register("userName", { required: "Username Required", maxLength: 20,})}
                    value={user.userName || ''}
                    onChange={handleChange}
                    variant="filled"
                    InputProps={{
                        readOnly
                    }}
                />

                <TextField
                    id="firstName"
                    required
                    error={Boolean(errors.firstName)}
                    helperText={errors.firstName?.message}
                    label="First name"
                    {...register('firstName', { required: "First Name Required" })}
                    value={user.firstName || ''}
                    onChange={handleChange}
                    variant="filled"
                    InputProps={{
                        readOnly
                    }}
                />

                <TextField
                    id="lastName"
                    error={Boolean(errors.lastName)}
                    helperText={errors.lastName?.message}
                    required
                    label="Last name"
                    {...register('lastName', { required: "Last Name Required" })}
                    value={user.lastName || ''}
                    onChange={handleChange}
                    variant="filled"
                    InputProps={{
                        readOnly
                    }}
                />

                <Button aria-describedby={id}
                    required
                    name="color"
                    variant="contained"  
                    sx={{
                        "&.Mui-disabled": {
                        background: color,
                        color: "#fff"
                        },
                        backgroundColor: color,
                        "&.MuiButton-root:hover": {
                            background: color
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

                            <CirclePicker
                                color={color}
                                onChange={handleColorChange}
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

            </Box>
        
        </Container>
    );
  }

  export default Profile