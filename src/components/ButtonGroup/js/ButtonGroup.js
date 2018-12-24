import React, { Fragment, PureComponent } from 'react';
import PropTypes from 'prop-types';

import '../sass/ButtonGroup.scss';

export default class ButtonGroup extends PureComponent {
  static propTypes = {
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
