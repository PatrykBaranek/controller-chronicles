const isDesktopWidth = (windowWidth: number | undefined) => {
  return windowWidth && windowWidth >= 900;
};

export default isDesktopWidth;
