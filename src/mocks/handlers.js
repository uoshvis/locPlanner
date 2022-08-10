import { rest } from 'msw'
import moment from 'moment';

const data = [      
    {
        id: 10,
        start: moment(),
        end: moment().add(1, "hours"),
        title: "Some title",
        location: 'loc1',
    },
    {   
        id: 20,
        start: moment().add(2, "days"),
        end: moment().add(3, "days"),
        title: "Some title2",
        location: 'loc2',
    },
]

export const handlers = [

    rest.get('/events/:location', (req, res, ctx) => {
        const { location } = req.params
        var events = []
        const validLocation = ['all', 'loc1', 'loc2'].includes(location)

        if (validLocation) {
            if(location === 'all') {
                events = data
            }
            else {
                events = data.filter(item => item.location === location)
            }   
        return res(
            ctx.status(200),
            ctx.json(events)
            )         
        }
        else {
            return res(
                ctx.status(404, 'Location not found')
            )
        }

    }),

]