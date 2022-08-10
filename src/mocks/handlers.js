import { rest } from 'msw'

const data = []

export const handlers = [

    rest.get('/events', (req, res, ctx) => {
        const events = data

        return res(
            ctx.status(200),
            ctx.json(events)
        )
    })
]