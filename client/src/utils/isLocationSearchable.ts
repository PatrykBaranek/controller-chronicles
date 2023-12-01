const isLocationSearchable = (location: string): boolean => {
  return (
    (location.slice(0, 6) === '/games' && location.slice(6, -1) === '') ||
    (location.slice(0, 9) === '/podcasts' && location.slice(6, -1) === '')
  );
};

export default isLocationSearchable;
