const isLocationSearchable = (location: string): boolean => {
  return location.slice(0, 6) === '/games' || location.slice(0, 9) === '/podcasts';
};

export default isLocationSearchable;
