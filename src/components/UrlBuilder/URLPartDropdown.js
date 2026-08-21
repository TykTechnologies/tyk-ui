import React from 'react';
import PropTypes from 'prop-types';
import Icon from '../Icon';

const URLPartDropdown = ({
  type,
  value,
  options,
  isVisible,
  onChange,
  onStartEditing
}) => {
  if (!isVisible) {
    return null;
  }

  const handleOptionSelect = (option) => {
    onChange(type, option);
  };

  return (
    <div 
      className={`url-builder__dropdown url-builder__dropdown--${type.toLowerCase()}`}
      onClick={(e) => e.stopPropagation()}
    >
      <div className="url-builder__dropdown-header">
        {options.length > 0 ? (
          <>Select {type} or add custom</>
        ) : (
          <>Type to customize</>
        )}
      </div>
      {type !== 'method' && (
        <div
          className="url-builder__dropdown-custom"
          onClick={(e) => onStartEditing(e, type)}
        >
          <Icon type="pencil" weight="light" className="url-builder__dropdown-icon" />
          Add custom value
        </div>
      )}
      {options.length > 0 && (
        <>
          <div
            className="url-builder__dropdown-clear"
            onClick={() => handleOptionSelect('')}
          >
            Clear selection
          </div>
          {options.map(option => (
            <div
              key={option}
              className={`
                url-builder__dropdown-item
                ${value === (type === 'path' ? option.replace(/^\//, '') : option) ? 
                  'url-builder__dropdown-item--selected' : ''}
              `}
              onClick={() => handleOptionSelect(option)}
            >
              {option}
            </div>
          ))}
        </>
      )}
    </div>
  );
};

URLPartDropdown.propTypes = {
  type: PropTypes.string.isRequired,
  value: PropTypes.string,
  options: PropTypes.arrayOf(PropTypes.string),
  isVisible: PropTypes.bool,
  onChange: PropTypes.func.isRequired,
  onStartEditing: PropTypes.func.isRequired
};

export default URLPartDropdown;