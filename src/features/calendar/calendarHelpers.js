import moment from 'moment';

// convert str dateTime to Date obj
export const jsonDateTimeConverter = (data) => {
  //.toISOString causes RBC crash on view change  
  data.forEach(item => {
      item.start = moment(item.start).toDate();
      item.end = moment(item.end).toDate();
    });
    return data
  }