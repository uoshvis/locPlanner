import React from 'react'
import { useNavigate, useSearchParams } from 'react-router-dom'
import Table from '@mui/material/Table'
import TableBody from '@mui/material/TableBody'
import TableCell from '@mui/material/TableCell'
import TableContainer from '@mui/material/TableContainer'
import TableHead from '@mui/material/TableHead'
import TableRow from '@mui/material/TableRow'
import Paper from '@mui/material/Paper'
import Chip from '@mui/material/Chip'
import Button from '@mui/material/Button'

export default function UserList({ users = [] }) {
    const navigate = useNavigate()
    const [searchParams, setSearchParams] = useSearchParams()
    const searchTerm = searchParams.get('name') || ''

    const handleSearch = (event) => {
        const name = event.target.value

        if (name) {
            setSearchParams({ name: event.target.value })
        } else {
            setSearchParams({})
        }
    }

    return (
        <>
            <h2>Users</h2>

            <input type="text" value={searchTerm} onChange={handleSearch} />
            <TableContainer component={Paper}>
                <Table sx={{ minWidth: 650 }} aria-label="simple table">
                    <TableHead>
                        <TableRow>
                            <TableCell align="left">User Color</TableCell>
                            <TableCell align="left">Firstname</TableCell>
                            <TableCell align="left">Lastname</TableCell>
                            <TableCell align="left">UserName</TableCell>
                            <TableCell align="left">Role</TableCell>
                            <TableCell align="left">Active</TableCell>
                            <TableCell align="left"></TableCell>
                        </TableRow>
                    </TableHead>
                    <TableBody>
                        {users
                            .filter((user) =>
                                user.firstName
                                    .toLowerCase()
                                    .includes(searchTerm.toLocaleLowerCase())
                            )
                            .map((user) => (
                                <TableRow
                                    key={user.id}
                                    sx={{
                                        '&:last-child td, &:last-child th': {
                                            border: 0,
                                        },
                                        textDecoration: 'none',
                                    }}
                                    hover={true}
                                >
                                    <TableCell
                                        align="left"
                                        component="th"
                                        scope="row"
                                    >
                                        <Chip
                                            size="small"
                                            sx={{
                                                bgcolor: user.userColor,
                                                color: 'white',
                                                width: '30%',
                                            }}
                                        />
                                    </TableCell>
                                    <TableCell align="left">
                                        {user.firstName}
                                    </TableCell>
                                    <TableCell align="left">
                                        {user.lastName}
                                    </TableCell>
                                    <TableCell align="left">
                                        {user.userName}
                                    </TableCell>
                                    <TableCell align="left">
                                        {user.role}
                                    </TableCell>
                                    <TableCell align="left">
                                        {user.isActive ? ' Yes' : 'No'}
                                    </TableCell>
                                    <TableCell align="left">
                                        <Button
                                            onClick={() => {
                                                navigate(`${user.id}/`)
                                            }}
                                        >
                                            Edit
                                        </Button>
                                    </TableCell>
                                </TableRow>
                            ))}
                    </TableBody>
                </Table>
            </TableContainer>
        </>
    )
}
