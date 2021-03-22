const formatDate = (date: string): { isToday: boolean; getTime: string; withoutYear: string; getDate: string } => {
  const currentDate = new Date()

  const dateChanger = (inputDate: number) => {
    const strDate = inputDate.toString()
    return strDate.length < 2 ? `0${strDate}` : strDate
  }

  return {
    isToday:
      dateChanger(currentDate.getFullYear()) === date.slice(0, 4) &&
      dateChanger(currentDate.getMonth() + 1) === date.slice(5, 7) &&
      dateChanger(currentDate.getDate()) === date.slice(8, 10),
    getTime: `${date.slice(11, 13)}:${date.slice(14, 16)}`,
    withoutYear: `${date.slice(8, 10)}.${date.slice(5, 7)} - ${date.slice(11, 13)}:${date.slice(14, 16)}`,
    getDate: `${date.slice(8, 10)}.${date.slice(5, 7)}.${date.slice(0, 4)} - ${date.slice(11, 13)}:${date.slice(
      14,
      16
    )}`
  }
}

export default formatDate
