import React from 'react';
import PropTypes from 'prop-types';
import { fromJS } from 'immutable';

const List = (props) => {
  const {
    className,
    children,
    label,
    labelWidth,
    theme,
    style,
  } = props;

  const getCssClasses = () => {
    let cssClasses = ['tyk-list'];

    if (theme) {
      cssClasses.push(`tyk-list--${theme}`);
    }

    if (className) {
      cssClasses = cssClasses.concat(className.split(' '));
    }

    return cssClasses.join(' ');
  };

  const getListStyle = () => {
    const styleCopy = fromJS(style).toJS();
    if (labelWidth) {
      styleCopy.flexBasis = `calc(100% - ${labelWidth} - 20px)`;
    }

    return styleCopy;
  };

  return (
    <div className={`tyk-list__wrapper ${labelWidth ? 'tyk-list--with-inline-label' : ''}`}>
      {
        label !== undefined
          ? (
            <label style={{
              flexBasis: labelWidth || 'auto',
            }}
            >
              { label }
            </label>
          )
          : null
      }
      <ul className={getCssClasses()} style={getListStyle()}>
        {children}
      </ul>
    </div>
  );
};

List.propTypes = {
  children: PropTypes.oneOfType([
    PropTypes.arrayOf(PropTypes.node),
    PropTypes.node,
    PropTypes.element,
    PropTypes.string,
  ]),
  className: PropTypes.string,
  label: PropTypes.string,
  labelWidth: PropTypes.string,
  theme: PropTypes.string,
  style: PropTypes.instanceOf(Object),
};

List.defaultProps = {
  theme: 'default',
  style: {},
};

export default List;
