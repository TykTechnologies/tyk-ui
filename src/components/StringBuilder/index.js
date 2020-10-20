import React, { useEffect, useState } from 'react';

const StringBuilder = () => {
  const [value, setValue] = useState('myValue');

  useEffect(() => {
    console.log({ value });
  }, [value]);

  return (
    <div className="string-builder">
      <input className="string-builder__input" value={value} onChange={e => setValue(e.target.value)} />
      <div className="string-builder__styled">
        {value}
        {' '}
        <span className="string-builder__highlight">token</span>
      </div>
    </div>
  );
};

export default StringBuilder;
