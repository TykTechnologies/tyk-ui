import React, { forwardRef } from 'react';
import PropTypes from 'prop-types';

import FloatingContainer from '../../../components/FloatingContainer';
import List from '../../../components/List';

const DropdownListWrapper = forwardRef(({
  children,
  element,
  theme,
  maxWidth,
}, ref) => (
  <FloatingContainer
    element={element}
    ref={ref}
    className="dropdown__menu"
    position="bottom"
    alignment="auto"
    offset={5}
    arrow
  >
    <List
      style={{
        ...maxWidth && { maxWidth },
      }}
      theme={theme}
    >
      { children }
    </List>
  </FloatingContainer>
));

DropdownListWrapper.propTypes = {
  element: PropTypes.shape({
    current: PropTypes.instanceOf(Element),
  }),
  children: PropTypes.oneOfType([
    PropTypes.arrayOf(PropTypes.node),
    PropTypes.node,
    PropTypes.element,
    PropTypes.string,
  ]),
  theme: PropTypes.string,
  maxWidth: PropTypes.string,
};

export default DropdownListWrapper;
