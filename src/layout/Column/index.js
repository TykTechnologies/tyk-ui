import React, { PureComponent } from 'react';
import PropTypes from 'prop-types';

/**
 * Column component.
 */
class Column extends PureComponent {
  static propTypes = {
    /**
    * This property describes how the column element will be aligned vertically
    * within a Row: bottom, center, top
    */
    align: PropTypes.string,
    /** Css classes that can be passed to the column element */
    className: PropTypes.string,
    /**
    * ID  that can be passed to the column element
    */
    id: PropTypes.string,
    /**
    * Specifies the size of the column within a Row (values must be between 1 - 12)
    */
    size: PropTypes.string,
    /**
    * Specifies the left gap a column can have within a Row (values must be between 1 - 12)
    */
    offset: PropTypes.string,
    children: PropTypes.oneOfType([
      PropTypes.element,
      PropTypes.string,
      PropTypes.object,
      PropTypes.node,
    ]),
  }

  getCssClasses() {
    const {
      align, className, offset, size,
    } = this.props;
    const colSize = size.split(' ');
    const colOffsets = offset ? offset.split(' ') : [];

    let cssClasses = colSize.map(cSize => `tyk-col--${cSize}`);
    const offsets = colOffsets.map(cOffset => `tyk-col--offset-${cOffset}`);

    if (align) {
      cssClasses.push(`tyk-col--align-${align}`);
    }

    if (className) {
      cssClasses = cssClasses.concat(className.split(' '));
    }

    cssClasses.push('tyk-col');
    cssClasses = cssClasses.concat(offsets || []);

    return cssClasses.join(' ');
  }

  render() {
    const { children, id, ...props } = this.props;

    return (
      <div {...props} className={this.getCssClasses()} id={id}>
        { children }
      </div>
    );
  }
}

export default Column;
