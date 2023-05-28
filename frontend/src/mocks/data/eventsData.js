import moment from 'moment'

const events = [
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

export { events }
