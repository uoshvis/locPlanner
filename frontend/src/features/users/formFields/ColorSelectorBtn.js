import React, { useState } from 'react'
import { Controller } from 'react-hook-form'
import { CirclePicker } from 'react-color'

import Button from '@mui/material/Button'
import Card from '@mui/material/Card'
import Popover from '@mui/material/Popover'
import Typography from '@mui/material/Typography'
import CardActions from '@mui/material/CardActions'
import CardContent from '@mui/material/CardContent'

function ColorSelectorBtn({
    control,
    name,
    label,
    readOnly,
    id,
    watchColor,
    setValue,
}) {
    const [anchorEl, setAnchorEl] = useState(null)
    const open = Boolean(anchorEl)
    const btnId = open ? 'color-popover' : undefined

    const handleColorChangeSubmit = () => {
        setAnchorEl(null)
    }

    const handleClick = (event) => {
        setAnchorEl(event.currentTarget)
    }

    const handleClose = () => {
        setAnchorEl(null)
    }

    return (
        <>
            <Button
                aria-describedby={btnId}
                required
                name="color"
                variant="contained"
                sx={{
                    '&.Mui-disabled': {
                        background: watchColor,
                        color: '#fff',
                    },
                    backgroundColor: watchColor,
                    '&.MuiButton-root:hover': {
                        background: watchColor,
                    },
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
                        <Typography
                            sx={{ fontSize: 14 }}
                            color="text.secondary"
                            gutterBottom
                        >
                            Select your color
                        </Typography>

                        <Controller
                            control={control}
                            name="userColor"
                            render={({ field: { onChange, value, name } }) => (
                                <CirclePicker
                                    color={value}
                                    onChange={(e) => setValue(name, e.hex)}
                                />
                            )}
                        />
                    </CardContent>
                    <CardActions sx={{ justifyContent: 'center' }}>
                        <Button size="small" onClick={handleColorChangeSubmit}>
                            Ok
                        </Button>
                    </CardActions>
                </Card>
            </Popover>
        </>
    )
}

export default ColorSelectorBtn
