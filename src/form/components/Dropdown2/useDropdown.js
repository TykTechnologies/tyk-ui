import {
  useState, useRef, useCallback, useEffect,
} from 'react';

const useDropdown = () => {
  const [isOpen, setIsOpen] = useState(false);
  const dropdownRef = useRef(null);
  const dropdownListRef = useRef(null);

  const toggle = () => setIsOpen(!isOpen);

  const handleOutsideClick = useCallback((e) => {
    if (
      isOpen
      && !dropdownRef.current.contains(e.target)
      && !dropdownListRef.current.contains(e.target)
    ) {
      setIsOpen(false);
    }
  }, [isOpen]);

  useEffect(() => {
    document.addEventListener('mousedown', handleOutsideClick);
    return () => {
      document.removeEventListener('mousedown', handleOutsideClick);
    };
  }, [handleOutsideClick]);

  return {
    isOpen,
    toggle,
    dropdownRef,
    dropdownListRef,
  };
};

export default useDropdown;
