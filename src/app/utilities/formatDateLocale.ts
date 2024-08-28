export const formatDateLocale = (timestamp: string): string => {
  const date = new Date(timestamp)

  return date.toLocaleDateString('en-US', {
    year: 'numeric',
    month: 'long',
    day: 'numeric',
  })
}
