import React, { PureComponent } from 'react';
import PropTypes from 'prop-types';
/**
 * Tyk button component.
 */
export default class ButtonGroup extends PureComponent {
  static propTypes = {
    children: PropTypes.oneOfType([
      PropTypes.arrayOf(PropTypes.node),
      PropTypes.node,
      PropTypes.element,
      PropTypes.string,
    ]),
    /**
    * Label that will sit above the button group
    */
    label: PropTypes.string,
  };

  static getCssClasses() {
    const cssClasses = ['tyk-button-group'];

    return cssClasses.join(' ');
  }

  render() {
    const {
      children,
      label,
    } = this.props;

    return (
      <div className="tyk-button-group__wrapper">
        {
          label
            ? (
              <label>
                {label}
              </label>
            )
            : null
        }
        <div className={ButtonGroup.getCssClasses()}>
          { children }
        </div>
      </div>
    );
  }
}
