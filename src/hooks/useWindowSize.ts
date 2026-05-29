import { useState, useEffect } from 'react';

interface WindowSize {
  width: number;
  height: number;
}

const getWindowSize = (): WindowSize => ({
  width: window.innerWidth,
  height: window.innerHeight,
});

/** Tracks the viewport size, debounced to one update per 250ms of resizing. */
export const useWindowSize = (): WindowSize => {
  const [windowSize, setWindowSize] = useState<WindowSize>(getWindowSize);

  useEffect(() => {
    let timeoutId: ReturnType<typeof setTimeout>;

    const handleResize = () => {
      clearTimeout(timeoutId);
      timeoutId = setTimeout(() => setWindowSize(getWindowSize()), 250);
    };

    window.addEventListener('resize', handleResize);
    return () => {
      clearTimeout(timeoutId);
      window.removeEventListener('resize', handleResize);
    };
  }, []);

  return windowSize;
};
