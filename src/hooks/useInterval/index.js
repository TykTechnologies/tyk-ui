import { useEffect, useRef } from 'react';

/** @component */
export default function useInterval(callback, delay, ...args) {
  const savedCallback = useRef();

  useEffect(() => {
    savedCallback.current = callback;
  }, [callback]);

  /* eslint-disable consistent-return */
  useEffect(() => {
    function tick() {
      savedCallback.current(...args);
    }
    if (delay !== null && delay !== undefined) {
      const id = setInterval(tick, delay);
      return () => clearInterval(id);
    }
  }, [delay]);
  /* eslint-disable consistent-return */
}
