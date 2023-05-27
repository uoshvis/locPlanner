import { rest } from 'msw'
import { users, circlePickerDefaultColors } from './data/usersData'
import { events } from './data/eventsData'
import { meetingsData } from './data/meetingsData'

// Add an extra delay to all endpoints, so loading spinners show up.
const ARTIFICIAL_DELAY_MS = 1000

// Authenticate user from token
const authenticateUser = (req) => {
    // Mock authentication logic
    const authorizationHeader = req.headers.get('Authorization')
    if (authorizationHeader) {
        const token = authorizationHeader.replace('Bearer ', '')
        // Mock token verification logic
        if (token.includes('_mockToken')) {
            const id = token.split('_mockToken')[0]
            // Mock user based on the token
            const user = users.find((user) => user.id === Number(id))
            return user
        }
    }
    return null
}

export const handlers = [
    // #################### Auth handlers #############################

    // registerUser
    rest.post('/api/auth/register', (req, res, ctx) => {
        const id = Number(new Date())
        const data = {
            ...req.body,
            isActive: false,
            role: 'user',
            userColor: circlePickerDefaultColors[0],
        }
        if (data.title === 'error') {
            return res(
                ctx.delay(ARTIFICIAL_DELAY_MS),
                ctx.status(500, 'Item not added'),
                ctx.json({})
            )
        }
        data.id = id
        const checkUsername = (obj) => obj.userName === data.userName
        if (!data.some(checkUsername)) {
            users.push(data)
            return res(
                ctx.delay(ARTIFICIAL_DELAY_MS),
                ctx.status(200),
                ctx.json({
                    id: data.id,
                    firstName: data.firstName,
                    lastName: data.lastName,
                })
            )
        } else {
            return res(
                ctx.delay(ARTIFICIAL_DELAY_MS),
                ctx.status(404, 'UserName already taken'),
                ctx.json({})
            )
        }
    }),

    // loginUser
    rest.post('api/auth/login', (req, res, ctx) => {
        const userName = req.body.userName
        const password = req.body.password

        if (userName && password) {
            const user = users.find((user) => user.userName === userName)

            if (user && user.password === password && user.isActive) {
                const userToken = user.id + '_mockToken'
                return res(
                    ctx.delay(ARTIFICIAL_DELAY_MS),
                    ctx.status(200),
                    ctx.json({ userToken, userInfo: user })
                )
            } else if (user && !user.isActive) {
                return res(
                    ctx.delay(ARTIFICIAL_DELAY_MS),
                    ctx.status(
                        401,
                        'User account is not active. Contact Admin.'
                    ),
                    ctx.json({})
                )
            } else {
                return res(
                    ctx.delay(ARTIFICIAL_DELAY_MS),
                    ctx.status(401, 'Invalid userName or password'),
                    ctx.json({})
                )
            }
        } else {
            return res(
                ctx.delay(ARTIFICIAL_DELAY_MS),
                ctx.status(401, 'Please enter your login data'),
                ctx.json({})
            )
        }
    }),

    rest.post('/api/auth/logout', (req, res, ctx) => {
        return res(
            ctx.delay(ARTIFICIAL_DELAY_MS),
            ctx.status(200),
            ctx.json({})
        )
    }),

    // #################### Users handlers ####################################

    //  getUsers
    rest.get('/api/users', (req, res, ctx) => {
        const usersData = users.map((user) => ({
            id: user.id,
            firstName: user.firstName,
            lastName: user.lastName,
            userColor: user.userColor,
        }))

        if (usersData) {
            return res(
                ctx.delay(ARTIFICIAL_DELAY_MS),
                ctx.status(200),
                ctx.json(usersData)
            )
        } else {
            return res(
                ctx.delay(ARTIFICIAL_DELAY_MS),
                ctx.status(404, 'Users not found'),
                ctx.json({})
            )
        }
    }),

    //  getUsersData
    rest.get('/api/users/users-data', (req, res, ctx) => {
        const reqUser = authenticateUser(req)

        if (['admin', 'superAdmin'].includes(reqUser.role)) {
            if (users) {
                return res(
                    ctx.delay(ARTIFICIAL_DELAY_MS),
                    ctx.status(200),
                    ctx.json(users)
                )
            } else {
                return res(
                    ctx.delay(ARTIFICIAL_DELAY_MS),
                    ctx.status(404, 'Users not found'),
                    ctx.json({})
                )
            }
        } else {
            return res(
                ctx.delay(ARTIFICIAL_DELAY_MS),
                ctx.status(401, 'Only for admin role users'),
                ctx.json({})
            )
        }
    }),

    //  getUserProfile
    rest.get('/api/users/profile', (req, res, ctx) => {
        const user = authenticateUser(req)

        if (user) {
            return res(
                ctx.delay(ARTIFICIAL_DELAY_MS),
                ctx.status(200),
                ctx.json({
                    id: user.id,
                    userName: user.userName,
                    firstName: user.firstName,
                    lastName: user.lastName,
                    role: user.role,
                    userColor: user.userColor,
                })
            )
        } else {
            return res(
                ctx.delay(ARTIFICIAL_DELAY_MS),
                ctx.status(404, 'User profile not found'),
                ctx.json({})
            )
        }
    }),

    //  getUser
    rest.get('/api/users/:id', (req, res, ctx) => {
        const reqUser = authenticateUser(req)
        const { id } = req.params

        if (['admin', 'superAdmin'].includes(reqUser.role)) {
            const user = users.find((user) => user.id === Number(id))

            if (user) {
                return res(
                    ctx.delay(ARTIFICIAL_DELAY_MS),
                    ctx.status(200),
                    ctx.json(user)
                )
            } else {
                return res(
                    ctx.delay(ARTIFICIAL_DELAY_MS),
                    ctx.status(404, 'User not found'),
                    ctx.json({})
                )
            }
        } else {
            return res(
                ctx.delay(ARTIFICIAL_DELAY_MS),
                ctx.status(401, 'Only for admin role users'),
                ctx.json({})
            )
        }
    }),

    //  updateUser
    rest.put('/api/users/:id', (req, res, ctx) => {
        const reqUser = authenticateUser(req)
        const { id } = req.params
        const data = req.body
        const itemIdx = users.findIndex((obj) => obj.id === Number(id))

        // const itemIdx = -1
        if (itemIdx !== -1) {
            if (
                users[itemIdx].id === reqUser.id ||
                ['admin', 'superAdmin'].includes(reqUser.role)
            ) {
                users[itemIdx] = { ...users[itemIdx], ...data }
                return res(
                    ctx.delay(ARTIFICIAL_DELAY_MS),
                    ctx.status(200),
                    ctx.json(users[itemIdx])
                )
            } else {
                return res(
                    ctx.delay(ARTIFICIAL_DELAY_MS),
                    ctx.status(401, 'Update not Allowed'),
                    ctx.json({})
                )
            }
        } else {
            return res(
                ctx.delay(ARTIFICIAL_DELAY_MS),
                ctx.status(404, 'Update item not found'),
                ctx.json({})
            )
        }
    }),

    // deleteUser
    rest.delete('/api/users/:id/delete', (req, res, ctx) => {
        const reqUser = authenticateUser(req)
        const { id } = req.params
        const itemIdx = users.findIndex((obj) => obj.id === Number(id))
        // const itemIdx = -1

        if (itemIdx !== -1 && ['superAdmin'].includes(reqUser.role)) {
            users.splice(itemIdx, 1)
            return res(
                ctx.delay(ARTIFICIAL_DELAY_MS),
                ctx.status(200),
                ctx.json({ id })
            )
        } else {
            return res(
                ctx.delay(ARTIFICIAL_DELAY_MS),
                ctx.status(401, 'Only for superAdmin'),
                ctx.json({})
            )
        }
    }),

    // #################### Events handlers ####################################

    // getEvents
    rest.get('/api/events', (req, res, ctx) => {
        const location = req.url.searchParams.get('location')
        const userId = req.url.searchParams.get('userId')

        var filteredEvents = events

        // filter by location
        if (location && location !== 'all') {
            filteredEvents = events.filter((item) => item.location === location)
        }

        // filter by userId
        if (userId) {
            filteredEvents = filteredEvents.filter(
                (item) => item.userId === Number(userId)
            )
        }

        if (filteredEvents) {
            return res(
                ctx.delay(ARTIFICIAL_DELAY_MS),
                ctx.status(200),
                ctx.json(filteredEvents)
            )
        } else {
            return res(
                ctx.delay(ARTIFICIAL_DELAY_MS),
                ctx.status(404, 'Events not found'),
                ctx.json({})
            )
        }
    }),

    // getEvent
    rest.get('/api/events/:id', (req, res, ctx) => {
        const { id } = req.params
        const itemIdx = events.findIndex((obj) => obj.id === Number(id))
        // const itemIdx = -1
        if (itemIdx !== -1) {
            return res(
                ctx.delay(ARTIFICIAL_DELAY_MS),
                ctx.status(200),
                ctx.json(events[itemIdx])
            )
        } else {
            return res(
                ctx.delay(ARTIFICIAL_DELAY_MS),
                ctx.status(404, 'Event not found'),
                ctx.json({})
            )
        }
    }),

    // createEvent
    rest.post('/api/events', (req, res, ctx) => {
        const data = req.body
        const id = Number(new Date())

        if (data.title === 'error') {
            return res(
                ctx.delay(ARTIFICIAL_DELAY_MS),
                ctx.status(500, 'Item not added'),
                ctx.json({})
            )
        }

        data.id = id
        events.push(data)

        return res(
            ctx.delay(ARTIFICIAL_DELAY_MS),
            ctx.status(200),
            ctx.json(data)
        )
    }),

    // updateEvent
    rest.put('/api/events/:id', (req, res, ctx) => {
        const reqUser = authenticateUser(req)
        const { id } = req.params
        const data = req.body
        const itemIdx = events.findIndex((obj) => obj.id === Number(id))
        // const itemIdx = -1
        if (itemIdx !== -1) {
            const eventToEdit = events[itemIdx]
            if (
                eventToEdit.userId === Number(reqUser.id) ||
                ['admin', 'superAdmin'].includes(reqUser.role)
            ) {
                events[itemIdx] = { ...eventToEdit, ...data }
                return res(
                    ctx.delay(ARTIFICIAL_DELAY_MS),
                    ctx.status(200),
                    ctx.json(events[itemIdx])
                )
            } else {
                return res(
                    ctx.delay(ARTIFICIAL_DELAY_MS),
                    ctx.status(401, 'Update Not allowed'),
                    ctx.json({})
                )
            }
        } else {
            return res(
                ctx.delay(ARTIFICIAL_DELAY_MS),
                ctx.status(404, 'Update item not found'),
                ctx.json({})
            )
        }
    }),

    // deleteEvent
    rest.delete('/api/events/:id/delete', (req, res, ctx) => {
        const reqUser = authenticateUser(req)
        const { id } = req.params
        const itemIdx = events.findIndex((obj) => obj.id === Number(id))
        // const itemIdx = -1
        if (itemIdx !== -1) {
            const eventToEdit = events[itemIdx]
            if (
                eventToEdit.userId === Number(reqUser.id) ||
                ['admin', 'superAdmin'].includes(reqUser.role)
            ) {
                events.splice(itemIdx, 1)
                return res(
                    ctx.delay(ARTIFICIAL_DELAY_MS),
                    ctx.status(200),
                    ctx.json({ id })
                )
            } else {
                return res(
                    ctx.delay(ARTIFICIAL_DELAY_MS),
                    ctx.status(401, 'Delete Not allowed'),
                    ctx.json({})
                )
            }
        } else {
            return res(
                ctx.delay(ARTIFICIAL_DELAY_MS),
                ctx.status(404, 'Item not found'),
                ctx.json({})
            )
        }
    }),

    // deleteEvents
    rest.delete('/api/events/delete', (req, res, ctx) => {
        const { ids: idsArray } = req.body
        const itemsIdxsToDelete = []
        for (const id of idsArray) {
            let itemIdx = events.findIndex((obj) => obj.id === Number(id))

            if (itemIdx === -1) {
                return res(
                    ctx.delay(ARTIFICIAL_DELAY_MS),
                    ctx.status(404, 'One of item was not found'),
                    ctx.json({})
                )
            }
            itemsIdxsToDelete.push(itemIdx)
        }
        if (itemsIdxsToDelete.length === idsArray.length) {
            itemsIdxsToDelete.forEach((idx) => events.splice(idx, 1))
            return res(
                ctx.delay(ARTIFICIAL_DELAY_MS),
                ctx.status(200),
                ctx.json({ ids: 'delete many' })
            )
        }
    }),

    // #################### Meetings handlers #################################

    rest.get('/api/meetings', (req, res, ctx) => {
        return res(
            ctx.delay(ARTIFICIAL_DELAY_MS),
            ctx.status(200),
            ctx.json(meetingsData)
        )
    }),
]
