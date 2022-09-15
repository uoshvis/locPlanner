import { rest } from 'msw'
import moment from 'moment';

// Add an extra delay to all endpoints, so loading spinners show up.
const ARTIFICIAL_DELAY_MS = 1000

const items = [      
    {
        id: 10,
        start: moment().toDate(),
        end: moment().add(1, "hours").toDate(),
        title: "Some title 1",
        location: 'loc1',
        userId: 101,
    },
    {   
        id: 20,
        start: moment().add(2, "days").toDate(),
        end: moment().add(2, "days").add(3, "hours").toDate(),
        title: "Some title 2",
        location: 'loc2',
        userId: 102,
    },
]

const users = [
    {
        id: 101,
        userName: 'SantaClaus',
        name: 'Santa',
        surname: 'Claus',
    },
    {
        id: 102,
        userName: 'TeddyBear',
        name: 'Teddy',
        surname: 'Bear',
    },
]

export const handlers = [


    rest.post('/myApi/login', (req, res, ctx) => {
        return res(
            ctx.status(200),
            ctx.json({token: 'token123'})
        )
    }),

    rest.get('/myApi/users', (req, res, ctx) => {
        return res(
            ctx.status(200),
            ctx.json(users),
            )
    }),

    rest.get('/myApi/events/:location', (req, res, ctx) => {
        const { location } = req.params
        var events = []
        const validLocation = ['all', 'loc1', 'loc2'].includes(location)

        if (validLocation) {
            if(location === 'all') {
                events = items
            }
            else {
                events = items.filter(item => item.location === location)
            }   
        return res(
            ctx.delay(ARTIFICIAL_DELAY_MS),
            ctx.status(200),
            ctx.json(events),
            )         
        }
        else {
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
        const itemIdx = items.findIndex(obj => obj.id === Number(id))
        if (itemIdx !== -1) {
            items[itemIdx] = data
            return res(
                ctx.delay(ARTIFICIAL_DELAY_MS),
                ctx.status(200),
                ctx.json(items[itemIdx])
            )
        }
        else {
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

        if(data.title === 'error') {
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
        }
    ),

    rest.delete('/myApi/events/:id', (req, res, ctx) => {
        const { id } = req.params
        const itemIdx = items.findIndex(obj => obj.id === Number(id))
        if (itemIdx !== -1) {
            items.splice(itemIdx, 1)
            return res(
                ctx.delay(ARTIFICIAL_DELAY_MS),
                ctx.status(200),
                ctx.json({id})
            )
        }
        else {
            return res(
                ctx.delay(ARTIFICIAL_DELAY_MS),
                ctx.status(404, 'Item not found'),
                ctx.json({})
            )
        }
        }),

]