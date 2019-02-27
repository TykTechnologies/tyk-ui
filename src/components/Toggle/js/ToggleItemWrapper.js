import React from 'react';
import PropTypes from 'prop-types';

import ToggleContext from './ToggleContext';
import ToggleItem from './ToggleItem';

const ToggleItemWrapper = React.forwardRef((props, ref) => (
  <ToggleContext.Consumer>
    {context => (
      <ToggleItem {...props} context={context} ref={ref}>
        {props.children}
      </ToggleItem>
    )}
  </ToggleContext.Consumer>
));

ToggleItemWrapper.propTypes = {
  children: PropTypes.oneOfType([
    PropTypes.arrayOf(PropTypes.node),
    PropTypes.node,
    PropTypes.element,
    PropTypes.string,
  ]),
};

export default ToggleItemWrapper;
