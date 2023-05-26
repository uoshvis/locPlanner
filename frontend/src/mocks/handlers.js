import { rest } from 'msw'
import { meetingsData } from './data/meetingsData'
import { users, circlePickerDefaultColors } from './data/usersData'
import { events } from './data/eventsData'

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

    rest.get('/api/users', (req, res, ctx) => {
        return res(
            ctx.delay(ARTIFICIAL_DELAY_MS),
            ctx.status(200),
            ctx.json(users)
        )
    }),

    rest.get('/api/users/profile', (req, res, ctx) => {
        const user = authenticateUser(req)

        if (user) {
            return res(
                ctx.delay(ARTIFICIAL_DELAY_MS),
                ctx.status(200),
                ctx.json(user)
            )
        } else {
            return res(
                ctx.delay(ARTIFICIAL_DELAY_MS),
                ctx.status(404, 'User profile not found'),
                ctx.json({})
            )
        }
    }),

    rest.get('/api/users/:id', (req, res, ctx) => {
        const { id } = req.params
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
    }),

    rest.post('/api/users', (req, res, ctx) => {
        const id = Number(new Date())
        const data = {
            ...req.body,
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
        users.push(data)
        return res(
            ctx.delay(ARTIFICIAL_DELAY_MS),
            ctx.status(200),
            ctx.json(data)
        )
    }),

    rest.put('/api/users/:id', (req, res, ctx) => {
        const { id } = req.params
        const data = req.body
        const itemIdx = users.findIndex((obj) => obj.id === Number(id))
        // const itemIdx = -1
        if (itemIdx !== -1) {
            users[itemIdx] = { ...data }
            return res(
                ctx.delay(ARTIFICIAL_DELAY_MS),
                ctx.status(200),
                ctx.json(users[itemIdx])
            )
        } else {
            return res(
                ctx.delay(ARTIFICIAL_DELAY_MS),
                ctx.status(404, 'Update item not found'),
                ctx.json({})
            )
        }
    }),

    rest.delete('/api/users/:id', (req, res, ctx) => {
        const { id } = req.params
        const itemIdx = users.findIndex((obj) => obj.id === Number(id))
        // const itemIdx = -1
        if (itemIdx !== -1) {
            users.splice(itemIdx, 1)
            return res(
                ctx.delay(ARTIFICIAL_DELAY_MS),
                ctx.status(200),
                ctx.json({ id })
            )
        } else {
            return res(
                ctx.delay(ARTIFICIAL_DELAY_MS),
                ctx.status(404, 'Item not found'),
                ctx.json({})
            )
        }
    }),

    // #################### Events handlers ####################################

    rest.get('/api/events/:location', (req, res, ctx) => {
        const { location } = req.params
        var locationEvents = []
        const validLocation = ['all', 'loc1', 'loc2'].includes(location)

        if (validLocation) {
            if (location === 'all') {
                locationEvents = events
            } else {
                locationEvents = events.filter(
                    (item) => item.location === location
                )
            }
            return res(
                ctx.delay(ARTIFICIAL_DELAY_MS),
                ctx.status(200),
                ctx.json(locationEvents)
            )
        } else {
            return res(
                ctx.delay(ARTIFICIAL_DELAY_MS),
                ctx.status(404, 'Location not found'),
                ctx.json({})
            )
        }
    }),

    rest.put('/api/events/:id', (req, res, ctx) => {
        const { id } = req.params
        const data = req.body
        const itemIdx = events.findIndex((obj) => obj.id === Number(id))
        // const itemIdx = -1
        if (itemIdx !== -1) {
            events[itemIdx] = data
            return res(
                ctx.delay(ARTIFICIAL_DELAY_MS),
                ctx.status(200),
                ctx.json(events[itemIdx])
            )
        } else {
            return res(
                ctx.delay(ARTIFICIAL_DELAY_MS),
                ctx.status(404, 'Update item not found'),
                ctx.json({})
            )
        }
    }),

    rest.post('/api/events', (req, res, ctx) => {
        const id = Number(new Date())
        const data = req.body

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

    rest.delete('/api/events/:id', (req, res, ctx) => {
        const { id } = req.params
        const itemIdx = events.findIndex((obj) => obj.id === Number(id))
        // const itemIdx = -1
        if (itemIdx !== -1) {
            events.splice(itemIdx, 1)
            return res(
                ctx.delay(ARTIFICIAL_DELAY_MS),
                ctx.status(200),
                ctx.json({ id })
            )
        } else {
            return res(
                ctx.delay(ARTIFICIAL_DELAY_MS),
                ctx.status(404, 'Item not found'),
                ctx.json({})
            )
        }
    }),
    rest.delete('/api/events', (req, res, ctx) => {
        const data = req.body
        const idsArray = data.split(';')
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
                ctx.json({ ids: data })
            )
        }
    }),

    // meetings
    rest.get('/api/meetings', (req, res, ctx) => {
        return res(
            ctx.delay(ARTIFICIAL_DELAY_MS),
            ctx.status(200),
            ctx.json(meetingsData)
        )
    }),
]
