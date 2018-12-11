import React, { PureComponent } from 'react';
import PropTypes from 'prop-types';

import '../sass/Column.scss';

export default class Column extends PureComponent {
  static propTypes = {
    className: PropTypes.string,
    id: PropTypes.string,
    size: PropTypes.string,
    offset: PropTypes.string,
    children: PropTypes.oneOfType([
      PropTypes.element,
      PropTypes.string,
      PropTypes.object,
      PropTypes.node
    ])
  }

  getCssClasses() {
    const { className, offset, size } = this.props;
    let colSize = size.split(' ');
    let colOffsets = offset ? offset.split(' ') : [];

    let cssClasses = colSize.map((size) => {
      return 'tyk-col--' + size;
    });
    let offsets = colOffsets.map((offset) => {
      return 'tyk-col--' + offset;
    });

    cssClasses.push('tyk-col');
    cssClasses = cssClasses.concat(offsets || []);

    if(className) {
      cssClasses = cssClasses.concat(className.split(' '));
    }

    return cssClasses.join(' ');
  }

  render() {
    const { id } = this.props;

    return (
      <div className={ this.getCssClasses() } { ...this.props } id={ id }>
        { this.props.children }
      </div>
    );
  }
}
