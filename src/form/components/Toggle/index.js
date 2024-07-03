import React, {
  useCallback, useMemo, useRef, useState,
} from 'react';
import PropTypes from 'prop-types';

import ToggleContext from './js/ToggleContext';
import ToggleItemWrapper from './js/ToggleItemWrapper';

function Toggle({
  className,
  disabled,
  readOnly,
  size,
  theme,
  direction,
  onDark,
  wrapperClassName = '',
  onChange,
  labelwidth,
  label,
  separated,
  children,
  type,
  value,
  error,
  enabledReadOnlyText = 'Enabled',
  disabledReadOnlyText = 'Disabled',
}) {
  const [selectedRef, setSelectedRef] = useState(null);
  const notchRef = useRef();
  const toggleRef = useRef();

  const classes = [
    wrapperClassName,
    className,
    'tyk-toggle',
    `tyk-toggle--readonly-${readOnly}`,
    `tyk-toggle--disabled-${disabled}`,
    `tyk-toggle--${size || 'md'}`,
    `tyk-toggle--${theme}`,
    `tyk-toggle--${direction}`,
    onDark && 'tyk-toggle--on-dark',
  ].filter(Boolean).join(' ');

  const onItemSelected = useCallback((itemValue, event) => {
    if (!onChange) return;
    onChange(itemValue, event);
  }, [onChange]);

  const getLabelStyles = useCallback(() => {
    if (labelwidth) return { flexBasis: labelwidth };
    return {};
  }, [labelwidth]);

  const positionNotch = useCallback(() => {
    if (!selectedRef || separated) {
      return {};
    }

    const selectedWidth = selectedRef.current.offsetWidth;
    const selectedOffset = selectedRef.current.getBoundingClientRect().left;
    const toggleOffset = toggleRef.current.getBoundingClientRect().left;
    const left = selectedOffset - toggleOffset;

    return {
      left: `${left + 4}px`,
      width: `${selectedWidth - 8}px`,
    };
  }, [selectedRef, separated]);

  const contextValue = useMemo(() => ({
    disabled,
    readOnly,
    onItemSelected,
    saveSelectedRef: setSelectedRef,
    separated,
    type,
    value,
  }), [disabled, readOnly, onItemSelected, separated, type, value]);

  const getReadOnlyValue = () => {
    if(type !== 'multiple') {
      return value ? enabledReadOnlyText : disabledReadOnlyText;
    }

    return value;
  };

  return (
    <>
      <div className={classes} ref={toggleRef}>
        <ToggleContext.Provider
          value={contextValue}
        >
          {
            label
              ? <label className="tyk-toggle__label" style={getLabelStyles()}>{label}</label>
              : null
          }
          {!readOnly ?
            <ul className={`tyk-toggle__list tyk-toggle__list--${type} ${error && 'tyk-toggle__list--has-error'}  tyk-toggle__list--${separated ? 'separated' : 'not-separated'}`}>
              { children }
              {
                type === 'multiple' && !separated
                  ? <li className="tyk-toggle__notch" ref={notchRef} style={positionNotch()} />
                  : null
              }
            </ul>
            : <div className="tyk-form-control--readonly">
                {getReadOnlyValue()}
              </div>
          }
        </ToggleContext.Provider>
      </div>
      {
        error && (
          <p className="tyk-form-control__error-message">
            { error }
          </p>
        )
      }
    </>
  );
}

Toggle.propTypes = {
  children: PropTypes.oneOfType([
    PropTypes.arrayOf(PropTypes.node),
    PropTypes.node,
    PropTypes.element,
    PropTypes.string,
  ]),
  className: PropTypes.string,
  disabled: PropTypes.bool,
  readOnly: PropTypes.bool,
  error: PropTypes.string,
  onChange: PropTypes.func,
  label: PropTypes.oneOfType([
    PropTypes.arrayOf(PropTypes.node),
    PropTypes.node,
    PropTypes.element,
    PropTypes.func,
    PropTypes.string,
  ]),
  labelwidth: PropTypes.string,
  theme: PropTypes.string,
  type: PropTypes.string, // single || multiple
  size: PropTypes.string,
  separated: PropTypes.bool,
  direction: PropTypes.string,
  value: PropTypes.oneOfType([
    PropTypes.bool,
    PropTypes.string,
  ]),
  onDark: PropTypes.bool,
  wrapperClassName: PropTypes.string,
  enabledReadOnlyText: PropTypes.string,
  disabledReadOnlyText: PropTypes.string,
};

Toggle.defaultProps = {
  separated: false,
  theme: 'primary',
  type: 'single',
  direction: 'row',
};

Toggle.Item = ToggleItemWrapper;

export default Toggle;
