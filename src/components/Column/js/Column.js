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
    console.log(this.props.className, className);
    let colSize = size.split(' ');
    let colOffsets = offset ? offset.split(' ') : [];

    let cssClasses = colSize.map((size) => {
      return 'tyk-col--' + size;
    });
    let offsets = colOffsets.map((offset) => {
      return 'tyk-col--' + offset;
    });

    if(className) {
      cssClasses = cssClasses.concat(className.split(' '));
    }

    cssClasses.push('tyk-col');
    cssClasses = cssClasses.concat(offsets || []);

    return cssClasses.join(' ');
  }

  render() {
    const { id } = this.props;

    return (
      <div className={ this.getCssClasses() } id={ id }>
        { this.props.children }
      </div>
    );
  }
}
