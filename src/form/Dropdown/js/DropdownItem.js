import React, { Component, cloneElement, Fragment } from 'react';
import PropTypes from 'prop-types';

import { DropdownContext } from './Dropdown';
import Icon from '../../../components/Icon';

export default class DropdownItem extends Component {
  static propTypes = {
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

  constructor(props) {
    super(props);

    this.dropdownItemCLick = this.dropdownItemCLick.bind(this);
  }

  dropdownItemCLick(dropdownContext, itemProps) {
    const { eventKey, onClick } = this.props;

    dropdownContext.onSelectItem(eventKey, itemProps);

    if (onClick) {
      onClick(eventKey);
    }
  }

  render() {
    const {
      customdropdownitem,
      children,
      eventKey,
      href,
      target,
      title,
    } = this.props;
    return (
      <DropdownContext.Consumer>
        {
          dropdownContext => (
            <li
              onClick={this.dropdownItemCLick.bind(this, dropdownContext, this.props)}
              onKeyUp={() => {}}
            >
              {
                customdropdownitem
                  ? (
                    <Fragment>
                      { cloneElement(customdropdownitem, {}) }
                    </Fragment>
                  )
                  : (
                    <a href={href} target={target}>
                      {
                        eventKey
                        && dropdownContext.selectedItem === eventKey
                        && dropdownContext.showCheckmark
                          ? <Icon type="check" />
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
}
