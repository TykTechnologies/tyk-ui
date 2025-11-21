import React from 'react';
import PropTypes from 'prop-types';
import CollapsibleListItem from './js/CollapsibleListItem';
import './CollapsibleList.css';

function CollapsibleList(props) {
  const {
    children,
    open = false,
    visibleCount = 0,
    className = '',
  } = props;

  const items = React.Children.toArray(children);

  const getCssClasses = () => {
    let cssClasses = ['tyk-collapsible-list'];

    if (className) {
      cssClasses = cssClasses.concat(className.split(' '));
    }

    return cssClasses.join(' ');
  };

  return (
    <div className={getCssClasses()}>
      <ul className="tyk-collapsible-list__list">
        {items.map((item, index) => {
          const shouldShow = open || index < visibleCount;
          const isAnimated = index >= visibleCount;

          return (
            <div
              key={index}
              className={`tyk-collapsible-list__item-wrapper ${
                shouldShow ? 'tyk-collapsible-list__item-wrapper--visible' : 'tyk-collapsible-list__item-wrapper--hidden'
              } ${
                isAnimated ? 'tyk-collapsible-list__item-wrapper--animated' : ''
              }`}
              style={{
                transitionDelay: isAnimated && open ? `${(index - visibleCount) * 50}ms` : '0ms',
              }}
            >
              {item}
            </div>
          );
        })}
      </ul>
    </div>
  );
}

CollapsibleList.propTypes = {
  children: PropTypes.node.isRequired,
  open: PropTypes.bool,
  visibleCount: PropTypes.number,
  className: PropTypes.string,
};

CollapsibleList.Item = CollapsibleListItem;

export default CollapsibleList;
