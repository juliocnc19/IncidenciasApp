export const formatDate = (dateISO: string): string => {
  const date = new Date(dateISO)
  const day = date.getDate()
  const month = date.getMonth() + 1
  const year = date.getFullYear()
  const hour = date.getHours()
  const minute = date.getMinutes()
  return `${day}/${month}/${year} ${hour}:${minute}`
}
