import moment from 'moment'

// convert str dateTime to Date obj
export const jsonDateTimeConverter = (data) => {
    //.toISOString causes RBC crash on view change
    if (typeof data === 'object' && !Array.isArray(data) && data !== null) {
        data.start = moment(data.start).toDate()
        data.end = moment(data.end).toDate()
    } else if (Array.isArray(data) && data !== null) {
        data.forEach((item) => {
            item.start = moment(item.start).toDate()
            item.end = moment(item.end).toDate()
        })
    }
    return data
}
