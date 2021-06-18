import React from 'react';
// import React, { Component } from 'react';
import PropTypes from 'prop-types';
import '../../web-components/components/icon';

function Icon({ className, family, type }) {
  return <tyk-icon classname={className} family={family} type={type} />;
}

Icon.propTypes = {
  className: PropTypes.string,
  family: PropTypes.string,
  type: PropTypes.string.isRequired,
};

export default Icon;

// export default class Icon extends Component {
//   static propTypes = {
//     className: PropTypes.string,
//     family: PropTypes.string,
//     type: PropTypes.string.isRequired,
//   };

//   getCssClasses() {
//     const {
//       className,
//       family,
//       type,
//     } = this.props;

//     const cssClasses = ['tyk-icon'];
//     const fontFamily = family || 'fa';

//     cssClasses.push(fontFamily);
//     cssClasses.push(`${fontFamily}-${type}`);

//     return cssClasses
//       .concat([className] || [])
//       .join(' ');
//   }

//   render() {
//     const {
//       className,
//       family,
//       type,
//       ...rest
//     } = this.props;
//     return (
//       <>
//         <i className={this.getCssClasses()} {...rest} />
//         <tyk-icon classname={className} family={family} type={type} />
//       </>
//     );
//   }
// }
