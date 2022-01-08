import React from 'react';
import PropTypes from 'prop-types';

import debounce from './index';

function Debounce({ func, wait, immediate }) {
  const cbb = (e) => {
    console.log(`Debounced log after ${wait}ms:`, e.target.value);
  };
  return (
    <div>
      <label>
        <span style={{ marginRight: '10px' }}>Type here (logs to the console):</span>
        <input type="text" onChange={debounce(func ?? cbb, wait, immediate)} />
      </label>
    </div>
  );
}

Debounce.propTypes = {
  func: PropTypes.func,
  wait: PropTypes.number,
  immediate: PropTypes.bool,
};

export default Debounce;
