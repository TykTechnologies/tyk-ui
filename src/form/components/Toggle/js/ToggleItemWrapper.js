import React, { forwardRef } from 'react';
import PropTypes from 'prop-types';

import ToggleContext from './ToggleContext';
import ToggleItem from './ToggleItem';

function ToggleItemWrapper({ children, ...rest }, ref) {
  return (
    <ToggleContext.Consumer>
      {(context) => (
        <ToggleItem {...rest} context={context} ref={ref}>
          {children}
        </ToggleItem>
      )}
    </ToggleContext.Consumer>
  );
}

ToggleItemWrapper.propTypes = {
  children: PropTypes.oneOfType([
    PropTypes.arrayOf(PropTypes.node),
    PropTypes.node,
    PropTypes.element,
    PropTypes.string,
  ]),
};

export default forwardRef(ToggleItemWrapper);
