import moment from 'moment'

// convert str dateTime to true JS Date obj
export const dateTimeToDateObj = (data) => {
    const dataCopy = JSON.parse(JSON.stringify(data))
    //.toISOString causes RBC crash on view change
    if (
        typeof dataCopy === 'object' &&
        !Array.isArray(dataCopy) &&
        dataCopy !== null
    ) {
        try {
            dataCopy.start = moment(dataCopy.start).toDate()
            dataCopy.end = moment(dataCopy.end).toDate()
        } catch {}
    } else if (Array.isArray(dataCopy) && dataCopy !== null) {
        try {
            dataCopy.forEach((item) => {
                item.start = moment(item.start).toDate()
                item.end = moment(item.end).toDate()
            })
        } catch {}
    }
    return dataCopy
}
