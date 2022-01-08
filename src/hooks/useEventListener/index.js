import { useEffect, useRef } from 'react';

const useEventListener = (eventName, handler, element) => {
  const savedHandler = useRef();
  useEffect(() => {
    savedHandler.current = handler;
  }, [handler]);

  useEffect(() => {
    const isSupported = element && element.addEventListener;
    if (!isSupported) {
      // eslint-disable-next-line consistent-return
      return;
    }

    const eventListener = event => savedHandler.current(event);
    element.addEventListener(eventName, eventListener);

    // eslint-disable-next-line consistent-return
    return () => {
      element.removeEventListener(eventName, eventListener);
    };
  }, [eventName, element]);
};

/** @component */
export default useEventListener;
