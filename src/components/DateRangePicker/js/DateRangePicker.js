import React from 'react';
import PropTypes from 'prop-types';
import Datetime from 'react-datetime';
import moment from 'moment';

const DateRangePicker = (props) => {
  const {
    datePickOptions,
    onChange,
    withInput,
    value,
  } = props;

  const {
    startDate,
    endDate,
  } = value;

  const isStartDateValid = current => current.isSameOrBefore(endDate);
  const isEndDateValid = current => current.isSameOrAfter(startDate);

  const renderDay = (cellProps, currentDate) => <td {...cellProps}><span>{ `${currentDate.date() < 10 ? `0${currentDate.date()}` : currentDate.date()}` }</span></td>;

  const onStartDateChanged = (startDateValue) => {
    if (onChange) {
      onChange({
        startDate: startDateValue,
        endDate,
      });
    }
  };

  const onEndDateChanged = (endDateValue) => {
    if (onChange) {
      onChange({
        startDate,
        endDate: endDateValue,
      });
    }
  };

  return (
    <div className={`tyk-date-range-picker ${withInput ? '' : 'tyk-date-range-picker--no-input'}`}>
      <Datetime
        input={false}
        isValidDate={isStartDateValid}
        value={startDate}
        onChange={onStartDateChanged}
        renderDay={renderDay}
        {...datePickOptions}
      />
      <Datetime
        input={false}
        isValidDate={isEndDateValid}
        value={endDate}
        onChange={onEndDateChanged}
        renderDay={renderDay}
        {...datePickOptions}
      />
    </div>
  );
};

DateRangePicker.propTypes = {
  startDate: PropTypes.instanceOf(Object),
  endDate: PropTypes.instanceOf(Object),
  datePickOptions: PropTypes.instanceOf(Object),
  onChange: PropTypes.func,
  withInput: PropTypes.bool,
  value: PropTypes.instanceOf(Object),
};

DateRangePicker.defaultProps = {
  startDate: moment().subtract(1, 'day'),
  endDate: moment(),
  datePickOptions: {
    timeFormat: false,
  },
  withInput: false,
  value: {
    startDate: '',
    endDate: '',
  },
};

export default DateRangePicker;
