import { useEffect, useRef } from 'react';

const usePrevious = (value) => {
  const ref = useRef();
  useEffect(() => {
    ref.current = value;
  }, [value]);
  return ref.current;
};

/** @component */
export default usePrevious;
