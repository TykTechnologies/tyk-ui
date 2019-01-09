import React, { Fragment, PureComponent } from 'react';
import PropTypes from 'prop-types';
/**
 * Tyk button component.
 */
export default class ButtonGroup extends PureComponent {
  static propTypes = {
    /**
    * Label that will sit above the button group
    */
    label: PropTypes.string
  };

  getCssClasses() {
    const { size } = this.props;
    let cssClasses = ['tyk-button-group'];

    return cssClasses.join(' ');
  }

  render() {
    const { label } = this.props;

    return (
      <div className="tyk-button-group__wrapper">
        {
          label
            ? <label> { label } </label>
            : null
        }
        <div className={ this.getCssClasses() }>
          { this.props.children }
        </div>
      </div>
    );
  }
}
