import React from 'react';
import PropTypes from 'prop-types';

import FloatingContainer from '../../FloatingContainer';

export const OptionsList = ({
  options, showOptions, handleOptionSelection, inputRef, getThemeClasses,
}) => {
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
        <ul
          className="string-builder-list"
        >
          {options.map(option => (
            <li key={option.id} onMouseDown={() => handleOptionSelection(option)}>
              <span className={`url-builder__options_name ${option.className}`}>{option.name}</span>
              {option.desc && (
                <span className="url-builder__options_description">
                  &nbsp;&nbsp;
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
  inputRef: PropTypes.instanceOf(Object),
};
