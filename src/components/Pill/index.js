import React from 'react';
import PropTypes from 'prop-types';
/**
 * Pill
 *
 */
function Pill(props) {
  const {
    children,
    className,
    theme,
  } = props;

  const getCssClasses = () => {
    let cssClasses = ['tyk-pill', ...theme.split(' ').map((t) => `tyk-pill--${t}`)];

    if (className) {
      cssClasses = cssClasses.concat(className);
    }

    return cssClasses.join(' ');
  };

  return (
    <div className={getCssClasses()}>
      {children}
    </div>
  );
}

Pill.propTypes = {
  children: PropTypes.oneOfType([
    PropTypes.arrayOf(PropTypes.node),
    PropTypes.node,
    PropTypes.element,
    PropTypes.string,
  ]),
  /** Css classes that can be passed to the Pill element */
  className: PropTypes.string,
  /** Theme that can be applied to a Pill */
  theme: PropTypes.string,
};

Pill.defaultProps = {
  theme: 'default',
};

export default Pill;
