import React, { useContext } from 'react';
import PropTypes from 'prop-types';

import Collapsible from '../../Collapsible';
import AccordionItemContext from './AccordionItemContext';

const AccordionItemContent = (props) => {
  const {
    children,
  } = props;
  const accordionItemContext = useContext(AccordionItemContext);

  return (
    <div className="tyk-accordion__item-content">
      <Collapsible
        collapsed={accordionItemContext.collapsed}
      >
        { children }
      </Collapsible>
    </div>
  );
};

AccordionItemContent.propTypes = {
  children: PropTypes.oneOfType([
    PropTypes.arrayOf(PropTypes.node),
    PropTypes.node,
    PropTypes.element,
    PropTypes.string,
  ]),
};

export default AccordionItemContent;
