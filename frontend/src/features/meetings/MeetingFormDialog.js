import React, { useState } from 'react'
import { useForm } from 'react-hook-form'
import { zodResolver } from '@hookform/resolvers/zod'
import Button from '@mui/material/Button'
import Dialog from '@mui/material/Dialog'
import DialogActions from '@mui/material/DialogActions'
import DialogContent from '@mui/material/DialogContent'
import DialogContentText from '@mui/material/DialogContentText'
import DialogTitle from '@mui/material/DialogTitle'
import AddOutlinedIcon from '@mui/icons-material/AddOutlined'
import FormControl from '@mui/material/FormControl'
import { Box } from '@mui/material'

import { useCreateMeetingMutation } from '../../app/services/meetings'
import meetingSchema from './formFields/meetingSchema'
import MeetingFormFields from './formFields/MeetingFormFields'

export default function MeetingFormDialog() {
    const [open, setOpen] = useState(false)
    const [createMeeting] = useCreateMeetingMutation()
    const { control, handleSubmit, reset } = useForm({
        defaultValues: {
            firstName: '',
            lastName: '',
            personalId: '',
            meetingDate: '',
            md: '',
            firstDate: '',
        },
        resolver: zodResolver(meetingSchema),
    })

    const handleClickOpen = () => {
        setOpen(true)
    }

    const handleClose = () => {
        setOpen(false)
        reset()
    }

    const onSaveSubmit = async (data) => {
        if (data) {
            console.log(data)
            try {
                await createMeeting(data)
                    .unwrap()
                    .then(() => handleClose())
            } catch (err) {
                console.log({ err })
            }
        }
    }

    return (
        <Box sx={{ display: 'flex', justifyContent: 'space-between' }}>
            <Button
                sx={{ ml: 'auto', mb: 2 }}
                variant="outlined"
                startIcon={<AddOutlinedIcon />}
                onClick={handleClickOpen}
            >
                Add Meeting
            </Button>

            <Dialog open={open} onClose={handleClose}>
                <FormControl component="form" noValidate autoComplete="off">
                    <DialogTitle>Add New Meeting</DialogTitle>

                    <DialogContent>
                        <DialogContentText>
                            To add a new meeting fill the form.
                        </DialogContentText>
                        <MeetingFormFields
                            control={control}
                            handleSubmit={handleSubmit}
                        />
                    </DialogContent>
                    <DialogActions>
                        <Button onClick={handleClose}>Cancel</Button>
                        <Button
                            type="submit"
                            onClick={handleSubmit(onSaveSubmit)}
                        >
                            Submit
                        </Button>
                    </DialogActions>
                </FormControl>
            </Dialog>
        </Box>
    )
}
