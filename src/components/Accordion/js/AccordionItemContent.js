import React, { useContext } from 'react';
import PropTypes from 'prop-types';

import Collapsible from '../../Collapsible';
import AccordionItemContext from './AccordionItemContext';

const AccordionItemContent = (props) => {
  const {
    children,
    className,
  } = props;
  const accordionItemContext = useContext(AccordionItemContext);

  const getCssClasses = () => {
    let cssClasses = ['tyk-accordion__item-content'];

    if(className) {
      cssClasses = cssClasses.concat(className.split(' '));
    }

    return cssClasses.join(' ');
  };

  return (
    <div className={getCssClasses()}>
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
  className: PropTypes.string,
};

export default AccordionItemContent;
