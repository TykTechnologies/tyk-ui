import React from 'react';
import PropTypes from 'prop-types';
import ListItem from './js/ListItem';

function List(props) {
  const {
    className,
    children,
    label,
    labelwidth,
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
    const styleCopy = structuredClone(style);
    if (labelwidth) {
      styleCopy.flexBasis = `calc(100% - ${labelwidth} - 20px)`;
    }

    return styleCopy;
  };

  return (
    <div className={`tyk-list__wrapper ${labelwidth ? 'tyk-list--with-inline-label' : ''}`}>
      {
        label !== undefined
          ? (
            <label style={{
              flexBasis: labelwidth || 'auto',
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
}

List.propTypes = {
  children: PropTypes.oneOfType([
    PropTypes.arrayOf(PropTypes.node),
    PropTypes.node,
    PropTypes.element,
    PropTypes.string,
  ]),
  className: PropTypes.string,
  label: PropTypes.string,
  labelwidth: PropTypes.string,
  theme: PropTypes.string,
  style: PropTypes.instanceOf(Object),
};

List.defaultProps = {
  theme: 'secondary',
  style: {},
};

List.Item = ListItem;

export default List;
