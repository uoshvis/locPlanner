import React from 'react'
import { useForm } from 'react-hook-form'
import { zodResolver } from '@hookform/resolvers/zod'
import Button from '@mui/material/Button'
import Dialog from '@mui/material/Dialog'
import DialogActions from '@mui/material/DialogActions'
import DialogContent from '@mui/material/DialogContent'
import DialogContentText from '@mui/material/DialogContentText'
import DialogTitle from '@mui/material/DialogTitle'
import FormControl from '@mui/material/FormControl'
import { Box } from '@mui/material'

import meetingSchema from './formFields/meetingSchema'
import MeetingFormFields from './formFields/MeetingFormFields'
import {
    useUpdateMeetingMutation,
    useDeleteMeetingMutation,
} from '../../app/services/meetings'

export default function MeetingUpdateDialog({ open, setOpen, meetingData }) {
    const [updateMeeting] = useUpdateMeetingMutation()
    const [deleteMeeting] = useDeleteMeetingMutation()

    const { control, handleSubmit, reset } = useForm({
        defaultValues: {
            firstName: '',
            lastName: '',
            personalId: '',
            meetingDate: '',
            md: '',
            firstDate: '',
        },
        values: { ...meetingData },
        resolver: zodResolver(meetingSchema),
    })

    const handleClose = () => {
        setOpen(false)
        reset()
    }

    const handleDelete = async () => {
        const id = meetingData?.id
        if (id) {
            try {
                await deleteMeeting(id)
                    .unwrap()
                    .then(() => handleClose())
            } catch (err) {
                console.log({ err })
            }
        }
    }

    const onSaveSubmit = async (data) => {
        if (data) {
            const dataToSave = {
                ...data,
                id: meetingData.id, // Or add in Zod schema
                meetingDate: data.meetingDate.toString(),
                firstDate: data.firstDate?.toString(),
            }
            try {
                await updateMeeting(dataToSave)
                    .unwrap()
                    .then(() => handleClose())
            } catch (err) {
                console.log({ err })
            }
        }
    }

    return (
        <Box sx={{ display: 'flex', justifyContent: 'space-between' }}>
            <Dialog open={open} onClose={handleClose}>
                <FormControl component="form" noValidate autoComplete="off">
                    <DialogTitle>Update Meeting</DialogTitle>

                    <DialogContent>
                        <DialogContentText>
                            You can update the meeting details below
                        </DialogContentText>
                        <MeetingFormFields
                            control={control}
                            handleSubmit={handleSubmit}
                        />
                    </DialogContent>
                    <DialogActions
                        sx={{
                            display: 'flex',
                            flexDirection: { sm: 'row', xs: 'column' },
                            alignItems: 'center',
                            justifyContent: { sm: 'space-between' },
                            ml: 8,
                            mr: 8,
                        }}
                    >
                        <Button onClick={handleDelete}>Delete</Button>
                        <Button onClick={handleClose}>Cancel</Button>
                        <Button
                            type="submit"
                            onClick={handleSubmit(onSaveSubmit)}
                        >
                            Save
                        </Button>
                    </DialogActions>
                </FormControl>
            </Dialog>
        </Box>
    )
}
