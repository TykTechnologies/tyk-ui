import React, {
  Fragment, useEffect, useState, useRef, useCallback,
} from 'react';
import PropTypes from 'prop-types';
import flatpickr from 'flatpickr';
import Icon from '../../../components/Icon';

import '../../../../node_modules/flatpickr/dist/flatpickr.min.css';
import { usePrevious } from '../../../common/js/hooks';

const DatePicker = (props) => {
  const {
    children,
    disabled,
    error,
    id,
    label,
    labelwidth,
    note,
    onClose,
    onChange,
    onOpen,
    theme,
    config,
    value,
  } = props;
  const [pickerInstance, setPickerInstance] = useState(null);
  const dateRef = useRef(null);

  const prevValue = usePrevious(value);

  const hasValueChanged = (prevDate, currentDate) => {
    if (!prevDate) {
      return true;
    }

    if (!Array.isArray(currentDate)) {
      return prevDate.getTime() !== currentDate.getTime();
    }
    let diffDates = currentDate;

    if (prevDate && currentDate.length && prevDate.length) {
      diffDates = currentDate.filter((date, index) => date.getTime() !== prevDate[index].getTime());

      return diffDates.length > 0;
    }

    return currentDate.length > 0;
  };

  const onDateChange = useCallback((dateValue) => {
    const finalValue = config.mode === 'range' ? dateValue : dateValue[0] || null;

    if (onChange) {
      if (config.mode === 'range') {
        if (finalValue.length === 2 && hasValueChanged(prevValue, finalValue)) {
          onChange(finalValue);
        }
      } else {
        onChange(finalValue);
      }
    }
  }, [prevValue]);

  useEffect(() => {
    if (dateRef && dateRef.current && !pickerInstance) {
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
  }, [dateRef.current, pickerInstance]);

  useEffect(() => {
    if (pickerInstance) {
      let tempValue = value;

      if (typeof value === 'string') {
        tempValue = new Date(value);
      } else if (Array.isArray(value)) {
        tempValue = value.map(date => (typeof date === 'string' ? new Date(date) : date));
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

  const getCssClasses = () => {
    const cssClasses = ['tyk-form-group tyk-form-group--addon-right'];
    const themes = theme ? theme.split(' ') : [];

    if (themes.length) {
      themes.forEach((iTheme) => {
        cssClasses.push(`tyk-form-group--${iTheme}`);
      });
    }

    if (labelwidth) {
      cssClasses.push('tyk-form-group--label-has-width');
    }

    if (error) {
      cssClasses.push('has-error');
    }

    return cssClasses.join(' ');
  };

  const getLabelStyles = () => {
    const styles = {};

    if (labelwidth) {
      styles.flexBasis = labelwidth;
    }

    return styles;
  };

  const getNonLabelWidth = () => {
    const styles = {};

    if (labelwidth) {
      styles.flexBasis = `calc(100% - ${labelwidth} - 20px)`;
    }

    return styles;
  };

  const openCalendar = useCallback(() => {
    if (!pickerInstance) {
      return;
    }

    pickerInstance.open();
  }, [pickerInstance]);

  const getInputError = () => (
    (error && error !== 'true' && error !== 'false')
      ? (
        <p
          className="tyk-form-control__error-message"
        >
          { error }
        </p>
      )
      : null
  );

  const getInputField = () => {
    let inputStyle = {};
    let addonStyle = {};

    if (config && config.inline) {
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
      <Fragment>
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
        >
          <Icon type="calendar" />
        </div>
      </Fragment>
    );
  };

  return (
    <Fragment>
      {
        children && children.length
          ? (
            <Fragment>
              {children(
                {
                  openCalendar,
                  ref: dateRef,
                },
              )}
            </Fragment>
          )
          : (
            <div className={getCssClasses()}>
              {
                label
                  ? <label htmlFor={id} style={getLabelStyles()}>{ label }</label>
                  : null
              }
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
            </div>
          )
      }
    </Fragment>
  );
};

DatePicker.propTypes = {
  config: PropTypes.instanceOf(Object),
  children: PropTypes.oneOfType([
    PropTypes.element,
    PropTypes.node,
    PropTypes.string,
    PropTypes.func,
  ]),
  disabled: PropTypes.bool,
  id: PropTypes.string,
  label: PropTypes.string,
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
};

DatePicker.defaultProps = {
  config: {},
};

export default DatePicker;
