import React, { useContext } from 'react';
import PropTypes from 'prop-types';

import Icon from '../../Icon';
import AccordionItemContext from './AccordionItemContext';

const AccordionItemHeader = (props) => {
  const {
    children,
  } = props;
  const accordionItemContext = useContext(AccordionItemContext);
  const {
    collapsed,
    toggleChange,
  } = accordionItemContext;
  const iconType = !collapsed ? 'chevron-down' : 'chevron-up';

  return (
    <div
      className="tyk-accordion__item-header"
    >
      <button
        onClick={toggleChange}
        type="button"
      >
        <span>{children}</span>
        <Icon className="collapsable__arrow" type={iconType} />
      </button>
    </div>
  );
};

AccordionItemHeader.propTypes = {
  children: PropTypes.oneOfType([
    PropTypes.arrayOf(PropTypes.node),
    PropTypes.node,
    PropTypes.element,
    PropTypes.string,
  ]),
};

export default AccordionItemHeader;
