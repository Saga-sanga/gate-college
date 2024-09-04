import { format, startOfWeek, endOfWeek } from 'date-fns'

export function getFormattedWeekRange(date: Date) {
  const weekStart = startOfWeek(date, { weekStartsOn: 0 }) // Sunday as start of week
  const weekEnd = endOfWeek(date, { weekStartsOn: 0 })

  const weekStartFormatted = format(weekStart, 'MMM d')
  const weekEndFormatted = format(weekEnd, 'd, yyyy')

  const startMonth = format(weekStart, 'MMM')
  const endMonth = format(weekEnd, 'MMM')

  if (startMonth === endMonth) {
    return `${weekStartFormatted} - ${weekEndFormatted}`
  } else {
    return `${weekStartFormatted} - ${endMonth} ${weekEndFormatted}`
  }
}
