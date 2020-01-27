import React from 'react';
import PropTypes from 'prop-types';
import { fromJS } from 'immutable';

import Message from '../../Message';
import List from '../../List';
import Icon from '../../Icon';

const SelectableList = (props) => {
  const {
    checkboxalticon,
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
    const elemPosition = newSelectedItems.findIndex(
      id => JSON.stringify(id) === JSON.stringify(
        Array.isArray(id)
          ? event.target.value.split(',')
          : event.target.value,
      ),
    );

    if (event.target.checked && elemPosition === -1) {
      const tempValue = event.target.value.split(',');
      const finalValue = tempValue.length > 1 ? tempValue : event.target.value;

      newSelectedItems.push(finalValue);
    } else if (!event.target.checked && elemPosition > -1) {
      newSelectedItems.splice(elemPosition, 1);
    }

    if (onChange) {
      onChange(newSelectedItems);
    }
  };

  const getListItemCssClassName = (isActive) => {
    const cssClasses = [];

    if (checkboxalticon) {
      cssClasses.push('tyk-selectable-list__item--with-icon');
    }

    if (isActive) {
      cssClasses.push('tyk-selectable-list__item--active');
    }

    return cssClasses.join(' ');
  };

  const isChecked = (inputValue, itemValue) => Boolean(
    inputValue.find(tvalue => JSON.stringify(itemValue) === JSON.stringify(tvalue)),
  );

  return (
    <List {...props} theme={theme || 'default'} className="tyk-selectable-list">
      {
        !items.length
          ? (
            <li className="tyk-selectable-list__no-items-message">
              <Message theme="info">
                {noItemsMessage || 'No items in the list'}
              </Message>
            </li>
          )
          : items.map((item, index) => (
            <List.Item
              /* eslint-disable react/no-array-index-key */
              key={index}
              className={getListItemCssClassName(value.includes(item[primaryKey]))}
            >
              <label>
                <div className="tyk-selectable-list__item">
                  {itemTemplate ? itemTemplate(item) : item.name}
                </div>
                <input
                  type="checkbox"
                  checked={isChecked(value, item[primaryKey])}
                  /* eslint-disable-next-line react/jsx-no-bind */
                  onChange={handleOnSelect.bind(item)}
                  value={item[primaryKey]}
                />
                {
                  checkboxalticon
                    ? <Icon type={checkboxalticon} />
                    : null
                }
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
    PropTypes.func,
  ]),
  value: PropTypes.instanceOf(Array),
  onChange: PropTypes.func,
  primaryKey: PropTypes.string,
  noItemsMessage: PropTypes.string,
  checkboxalticon: PropTypes.oneOfType([
    PropTypes.node,
    PropTypes.element,
    PropTypes.string,
  ]),
  theme: PropTypes.string,
};

SelectableList.defaultProps = {
  items: [],
  primaryKey: 'id',
  value: [],
};

export default SelectableList;
