import React, { useMemo } from 'react';
import PropTypes from 'prop-types';

import useDropdown from './useDropdown';
import DropdownTrigger from './DropdownTrigger';
import DropdownListWrapper from './DropdownListWrapper';
import DropdownItem from './DropdowItem';
import { DropdownContext } from './useDrodpownContext';

function Dropdown2({
  children,
  title,
  theme,
  splitTrigger,
  onChange,
  value,
  setSelectedValueAsTitle,
}) {
  const {
    isOpen,
    toggle,
    dropdownRef,
    dropdownListRef,
  } = useDropdown();

  const contextValue = useMemo(() => ({
    onChange,
    value,
  }), [onChange, value]);

  return (
    <DropdownContext.Provider
      value={contextValue}
    >
      <DropdownTrigger
        title={
          setSelectedValueAsTitle
            ? value
            : title
        }
        theme={theme}
        splitTrigger={splitTrigger}
        toggle={toggle}
        ref={dropdownRef}
      />
      {isOpen && (
        <DropdownListWrapper
          element={dropdownRef}
          ref={dropdownListRef}
        >
          { children }
        </DropdownListWrapper>
      )}
    </DropdownContext.Provider>
  );
}

Dropdown2.propTypes = {
  title: PropTypes.string,
  theme: PropTypes.string,
  children: PropTypes.node,
  splitTrigger: PropTypes.bool,
  onChange: PropTypes.func,
  value: PropTypes.oneOfType([
    PropTypes.string,
    PropTypes.number,
  ]),
  setSelectedValueAsTitle: PropTypes.bool,
};

Dropdown2.Item = DropdownItem;

export default Dropdown2;
