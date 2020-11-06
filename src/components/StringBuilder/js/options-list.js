import React, { useState, useEffect } from 'react';
import PropTypes from 'prop-types';

import FloatingContainer from '../../FloatingContainer';

export const OptionsList = ({
  options,
  showOptions,
  handleOptionSelection,
  containerRef,
  getThemeClasses,
  setShowOptions,
  allowSearch,
}) => {
  const [filterValue, setFilterValue] = useState('');
  const [filteredOptions, setFilteredOptions] = useState(options);

  useEffect(() => {
    if (filterValue === '') {
      setFilteredOptions(options);
      return;
    }
    const newFilteredOptions = options.filter(
      option => option.name.toLowerCase().includes(filterValue.toLowerCase()),
    );
    setFilteredOptions(newFilteredOptions);
  }, [filterValue]);

  if (!showOptions) {
    return null;
  }

  return (
    <>
      <FloatingContainer
        className={`string-builder-dropdown tyk-form-group ${getThemeClasses().join(' ')}`}
        element={containerRef}
        size="matchElement"
      >
        {allowSearch && (
          <div className="string-builder-search">
            <input
              autoFocus
              className="tyk-form-control"
              value={filterValue}
              placeholder="Search parameter"
              onChange={(e) => {
                setFilterValue(e.target.value);
              }}
              onKeyDown={(e) => {
                if (
                  e.key === 'Escape'
                  || e.key === 'ArrowUp'
                  // || e.key === 'ArrowDown'
                  || e.key === 'Enter'
                ) {
                  setShowOptions(false);
                }
              }}
            />
          </div>
        )}
        <ul className="string-builder-list">
          {filteredOptions.map(option => (
            <li
              key={`${option.id}${Math.random()}`}
              onMouseDown={() => handleOptionSelection(option)}
            >
              <span className={`url-builder__options_name ${option.className || 'default-option-name'}`}>
                {option.name}
              </span>
              {option.desc && (
                <span className="url-builder__options_description">
                  &nbsp; : &nbsp;
                  {option.desc}
                </span>
              )}
            </li>
          ))}
        </ul>
      </FloatingContainer>
    </>
  );
};

OptionsList.propTypes = {
  options: PropTypes.arrayOf(Object),
  showOptions: PropTypes.bool,
  handleOptionSelection: PropTypes.func,
  getThemeClasses: PropTypes.func,
  setShowOptions: PropTypes.func,
  containerRef: PropTypes.instanceOf(Object),
  allowSearch: PropTypes.bool,
};
