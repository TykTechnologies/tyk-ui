import React from 'react';
import DateTimePicker from 'react-datetime-picker';

const DTP = (props) => {
  console.log(props);

  const onChange = (value) => {
    console.log(value);
  };

  return (
    <div>
      <DateTimePicker
        onChange={onChange}
        value={new Date()}
      />
    </div>
  );
};

export default DTP;
