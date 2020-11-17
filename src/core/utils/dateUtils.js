import moment from 'moment'


export const filterDate = (dateStr, type) => {
  let date = moment(dateStr, 'YYYY-MM-DD HH:mm')
  let today = moment('2020-09-14 15:15', 'YYYY-MM-DD HH:mm')

  if (type === 'three_months') {
    return today.diff(date, 'months') < 3
  } else if (type === 'six_months') {
    return today.diff(date, 'months') < 6
  } else if (type === 'week') { 
    return today.diff(date, 'days') < 7
  } else if (type === 'year') {
    return date.isSame(today, 'year')
  } else if (type === 'month') {
    return date.isSame(today, 'year') && date.isSame(today, 'month')
  } else if (type === 'day') {
    return date.isSame(today, 'year') && date.isSame(today, 'month') && date.isSame(today, 'day')
  }

  return true;
}
