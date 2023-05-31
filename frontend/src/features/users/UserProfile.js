import React from 'react'
import { useSelector } from 'react-redux'
import { useForm } from 'react-hook-form'
import { zodResolver } from '@hookform/resolvers/zod'
import { z } from 'zod'

import Container from '@mui/material/Container'
import Box from '@mui/material/Box'
import Button from '@mui/material/Button'

import Input from './formFields/Input'
import ColorSelectorBtn from './formFields/ColorSelectorBtn'
import {
    useUpdateUserMutation,
    useLazyGetUserProfileQuery,
} from '../../app/services/users'

const userSchema = z.object({
    userName: z.string().max(15).min(1, { message: 'User Name Required' }),
    firstName: z.string().min(1, { message: 'First Name Required' }),
    lastName: z.string().min(1, { message: 'Last Name Required' }),
    userColor: z.string().startsWith('#').max(7),
})

function UserProfile() {
    const { userInfo } = useSelector((state) => state.auth)
    const { handleSubmit, reset, setValue, getValues, watch, control } =
        useForm({
            defaultValues: {
                userName: '',
                firstName: '',
                lastName: '',
                userColor: '',
            },
            values: userInfo,
            resolver: zodResolver(userSchema),
        })

    const watchColor = watch('userColor', '')
    const [readOnly, setReadOnly] = React.useState(true)
    const [updateUser, { isLoading: isUpdating }] = useUpdateUserMutation()
    const [triggerGetProfile] = useLazyGetUserProfileQuery()

    const onSaveSubmit = async () => {
        const data = getValues()
        try {
            setReadOnly(true)
            await updateUser({ id: userInfo.id, ...data })
                .unwrap()
                .then(() => {
                    triggerGetProfile(userInfo.id)
                })
        } catch (err) {
            reset(userInfo)
        }
    }

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
                    name="userName"
                    label="User Name"
                    id="userName"
                    readOnly={readOnly}
                />
                <Input
                    control={control}
                    name="firstName"
                    label="First Name"
                    id="firstName"
                    readOnly={readOnly}
                />
                <Input
                    control={control}
                    name="lastName"
                    label="Last Name"
                    id="lastName"
                    readOnly={readOnly}
                />

                <ColorSelectorBtn
                    control={control}
                    name="userColor"
                    label="User Color"
                    readOnly={readOnly}
                    id="userColor"
                    watchColor={watchColor}
                    setValue={setValue}
                />

                <Button
                    disabled={!readOnly}
                    onClick={() => setReadOnly((prev) => !prev)}
                >
                    Edit
                </Button>

                <Button type="submit" disabled={readOnly}>
                    Save
                </Button>

                <Button disabled={readOnly} onClick={handleCancel}>
                    Cancel
                </Button>
            </Box>
        </Container>
    )
}

export default UserProfile
