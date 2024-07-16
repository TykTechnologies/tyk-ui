import React, {
  useEffect, useState, useRef, useCallback,
} from 'react';
import PropTypes from 'prop-types';
import flatpickr from 'flatpickr';

import Icon from '../../../components/Icon';
import { usePrevious } from '../../../hooks';

function DatePicker({
  children,
  disabled,
  readOnly = false,
  error,
  id,
  label,
  labelwidth,
  note,
  onClose,
  onChange,
  onOpen,
  theme,
  config = {},
  value,
  wrapperClassName = '',
}) {
  const [pickerInstance, setPickerInstance] = useState(null);
  const dateRef = useRef(null);

  const prevValue = usePrevious(value);

  const hasValueChanged = useCallback((prevDate, currentDate) => {
    if (!prevDate) return true;
    if (!Array.isArray(currentDate)) return prevDate.getTime() !== currentDate.getTime();

    let diffDates = currentDate;

    if (prevDate && currentDate.length && prevDate.length) {
      diffDates = currentDate.filter((date, index) => date.getTime() !== prevDate[index].getTime());

      return diffDates.length > 0;
    }

    return currentDate.length > 0;
  }, []);

  const onDateChange = useCallback((dateValue) => {
    const finalValue = config.mode === 'range' ? dateValue : dateValue[0] || null;

    if (!onChange) return;

    if (config.mode === 'range') {
      if (finalValue.length === 2 && hasValueChanged(prevValue, finalValue)) {
        onChange(finalValue);
      }
    } else {
      onChange(finalValue);
    }
  }, [prevValue, onChange, hasValueChanged]);

  useEffect(() => {
    if (dateRef.current && !pickerInstance) {
      const instance = flatpickr(dateRef.current, {
        ...config, defaultDate: value, onChange: onDateChange, onClose, onOpen,
      });
      setPickerInstance(instance);
    }

    return () => {
      if (pickerInstance) {
        pickerInstance.destroy();
      }
    };
  }, [pickerInstance]);

  useEffect(() => {
    if (pickerInstance) {
      let tempValue = value;

      if (typeof value === 'string') {
        tempValue = new Date(value);
      } else if (Array.isArray(value)) {
        tempValue = value.map((date) => new Date(date));
      }

      if (hasValueChanged(prevValue, tempValue)) {
        pickerInstance.set('onChange', onDateChange);
        if (config.mode === 'range') {
          if (tempValue && tempValue.length === 2) {
            pickerInstance.setDate(tempValue, true);
          }
        } else {
          pickerInstance.setDate(tempValue, true);
        }
      }
    }
  }, [prevValue, value, pickerInstance]);

  const classes = [
    'tyk-form-group',
    'tyk-form-group--addon-right',
    wrapperClassName,
    ...(theme ? theme.split(' ').map((t) => `tyk-form-group--${t}`) : []),
    labelwidth && 'tyk-form-group--label-has-width',
    error && 'has-error',
  ].filter(Boolean).join(' ');

  const getLabelStyles = () => {
    if (labelwidth) return { flexBasis: labelwidth };
    return {};
  };

  const getNonLabelWidth = () => {
    if (labelwidth) return { flexBasis: `calc(100% - ${labelwidth} - 20px)` };
    return {};
  };

  const openCalendar = useCallback(() => {
    if (!pickerInstance) return;

    pickerInstance.open();
  }, [pickerInstance]);

  const getInputError = () => (
    (error && error !== 'true' && error !== 'false')
      ? (
        <p className="tyk-form-control__error-message">
          { error }
        </p>
      )
      : null
  );

  const getInputField = () => {
    let inputStyle = {};
    let addonStyle = {};

    if (config?.inline) {
      inputStyle = {
        height: 0,
        padding: 0,
        width: 0,
        visibility: 'hidden',
      };

      addonStyle = {
        display: 'none',
      };
    }
    return (
      <>
        <input
          disabled={disabled}
          className="tyk-form-control"
          data-input
          type="date"
          ref={dateRef}
          style={inputStyle}
        />
        <div
          className="tyk-input-group__addon"
          onClick={openCalendar}
          role="button"
          onKeyUp={() => {}}
          tabIndex={0}
          style={addonStyle}
          aria-label="show calendar"
        >
          <Icon type="calendar" />
        </div>
      </>
    );
  };

  return (
    <>
      {
        children?.length
          ? children({ openCalendar, ref: dateRef })
          : (
            <div className={classes}>
              {
                label
                  ? <label htmlFor={id} style={getLabelStyles()}>{ label }</label>
                  : null
              }
              {!readOnly && (
                <div
                  className="tyk-form-control__wrapper flatpickr"
                  style={getNonLabelWidth()}
                >
                  <div className="tyk-input-group">
                    {getInputField()}
                  </div>
                  {
                    note
                      ? <p className="tyk-form-control__help-block">{ note }</p>
                      : null
                  }
                  { getInputError() }
                </div>
              )}
            </div>
          )
      }
      {readOnly && <div className="tyk-form-control--readonly">
        {readOnly && !value && '-'}
        {readOnly && value && flatpickr.formatDate(value, config.dateFormat || 'd/m/Y')}
      </div>}
    </>
  );
}

DatePicker.propTypes = {
  config: PropTypes.instanceOf(Object),
  children: PropTypes.oneOfType([
    PropTypes.element,
    PropTypes.node,
    PropTypes.string,
    PropTypes.func,
  ]),
  disabled: PropTypes.bool,
  readOnly: PropTypes.bool,
  id: PropTypes.string,
  label: PropTypes.oneOfType([
    PropTypes.arrayOf(PropTypes.node),
    PropTypes.node,
    PropTypes.element,
    PropTypes.func,
    PropTypes.string,
  ]),
  labelwidth: PropTypes.string,
  note: PropTypes.string,
  onChange: PropTypes.oneOfType([
    PropTypes.func,
    PropTypes.instanceOf(Array),
  ]),
  onClose: PropTypes.oneOfType([
    PropTypes.func,
    PropTypes.instanceOf(Array),
  ]),
  onOpen: PropTypes.oneOfType([
    PropTypes.func,
    PropTypes.instanceOf(Array),
  ]),
  theme: PropTypes.string,
  error: PropTypes.string,
  value: PropTypes.oneOfType([
    PropTypes.instanceOf(Array),
    PropTypes.instanceOf(Object),
    PropTypes.string,
  ]),
  wrapperClassName: PropTypes.string,
};

export default DatePicker;
