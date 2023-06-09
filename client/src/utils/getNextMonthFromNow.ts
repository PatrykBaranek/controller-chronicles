const getNextMonthFromNow = (currentDate: Date) => {
  if (currentDate.getMonth() === 11) {
    return new Date(currentDate.getFullYear() + 1, 0, 1)
      .toISOString()
      .slice(0, 10);
  } else {
    return new Date(
      currentDate.getFullYear(),
      currentDate.getMonth() + 1,
      currentDate.getDate() + 1
    )
      .toISOString()
      .slice(0, 10);
  }
};

export default getNextMonthFromNow;
