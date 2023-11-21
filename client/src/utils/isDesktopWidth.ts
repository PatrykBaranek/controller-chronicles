const isDesktopWidth = (windowWidth: number | undefined): boolean => {
  if (windowWidth) return windowWidth >= 900;
  return false;
};

export default isDesktopWidth;
