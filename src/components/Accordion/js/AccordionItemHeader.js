import React, { useContext } from 'react';
import PropTypes from 'prop-types';

import Icon from '../../Icon';
import AccordionContext from './AccordionContext';
import AccordionItemContext from './AccordionItemContext';
import ItemTrigger from './AccordionItemTrigger';

function AccordionItemHeader({ className, children }) {
  const { collapsed, disabled, toggleChange } = useContext(AccordionItemContext);
  const { usearrowastrigger, arrow } = useContext(AccordionContext);
  const iconType = collapsed ? 'chevron-down' : 'chevron-up';
  const classes = [
    'tyk-accordion__item-header',
    usearrowastrigger && 'tyk-accordion__arrow-trigger',
    className,
  ].filter(Boolean).join(' ');

  return (
    <div className={classes}>
      {
        !usearrowastrigger
          ? (
            <button
              className={disabled ? 'tyk-accordion__trigger--disabled' : ''}
              onClick={toggleChange}
              type="button"
            >
              <span>{children}</span>
              <Icon className="collapsable__arrow" type={iconType} />
            </button>
          )
          : (
            <>
              {!arrow.expandToContent && arrow.position === 'left' && (
                <ItemTrigger />
              )}
              <div>{children}</div>
              {!arrow.expandToContent && arrow.position === 'right' && (
                <ItemTrigger />
              )}
            </>
          )
      }
    </div>
  );
}

AccordionItemHeader.propTypes = {
  children: PropTypes.oneOfType([
    PropTypes.arrayOf(PropTypes.node),
    PropTypes.node,
    PropTypes.element,
    PropTypes.string,
  ]),
  className: PropTypes.string,
};

export default AccordionItemHeader;
