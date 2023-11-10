import dayjs, { type Dayjs } from 'dayjs';
export const dateFormat = 'YYYY-MM-DD';

type Params = {
	platforms?: string;
	stores?: string;
	sort?: string;
	dates?: string;
	order?: string;
};

const formatDate = (from: Dayjs | undefined, to: Dayjs | undefined): string | undefined => {
	if (!from && !to) return undefined;

	if (from && !to) {
		return `${from.format(dateFormat)},${dayjs().add(1, 'year').format(dateFormat)}`;
	}
	if (!from && to) {
		return to.format(dateFormat);
	}

	return `${from?.format(dateFormat)},${to?.format(dateFormat)}`;
};

const formatParams = (params: Params) => {
	const sortOption = params.sort && (!params.order ? `${params.sort}` : `-${params.sort}`);
	const newParams: Partial<Params> = {};
	for (const [key, value] of Object.entries({ ...params, sort: sortOption })) {
		if (value) {
			newParams[key.toLowerCase() as keyof Params] = value.toLowerCase();
		}
	}
	return newParams;
};

export { formatDate, formatParams };
