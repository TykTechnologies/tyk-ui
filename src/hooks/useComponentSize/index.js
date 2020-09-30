import { useCallback, useState, useLayoutEffect } from 'react';
import ResizeObserver from 'resize-observer-polyfill';

const getSize = (el) => {
  if (!el) {
    return {
      width: 0,
      height: 0,
    };
  }

  return {
    width: el.offsetWidth,
    height: el.offsetHeight,
  };
};

const useComponentSize = (ref) => {
  const [ComponentSize, setComponentSize] = useState(getSize(ref ? ref.current : {}));
  const handleResize = useCallback(() => {
    if (ref.current) {
      setComponentSize(getSize(ref.current));
    }
  }, [ref]);

  useLayoutEffect(() => {
    handleResize();

    let resizeObserver = new ResizeObserver(() => {
      handleResize();
    });
    resizeObserver.observe(ref.current);

    return () => {
      resizeObserver.disconnect(ref.current);
      resizeObserver = null;
    };
  }, [ref.current]);

  return ComponentSize;
};

export default useComponentSize;
