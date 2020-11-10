import React from 'react';
import PropTypes from 'prop-types';

export const StringBuilderFooter = (props) => {
  const {
    note, error, inputInFocus, stringBuilderHeight, dropdownTriggerKey,
  } = props;
  return (
    <div
      style={{
        marginTop: stringBuilderHeight
          ? `${stringBuilderHeight - 8}px`
          : '30px',
      }}
    >
      {inputInFocus && (
        <p className="tyk-form-control__help-block">
          <span>
            Enter
            <span className="string_builder_trigger">{dropdownTriggerKey}</span>
            to add any parameter
          </span>
        </p>
      )}
      {note && <p className="tyk-form-control__help-block">{note}</p>}
      {error && error !== 'true' && error !== 'false' && (
        <p className="tyk-form-control__error-message">{error}</p>
      )}
    </div>
  );
};

StringBuilderFooter.propTypes = {
  note: PropTypes.string,
  error: PropTypes.string,
  dropdownTriggerKey: PropTypes.string,
  inputInFocus: PropTypes.bool,
  stringBuilderHeight: PropTypes.number,
};
