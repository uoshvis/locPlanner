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
    },
    {   
        id: 20,
        start: moment().add(2, "days").toDate(),
        end: moment().add(2, "days").add(3, "hours").toDate(),
        title: "Some title 2",
        location: 'loc2',
    },
]

export const handlers = [

    rest.get('/events/', (req, res, ctx) => {
        return res(
            ctx.status(200),
            ctx.json(items),
            )
    }),

    rest.get('/events/:location', (req, res, ctx) => {
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

    rest.put('/events/:id', (req, res, ctx) => {
        const { id } = req.params
        const data = req.body
        const itemIdx = items.findIndex(obj => obj.id === Number(id))
        if (itemIdx !== -1) {
            items[itemIdx] = data
            return res(
                ctx.delay(ARTIFICIAL_DELAY_MS),
                ctx.status(200),
                ctx.json({})
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

    rest.post('/events', (req, res, ctx) => {
        const id = Number(new Date())
        const data = req.body

        if(data.title === 'error') {
            return res(
                ctx.delay(ARTIFICIAL_DELAY_MS),
                ctx.status(500),
                ctx.json('Server error saving this post!')
            )
        }

        data.id = id
        items.push(data)
        return res(
            ctx.delay(ARTIFICIAL_DELAY_MS),
            ctx.status(200),
            ctx.json({})
            )
        }
    )

]