const getGameIdFromUrl = (url: string) => {
  const regex = /\/[0-9]+\//i;
  const stringId = url.match(regex)![0];
  return stringId.replace(/[^a-zA-Z0-9 ]/g, '');
};

export default getGameIdFromUrl;
