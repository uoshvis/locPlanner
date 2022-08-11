import { rest } from 'msw'
import moment from 'moment';

const items = [      
    {
        id: 10,
        start: moment().toISOString(),
        end: moment().add(1, "hours").toISOString(),
        title: "Some title",
        location: 'loc1',
    },
    {   
        id: 20,
        start: moment().add(2, "days").toISOString(),
        end: moment().add(3, "days").toISOString(),
        title: "Some title2",
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
            ctx.status(200),
            ctx.json(events),
            )         
        }
        else {
            return res(
                ctx.status(404, 'Location not found')
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
                ctx.status(200),
            )
        }
        else {
            return res(
                ctx.status(404),
            )
        }
        })

]