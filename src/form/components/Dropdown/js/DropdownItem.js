import React, { cloneElement, useCallback } from 'react';
import PropTypes from 'prop-types';

import { DropdownContext } from '../dropdown-context';
import Icon from '../../../../components/Icon';

function DropdownItem(props) {
  const {
    customdropdownitem,
    children,
    eventKey,
    href,
    target,
    title,
    onClick,
  } = props;
  const dropdownItemCLick = useCallback((dropdownContext, itemProps) => {
    dropdownContext.onSelectItem(eventKey, itemProps);

    if (onClick) onClick(eventKey);
  }, []);

  return (
    <DropdownContext.Consumer>
      {
        (dropdownContext) => (
          <li
            onClick={() => dropdownItemCLick(dropdownContext, props)}
            onKeyUp={() => {}}
          >
            {
              customdropdownitem
                ? cloneElement(customdropdownitem, {})
                : (
                  <a href={href} target={target}>
                    {
                      eventKey
                      && dropdownContext.selectedItem === eventKey
                      && dropdownContext.showCheckmark
                        ? <Icon type="check" className="tyk-dropdown__item-check" />
                        : null
                    }
                    <span>
                      {title || children}
                    </span>
                  </a>
                )
            }
          </li>
        )
      }
    </DropdownContext.Consumer>
  );
}

DropdownItem.propTypes = {
  children: PropTypes.oneOfType([
    PropTypes.element,
    PropTypes.node,
    PropTypes.string,
  ]),
  customdropdownitem: PropTypes.oneOfType([
    PropTypes.arrayOf(PropTypes.node),
    PropTypes.node,
    PropTypes.element,
  ]),
  eventKey: PropTypes.string,
  href: PropTypes.string,
  target: PropTypes.string,
  onClick: PropTypes.func,
  title: PropTypes.string,
};

export default DropdownItem;
