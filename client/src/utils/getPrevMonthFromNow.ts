const getPrevMonthFromNow = (currentDate: Date) => {
	return new Date(
		currentDate.getFullYear(),
		currentDate.getMonth() - 1,
		currentDate.getDate() + 1
	)
		.toISOString()
		.slice(0, 10);
};

export default getPrevMonthFromNow;
