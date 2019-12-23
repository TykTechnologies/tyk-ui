import React, { useRef, useEffect } from 'react';
import PropTypes from 'prop-types';
import Icon from '../../Icon';

function List(props) {
  const {
    tags,
    values,
    searchValue,
    activeItem,
    onMessage: sendMessage,
    renderListItem,
  } = props;

  const listRef = useRef(null);

  useEffect(() => {
    if (!listRef.current) return;
    const activeElement = listRef.current.querySelector('.active');
    if (activeElement) activeElement.scrollIntoView({ block: 'end' });
  }, [activeItem]);

  function renderItem(item) {
    if (renderListItem) {
      return renderListItem(item, {
        tags, searchValue, sendMessage, activeItem,
      });
    }

    return (
      <li
        key={item.id}
        title={item.name}
        className={[
          item.disabled && 'disabled',
          activeItem && item.id === activeItem.id && 'active',
        ].filter(Boolean).join(' ')}
        onClick={() => !item.disabled && sendMessage('value.select', { item })}
        onKeyPress={() => {}}
      >
        {item.selected && <Icon type="check" />}
        <span className="item-name">{item.name}</span>
      </li>
    );
  }

  return (
    <>
      {!tags && (
        <div className="tyk-combobox2__combobox-search">
          <input
            autoFocus
            className="tyk-form-control"
            value={searchValue}
            onChange={e => sendMessage('search.change', e.target.value)}
            onKeyDown={(e) => {
              if (e.key === 'Escape') sendMessage('search.escape');
              if (e.key === 'ArrowUp') sendMessage('search.arrowUp');
              if (e.key === 'ArrowDown') sendMessage('search.arrowDown');
              if (e.key === 'Enter') sendMessage('search.enter');
            }}
          />
        </div>
      )}
      {values.length > 0 && (
        <ul ref={listRef} className="tyk-combobox2__combobox-list">
          {values.map(renderItem)}
        </ul>
      )}
    </>
  );
}

List.propTypes = {
  tags: PropTypes.bool,
  values: PropTypes.instanceOf(Array),
  searchValue: PropTypes.string,
  activeItem: PropTypes.instanceOf(Object),
  onMessage: PropTypes.func,
  renderListItem: PropTypes.func,
};

export default List;
