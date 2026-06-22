// Platform ids are IGDB platform ids (not RAWG). See https://api.igdb.com/v4/platforms
export const platforms = [
	{ id: 6, name: 'PC' },
	{ id: 167, name: 'PlayStation 5' },
	{ id: 169, name: 'Xbox Series S/X' },
	{ id: 48, name: 'PlayStation 4' },
	{ id: 49, name: 'Xbox One' },
	{ id: 130, name: 'Nintendo Switch' },
	{ id: 39, name: 'iOS' },
	{ id: 34, name: 'Android' },
	{ id: 37, name: 'Nintendo 3DS' },
	{ id: 20, name: 'Nintendo DS' },
];

// id is the server `ordering` token (see GetGameQueryParamsDto.Ordering)
export const sortingOptions = [
	{ id: 'popularity', name: 'Popularity' },
	{ id: 'name', name: 'Name' },
	{ id: 'released', name: 'Released' },
	{ id: 'rating', name: 'Rating' },
	{ id: 'updated', name: 'Updated' },
];
