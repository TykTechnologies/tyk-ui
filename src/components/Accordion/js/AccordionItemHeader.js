import React, { Fragment, useContext } from 'react';
import PropTypes from 'prop-types';

import Icon from '../../Icon';
import AccordionContext from './AccordionContext';
import AccordionItemContext from './AccordionItemContext';
import ItemTrigger from './AccordionItemTrigger';

const AccordionItemHeader = (props) => {
  const {
    className,
    children,
  } = props;
  const accordionItemContext = useContext(AccordionItemContext);
  const { usearrowastrigger, arrow } = useContext(AccordionContext);
  const {
    collapsed,
    disabled,
    toggleChange,
  } = accordionItemContext;
  const iconType = !collapsed ? 'chevron-up' : 'chevron-down';

  const getCssClasses = () => {
    let cssClasses = ['tyk-accordion__item-header'];

    if (usearrowastrigger) {
      cssClasses.push('tyk-accordion__arrow-trigger');
    }

    if (className) {
      cssClasses = cssClasses.concat(className.split(' '));
    }

    return cssClasses.join(' ');
  };

  return (
    <div
      className={getCssClasses()}
    >
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
            <Fragment>
              {!arrow.expandToContent && arrow.position === 'left' && (
                <ItemTrigger />
              )}
              <div>{children}</div>
              {!arrow.expandToContent && arrow.position === 'right' && (
                <ItemTrigger />
              )}
            </Fragment>
          )
      }

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
  className: PropTypes.string,
};

export default AccordionItemHeader;
