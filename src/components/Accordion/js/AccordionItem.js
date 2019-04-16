import React, { useState } from 'react';
import PropTypes from 'prop-types';

import AccordionItemContext from './AccordionItemContext';

const AccordionItem = (props) => {
  const {
    collapsed,
    children,
  } = props;
  const [collapsedState, setCollapsedState] = useState(collapsed);

  const toggleChange = () => {
    setCollapsedState(!collapsedState);
  };

  return (
    <div className="tyk-accordion__item">
      <AccordionItemContext.Provider
        value={{
          collapsed: collapsedState,
          toggleChange,
        }}
      >
        {children}
      </AccordionItemContext.Provider>
    </div>
  );
};

AccordionItem.propTypes = {
  children: PropTypes.oneOfType([
    PropTypes.arrayOf(PropTypes.node),
    PropTypes.node,
    PropTypes.element,
    PropTypes.string,
  ]),
  collapsed: PropTypes.bool,
};

AccordionItem.defaultProps = {
  collapsed: false,
};

export default AccordionItem;
