import React, { useEffect } from 'react';
import PropTypes from 'prop-types';
import Icon from '../../../../components/Icon';

function List(props) {
  const {
    listRef,
    tags,
    values,
    searchValue,
    activeItem,
    onMessage: sendMessage,
    renderListItem,
    selectAll,
    showSearch,
  } = props;

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
        onMouseDown={(e) => {
          if (!item.disabled) {
            e.preventDefault();
            sendMessage('value.select', { item });
          }
        }}
        onKeyDown={() => {}}
      >
        {item.selected && <Icon type="check" />}
        <span className="item-name">{item.name}</span>
      </li>
    );
  }

  function renderSelectAllOption() {
    const isAllSelected = values.every((v) => v.selected);
    const isNoneSelected = values.every((v) => !v.selected);
    const label = selectAll?.label ?? 'Select All';
    const mode = selectAll?.mode ?? 'select';
    const show = selectAll?.show ?? 'always';
    const render = selectAll?.render;

    const shouldRenderOption = show === 'always' || (mode === 'select' ? !isAllSelected : !isNoneSelected);
    if (!shouldRenderOption) return null;

    if (render) {
      return render({
        label,
        mode,
        show,
        isAllSelected,
        isNoneSelected,
      }, sendMessage);
    }
    return (
      <li
        onMouseDown={(e) => {
          e.preventDefault();
          sendMessage('value.select-all', mode === 'select' ? !isAllSelected : isNoneSelected);
        }}
        onKeyDown={() => {}}
      >
        {(mode === 'select' ? isAllSelected : isNoneSelected) && <Icon type="check" />}
        {label}
      </li>
    );
  }

  return (
    <>
      {!tags && showSearch && (
        <div className="tyk-combobox2__combobox-search">
          <input
            autoFocus
            className="tyk-form-control"
            value={searchValue}
            onChange={(e) => sendMessage('search.change', e.target.value)}
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
          {Boolean(selectAll) && (
            renderSelectAllOption()
          )}
          {values.map(renderItem)}
        </ul>
      )}
    </>
  );
}

List.propTypes = {
  listRef: PropTypes.instanceOf(Object),
  tags: PropTypes.bool,
  values: PropTypes.instanceOf(Array),
  searchValue: PropTypes.string,
  activeItem: PropTypes.instanceOf(Object),
  onMessage: PropTypes.func,
  renderListItem: PropTypes.func,
  selectAll: PropTypes.oneOfType([
    PropTypes.bool,
    PropTypes.shape({
      label: PropTypes.oneOfType([
        PropTypes.arrayOf(PropTypes.node),
        PropTypes.node,
        PropTypes.element,
        PropTypes.func,
        PropTypes.string,
      ]),
      mode: PropTypes.oneOf(['select', 'unselect']),
      show: PropTypes.oneOf(['always', 'notSameState']),
      render: PropTypes.func,
    }),
  ]),
  showSearch: PropTypes.bool,
};

export default List;
