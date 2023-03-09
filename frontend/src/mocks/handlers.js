import { rest } from 'msw'
import moment from 'moment'
import { meetingsData } from './data/meetingsData'
// Add an extra delay to all endpoints, so loading spinners show up.
const ARTIFICIAL_DELAY_MS = 1000

const circlePickerDefaultColors = [
    '#f44336',
    '#e91e63',
    '#9c27b0',
    '#673ab7',
    '#3f51b5',
    '#2196f3',
    '#03a9f4',
    '#00bcd4',
    '#009688',
    '#4caf50',
    '#8bc34a',
    '#cddc39',
    '#ffeb3b',
    '#ffc107',
    '#ff9800',
    '#ff5722',
    '#795548',
    '#607d8b',
]

const items = [
    {
        id: 10,
        start: moment().toDate(),
        end: moment().add(1, 'hours').toDate(),
        title: 'Bird song 1',
        location: 'loc1',
        userId: 101,
        isCompleted: false,
    },
    {
        id: 11,
        start: moment().toDate(),
        end: moment().add(6, 'hours').toDate(),
        title: 'Full moon 1',
        location: 'loc1',
        userId: 102,
        isCompleted: true,
    },
    {
        id: 20,
        start: moment().add(2, 'days').toDate(),
        end: moment().add(2, 'days').add(3, 'hours').toDate(),
        title: 'Sunshine 2',
        location: 'loc2',
        userId: 103,
        isCompleted: true,
    },
    {
        id: 21,
        start: moment().add(3, 'days').toDate(),
        end: moment().add(3, 'days').add(3, 'hours').toDate(),
        title: 'Sunrise 2',
        location: 'loc2',
        userId: 104,
        isCompleted: false,
    },
    {
        id: 22,
        start: moment().add(5, 'days').toDate(),
        end: moment().add(5, 'days').add(5, 'hours').toDate(),
        title: 'Sunrise 2 again',
        location: 'loc2',
        userId: 101,
        isCompleted: false,
    },
    {
        id: 23,
        start: moment().add(6, 'days').toDate(),
        end: moment().add(6, 'days').add(6, 'hours').toDate(),
        title: 'Happy hour',
        location: 'loc2',
        userId: 101,
        isCompleted: true,
    },
]

const users = [
    {
        id: 999,
        userName: 'superAdmin',
        firstName: 'Super',
        lastName: 'Admin',
        isActive: true,
        userColor: '#f44336',
        password: '123',
        role: 'superAdmin',
    },
    {
        id: 100,
        userName: 'admin',
        firstName: 'Administrator',
        lastName: 'Joker',
        isActive: true,
        userColor: '#f44336',
        password: '123',
        role: 'admin',
    },
    {
        id: 101,
        userName: 'SantaClaus',
        firstName: 'Santa',
        lastName: 'Claus',
        isActive: true,
        userColor: '#e91e63',
        password: '123',
        role: 'user',
    },
    {
        id: 102,
        userName: 'TeddyBear',
        firstName: 'Teddy',
        lastName: 'Bear',
        isActive: false,
        userColor: '#9c27b0',
        password: '123',
        role: 'user',
    },
    {
        id: 103,
        userName: 'RedNose',
        firstName: 'Rudolf',
        lastName: 'Red',
        isActive: true,
        userColor: '#673ab7',
        password: '123',
        role: 'user',
    },
    {
        id: 104,
        userName: 'Nobrain',
        firstName: 'Snowman',
        lastName: 'White',
        isActive: false,
        userColor: '#3f51b5',
        password: '123',
        role: 'user',
    },
]

export const handlers = [
    // #################### Login-logout handlers #############################

    rest.post('/myApi/register', (req, res, ctx) => {
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
        users.push(data)
        return res(
            ctx.delay(ARTIFICIAL_DELAY_MS),
            ctx.status(200),
            ctx.json(data)
        )
    }),

    rest.post('/myApi/login', (req, res, ctx) => {
        const token = {}
        const userName = req.body.userName
        const password = req.body.password
        if (userName && password) {
            const user = users.find((user) => user.userName === userName)
            if (user && user.password === password && user.isActive) {
                const userId = user.id
                token[userId] = userName + '_token'
                return res(
                    ctx.delay(ARTIFICIAL_DELAY_MS),
                    ctx.status(200),
                    ctx.json(token)
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

    rest.post('/myApi/logout', (req, res, ctx) => {
        return res(
            ctx.delay(ARTIFICIAL_DELAY_MS),
            ctx.status(200),
            ctx.json({})
        )
    }),

    // #################### Users handlers ####################################

    rest.get('/myApi/users', (req, res, ctx) => {
        return res(
            ctx.delay(ARTIFICIAL_DELAY_MS),
            ctx.status(200),
            ctx.json(users)
        )
    }),

    rest.get('/myApi/users/:id', (req, res, ctx) => {
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

    rest.post('/myApi/users', (req, res, ctx) => {
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

    rest.put('/myApi/users/:id', (req, res, ctx) => {
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

    rest.delete('/myApi/users/:id', (req, res, ctx) => {
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

    rest.get('/myApi/events/:location', (req, res, ctx) => {
        const { location } = req.params
        var events = []
        const validLocation = ['all', 'loc1', 'loc2'].includes(location)

        if (validLocation) {
            if (location === 'all') {
                events = items
            } else {
                events = items.filter((item) => item.location === location)
            }
            return res(
                ctx.delay(ARTIFICIAL_DELAY_MS),
                ctx.status(200),
                ctx.json(events)
            )
        } else {
            return res(
                ctx.delay(ARTIFICIAL_DELAY_MS),
                ctx.status(404, 'Location not found'),
                ctx.json({})
            )
        }
    }),

    rest.put('/myApi/events/:id', (req, res, ctx) => {
        const { id } = req.params
        const data = req.body
        const itemIdx = items.findIndex((obj) => obj.id === Number(id))
        // const itemIdx = -1
        if (itemIdx !== -1) {
            items[itemIdx] = data
            return res(
                ctx.delay(ARTIFICIAL_DELAY_MS),
                ctx.status(200),
                ctx.json(items[itemIdx])
            )
        } else {
            return res(
                ctx.delay(ARTIFICIAL_DELAY_MS),
                ctx.status(404, 'Update item not found'),
                ctx.json({})
            )
        }
    }),

    rest.post('/myApi/events', (req, res, ctx) => {
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
        items.push(data)
        return res(
            ctx.delay(ARTIFICIAL_DELAY_MS),
            ctx.status(200),
            ctx.json(data)
        )
    }),

    rest.delete('/myApi/events/:id', (req, res, ctx) => {
        const { id } = req.params
        const itemIdx = items.findIndex((obj) => obj.id === Number(id))
        // const itemIdx = -1
        if (itemIdx !== -1) {
            items.splice(itemIdx, 1)
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
    rest.delete('/myApi/events', (req, res, ctx) => {
        const data = req.body
        const idsArray = data.split(';')
        const itemsIdxsToDelete = []
        for (const id of idsArray) {
            let itemIdx = items.findIndex((obj) => obj.id === Number(id))

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
            itemsIdxsToDelete.forEach((idx) => items.splice(idx, 1))
            return res(
                ctx.delay(ARTIFICIAL_DELAY_MS),
                ctx.status(200),
                ctx.json({ ids: data })
            )
        }
    }),

    // meetings
    rest.get('/myApi/meetings', (req, res, ctx) => {
        return res(
            ctx.delay(ARTIFICIAL_DELAY_MS),
            ctx.status(200),
            ctx.json(meetingsData)
        )
    }),
]
