import React from 'react';
import PropTypes from 'prop-types';

import FloatingContainer from '../../FloatingContainer';

export const OptionsList = ({
  options, showOptions, handleOptionSelection, inputRef,
}) => {
  console.log({ options, showOptions });

  if (!showOptions) {
    return null;
  }

  return (
    <FloatingContainer element={inputRef} size="matchElement">
      <ul className="url-builder__options">
        {options.map(option => (
          <li key={option.id} onMouseDown={() => handleOptionSelection(option)}>
            <span className="url-builder__options_name">{option.name}</span>
            {option.desc && (
              <span className="url-builder__options_description">
                {'  '}
                {option.desc}
              </span>
            )}
          </li>
        ))}
      </ul>
    </FloatingContainer>
  );
};

OptionsList.propTypes = {
  options: PropTypes.arrayOf(Object),
  showOptions: PropTypes.bool,
  handleOptionSelection: PropTypes.func,
  inputRef: PropTypes.instanceOf(Object),
};
