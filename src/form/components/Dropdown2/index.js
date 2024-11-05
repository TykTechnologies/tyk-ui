import React, { useMemo } from 'react';
import PropTypes from 'prop-types';

import useDropdown from './useDropdown';
import DropdownTrigger from './DropdownTrigger';
import DropdownListWrapper from './DropdownListWrapper';
import DropdownItem from './DropdownItem';
import { DropdownContext } from './useDrodpownContext';

function Dropdown2({
  children,
  title,
  theme,
  splitTrigger,
  onChange,
  value,
  setSelectedValueAsTitle,
  maxWidth,
  onTriggerClick,
}) {
  const {
    isOpen,
    toggle,
    dropdownRef,
    dropdownListRef,
  } = useDropdown({
    splitTrigger,
  });

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
        onTriggerClick={onTriggerClick}
        theme={theme}
        splitTrigger={splitTrigger}
        toggle={toggle}
        ref={dropdownRef}
        value={value}
      />
      {isOpen && (
        <DropdownListWrapper
          element={dropdownRef}
          ref={dropdownListRef}
          maxWidth={maxWidth}
        >
          { children }
        </DropdownListWrapper>
      )}
    </DropdownContext.Provider>
  );
}

Dropdown2.propTypes = {
  /** Title of the dropdown. It is being displayed in the Drodpown trigger */
  title: PropTypes.string,
  /** Theme of the dropdown trigger */
  theme: PropTypes.string,
  children: PropTypes.node,
  /** If true, the dropdown trigger will be split into two buttons.
   *  one with the dropdown title and one for the arrow */
  splitTrigger: PropTypes.bool,
  /** Callback function called when a dropdown item is selected */
  onChange: PropTypes.func,
  /** Value of the selected dropdown item */
  value: PropTypes.oneOfType([
    PropTypes.string,
    PropTypes.number,
  ]),
  /** If true, the selected value will be displayed in the dropdown trigger */
  setSelectedValueAsTitle: PropTypes.bool,
  /** sets the maximum width of the dropdown list menu */
  maxWidth: PropTypes.string,
  /** this function is being called when splitTrigger is true,
   * and receives as parameter the current value of the dropdown */
  onTriggerClick: PropTypes.func,
};

Dropdown2.Item = DropdownItem;

export default Dropdown2;
