import React from 'react';
import PropTypes from 'prop-types';
import { fromJS } from 'immutable';

import List from '../../List';

const SelectableList = (props) => {
  const {
    items,
    itemTemplate,
    value,
    noItemsMessage,
    onChange,
    theme,
    primaryKey,
  } = props;

  const handleOnSelect = (event) => {
    const newSelectedItems = fromJS(value).toJS();
    const elemPosition = newSelectedItems.indexOf(event.target.value);

    if (event.target.checked && elemPosition === -1) {
      newSelectedItems.push(event.target.value);
    } else if (!event.target.checked && elemPosition > -1) {
      newSelectedItems.splice(elemPosition, 1);
    }

    if (onChange) {
      onChange(newSelectedItems);
    }
  };

  return (
    <List {...props} theme={theme || 'default'} className="tyk-selectable-list">
      {
        !items.length
          ? (
            <li className="tyk-selectable-list__no-items-message">
              {noItemsMessage || 'No items in the list'}
            </li>
          )
          : items.map(item => (
            <List.Item>
              <label>
                <div className="tyk-selectable-list__item">
                  {itemTemplate ? itemTemplate(item) : item.name}
                </div>
                <input
                  type="checkbox"
                  checked={value.includes(item[primaryKey])}
                  /* eslint-disable-next-line react/jsx-no-bind */
                  onChange={handleOnSelect.bind(item)}
                  value={item[primaryKey]}
                />
              </label>
            </List.Item>
          ))
      }
    </List>
  );
};

SelectableList.propTypes = {
  items: PropTypes.instanceOf(Array),
  itemTemplate: PropTypes.oneOfType([
    PropTypes.node,
    PropTypes.element,
    PropTypes.string,
  ]),
  value: PropTypes.instanceOf(Array),
  onChange: PropTypes.func,
  primaryKey: PropTypes.string,
  noItemsMessage: PropTypes.string,
  theme: PropTypes.string,
};

SelectableList.defaultProps = {
  items: [],
  primaryKey: 'id',
  value: [],
};

export default SelectableList;
