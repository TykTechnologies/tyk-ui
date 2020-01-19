import React from 'react';
import PropTypes from 'prop-types';

const Pill = (props) => {
  const {
    children,
    className,
    theme,
  } = props;

  const getCssClasses = () => {
    let cssClasses = [`tyk-pill tyk-pill--${theme}`];

    if (className) {
      cssClasses = cssClasses.concat(className.split(' '));
    }

    return cssClasses.join(' ');
  };

  return (
    <div className={getCssClasses()}>
      {children}
    </div>
  );
};

Pill.propTypes = {
  children: PropTypes.oneOfType([
    PropTypes.arrayOf(PropTypes.node),
    PropTypes.node,
    PropTypes.element,
    PropTypes.string,
  ]),
  className: PropTypes.string,
  theme: PropTypes.string,
};

Pill.defaultProps = {
  theme: 'default',
};

export default Pill;
