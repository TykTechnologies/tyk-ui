import React, { Component } from 'react';
import PropTypes from 'prop-types';

import { DropdownContext } from './Dropdown';
import Icon from '../../Icon';

export default class DropdownItem extends Component {
  static propTypes = {
    children: PropTypes.oneOfType([
      PropTypes.element,
      PropTypes.node,
      PropTypes.string,
    ]),
    eventKey: PropTypes.string,
    href: PropTypes.string,
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
      children,
      eventKey,
      href,
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
              <a href={href}>
                {
                  eventKey && dropdownContext.selectedItem === eventKey
                    ? <Icon type="check" />
                    : null
                }
                <span>
                  {title || children}
                </span>
              </a>
            </li>
          )
        }
      </DropdownContext.Consumer>
    );
  }
}
