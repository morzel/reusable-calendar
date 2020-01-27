export function getWeekDays() {
  const weekDays = ['M', 'T', 'W', 'T', 'F', 'S', 'S']
  return weekDays
}

export function getMonthYearDate(date: Date) {
  const monthNames = [
    'January',
    'February',
    'March',
    'April',
    'May',
    'June',
    'July',
    'August',
    'September',
    'October',
    'November',
    'December'
  ]
  const monthIndex = date.getMonth()
  const year = date.getFullYear()

  return monthNames[monthIndex] + ' ' + year
}

const daysInMonthCount = (month: number, year: number) =>
  new Date(year, month, 0).getDate()

const getArrayByBoundary = (start: number, end: number) => {
  const array: Array<number> = []
  for (let i = 0; i < end - start; i++) {
    array.push(i + start)
  }
  return array
}

export function getVisibleDays(month: number, year: number) {
  let offset = new Date(
    year + '-' + String(month + 1).padStart(2, '0') + '-01'
  ).getDay()
  offset = offset === 0 ? 7 : offset
  offset -= 1
  const previousMonth = month === 0 ? 11 : month - 1
  const previousYear = month === 0 ? year - 1 : year

  const currentMonthLength = daysInMonthCount(month + 1, year) + 1
  const previousMonthLength =
    daysInMonthCount(previousMonth + 1, previousYear) + 1

  const previous = getArrayByBoundary(
    previousMonthLength - offset,
    previousMonthLength
  )
  const current = getArrayByBoundary(1, currentMonthLength)
  const following = getArrayByBoundary(1, 43 - previous.length - current.length)
  return {
    startCurrent: previous.length,
    endCurrent: previous.length + current.length - 1,
    days: previous.concat(current).concat(following)
  }
}
