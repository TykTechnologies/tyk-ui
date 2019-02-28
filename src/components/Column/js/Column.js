import React, { PureComponent } from 'react';
import PropTypes from 'prop-types';

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
      PropTypes.node,
    ]),
  }

  getCssClasses() {
    const { className, offset, size } = this.props;
    const colSize = size.split(' ');
    const colOffsets = offset ? offset.split(' ') : [];

    let cssClasses = colSize.map(cSize => `tyk-col--${cSize}`);
    const offsets = colOffsets.map(cOffset => `tyk-col--${cOffset}`);

    if (className) {
      cssClasses = cssClasses.concat(className.split(' '));
    }

    cssClasses.push('tyk-col');
    cssClasses = cssClasses.concat(offsets || []);

    return cssClasses.join(' ');
  }

  render() {
    const { children, id } = this.props;

    return (
      <div className={this.getCssClasses()} id={id}>
        { children }
      </div>
    );
  }
}
