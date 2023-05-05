import React, { useContext } from 'react';
import PropTypes from 'prop-types';

import Collapsible from '../../Collapsible';
import AccordionItemContext from './AccordionItemContext';

function AccordionItemContent({ children, className }) {
  const { collapsed } = useContext(AccordionItemContext);

  const classes = [
    'tyk-accordion__item-content',
    className,
  ].filter(Boolean).join(' ');

  return (
    <div className={classes}>
      <Collapsible collapsed={collapsed}>
        { children }
      </Collapsible>
    </div>
  );
}

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
