import React, { useState, useEffect } from 'react';
import PropTypes from 'prop-types';

import FloatingContainer from '../../FloatingContainer';

export const OptionsList = ({
  options,
  showOptions,
  handleOptionSelection,
  inputRef,
  getThemeClasses,
  filterList,
  setShowOptions,
  allowSearch,
}) => {
  const [filterValue, setFilterValue] = useState('');
  const [filteredOptions, setFilteredOptions] = useState(options);

  useEffect(() => {
    if (filterValue) {
      const newFilteredOptions = options.filter(
        option => option.name.toLowerCase().includes(filterValue.toLowerCase()),
      );
      setFilteredOptions(newFilteredOptions);
    }
  }, [filterValue]);

  if (!showOptions) {
    return null;
  }

  return (
    <>
      <FloatingContainer
        className={`string-builder-dropdown tyk-form-group ${getThemeClasses().join(' ')}`}
        element={inputRef}
        size="matchElement"
      >
        {allowSearch && (
          <div className="string-builder-search">
            <input
              className="tyk-form-control"
              value={filterValue}
              placeholder="Search parameter"
              onChange={(e) => {
                filterList(e.target.value);
                setFilterValue(e.target.value);
              }}
              onKeyDown={(e) => {
                if (
                  e.key === 'Escape'
                  || e.key === 'ArrowUp'
                  || e.key === 'ArrowDown'
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
              key={option.id}
              onMouseDown={() => handleOptionSelection(option)}
            >
              <span className={`url-builder__options_name ${option.className}`}>
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
  filterList: PropTypes.func,
  setShowOptions: PropTypes.func,
  inputRef: PropTypes.instanceOf(Object),
  allowSearch: PropTypes.bool,
};
