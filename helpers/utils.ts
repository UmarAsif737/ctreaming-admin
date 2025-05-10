export const daysDifference = (date_1: string, date_2: string) => {
  // Define two dates
  const date1 = new Date(date_1) // Earlier date
  const date2 = new Date(date_2) // Later date

  // Get the time difference in milliseconds
  const timeDifference = date2.getTime() - date1.getTime()

  // Convert the difference to days
  const daysDifference = timeDifference / (1000 * 60 * 60 * 24)

  return daysDifference
}
