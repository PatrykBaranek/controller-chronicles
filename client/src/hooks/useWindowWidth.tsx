import { useState, useLayoutEffect } from 'react';

const useWindowWidth = () => {
  const [size, setSize] = useState<number>();
  useLayoutEffect(() => {
    const updateSize = () => {
      setSize(window.innerWidth);
    };
    window.addEventListener('resize', updateSize);
    updateSize();
    return () => window.removeEventListener('resize', updateSize);
  }, []);
  return size;
};

export default useWindowWidth;
