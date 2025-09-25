import React, { useState } from 'react';
import PropTypes from 'prop-types';
import URLPartActions from './URLPartActions';
import URLPartDropdown from './URLPartDropdown';

const URLPart = ({
  type,
  value,
  options,
  isEditing,
  isFocused,
  isDisabled,
  onEdit,
  onChange,
  onClear,
  onPartClick,
  onStartEditing,
  onFinishEditing,
  inputRef,
  placeholder
}) => {
  const [customInput, setCustomInput] = useState('');
  const isPlaceholder = !value || value === '';

  const getDisplayValue = () => {
    if (!value) {
      return placeholder;
    }
    if (type === 'path') {
      return value ? `/${value}` : placeholder;
    }
    return value;
  };

  const handleKeyDown = (e) => {
    if (e.key === 'Enter') {
      handleCustomInput();
    }
  };

  const handleCustomInput = () => {
    if (customInput.trim()) {
      onChange(type, customInput.trim());
      setCustomInput('');
    }
    onFinishEditing();
  };

  const handleInputChange = (e) => {
    const newValue = e.target.value;
    setCustomInput(newValue);
    onEdit(e, type);
  };

  const handleInputBlur = () => {
    handleCustomInput();
  };

  return (
    <div
      className={`
        url-builder__part
        url-builder__part--${type.toLowerCase()}
        ${isPlaceholder ? 'url-builder__part--placeholder' : ''}
        ${isFocused ? 'url-builder__part--focused' : ''}
        ${isDisabled ? 'url-builder__part--disabled' : ''}
      `}
    >
      {isEditing && type !== 'method' ? (
        <input
          ref={inputRef}
          value={value}
          onChange={handleInputChange}
          onKeyDown={handleKeyDown}
          onBlur={handleInputBlur}
          placeholder={`${placeholder} or type custom value`}
          className="url-builder__input"
          onClick={(e) => e.stopPropagation()}
          disabled={isDisabled}
        />
      ) : (
        <div
          className="url-builder__value"
          onClick={(e) => onPartClick(type, e)}
          onDoubleClick={(e) => type !== 'method' && onStartEditing(e, type)}
        >
          {getDisplayValue()}
        </div>
      )}

      <URLPartActions
        type={type}
        isEditing={isEditing}
        isPlaceholder={isPlaceholder}
        isDisabled={isDisabled}
        onEdit={onStartEditing}
        onClear={onClear}
      />

      <URLPartDropdown
        type={type}
        value={value}
        options={options}
        isVisible={isFocused && !isDisabled && !isEditing}
        onChange={onChange}
        onStartEditing={onStartEditing}
      />
    </div>
  );
};

URLPart.propTypes = {
  type: PropTypes.string.isRequired,
  value: PropTypes.string,
  options: PropTypes.arrayOf(PropTypes.string),
  isEditing: PropTypes.bool,
  isFocused: PropTypes.bool,
  isDisabled: PropTypes.bool,
  onEdit: PropTypes.func.isRequired,
  onChange: PropTypes.func.isRequired,
  onClear: PropTypes.func.isRequired,
  onPartClick: PropTypes.func.isRequired,
  onStartEditing: PropTypes.func.isRequired,
  onFinishEditing: PropTypes.func.isRequired,
  inputRef: PropTypes.object,
  placeholder: PropTypes.string.isRequired
};

export default URLPart;