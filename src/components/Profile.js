import React, { useEffect } from "react";
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

let renderCount = 0


function Input( {control, name, label, readOnly, id, maxLength=20 }) { 
    const {
        field,
        fieldState: { invalid, isTouched, isDirty, error },
        formState: { touchedFields, dirtyFields }
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
    const [user, setUser] =React.useState({})
    const { userDetails } = useSelector(state => state.auth)
    const { register, handleSubmit, reset, setValue, formState, watch, clearErrors, control,
        formState: { isSubmitSuccessful, errors } } = useForm({
            // mode: 'onChange',
            // https://stackoverflow.com/questions/62242657/how-to-change-react-hook-form-defaultvalue-with-useeffect
            // defaultValues: useMemo(() => {
            //     return userDetails
            // }, [userDetails])
            defaultValues: user,
            values: userDetails

        });
    const [readOnly, setReadOnly] = React.useState(true)
    const [anchorEl, setAnchorEl] = React.useState(null);
    const open = Boolean(anchorEl);
    const id = open ? 'color-popover' : undefined;

    const watchColor = watch("userColor", '');

    // ToDo reset fields if error
    // ToDo do I need below ????
    useEffect(() => {
        if(userDetails) {
            setUser({...userDetails})
        } 
    }, [userDetails]);
    
    //   https://stackoverflow.com/questions/64306943/defaultvalues-of-react-hook-form-is-not-setting-the-values-to-the-input-fields-i
    // ToDo values reset after unsuccessful submit
    useEffect(() => {
        if (formState.isSubmitSuccessful) {
            reset(userDetails)
        }
    }, [formState.isSubmitSuccessful, reset, userDetails])


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


    console.log('Renders:', renderCount++)

    console.log(watch())

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

            </Box>
        
        </Container>
    );
  }

  export default Profile