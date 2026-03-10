import React, { useState } from 'react';
import PropTypes from 'prop-types';

import Icon from '../Icon';
import './MaskSecret.css';

function MaskSecret({ value, className }) {
  const [revealed, setRevealed] = useState(false);

  return (
    <span className={['tyk-mask-secret', className].filter(Boolean).join(' ')}>
      <span className="tyk-mask-secret__value">
        {revealed ? (value || '-') : (value ? '•'.repeat(String(value).length) : '-')}
      </span>
      {value && (
        <button
          type="button"
          className="tyk-mask-secret__toggle"
          onClick={() => setRevealed((prev) => !prev)}
          aria-label={revealed ? 'Hide secret' : 'Show secret'}
        >
          <Icon type={revealed ? 'eye-slash' : 'eye'} />
        </button>
      )}
    </span>
  );
}

MaskSecret.propTypes = {
  className: PropTypes.string,
  value: PropTypes.oneOfType([
    PropTypes.string,
    PropTypes.number,
  ]),
};

export default MaskSecret;
