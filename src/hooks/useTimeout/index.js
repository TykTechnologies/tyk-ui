import { useEffect, useRef } from 'react';

const useTimeout = (callback, delay) => {
  const savedCallback = useRef();

  useEffect(
    () => {
      savedCallback.current = callback;
    },
    [callback],
  );

  useEffect(
    () => {
      function tick() {
        savedCallback.current();
      }
      if (delay !== null) {
        const id = setTimeout(tick, delay);
        return () => clearTimeout(id);
      }

      return () => {};
    },
    [delay],
  );
};

/** @component */
export default useTimeout;
