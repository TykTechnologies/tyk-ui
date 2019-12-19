import React, { useState, useRef, useEffect } from 'react';
import PropTypes from 'prop-types';

import Icon from '../../Icon';
import FloatingContainer from '../../FloatingContainer';

import Value from './Value';
import List from './List';

function getValueFromProp(value) {
  if (!value) return [];
  if (Array.isArray(value)) return [...value];
  if (typeof value === 'string') return [{ id: value, name: value }];
  return [value];
}

function Combobox(props) {
  const {
    value: propValue,
    values: propValues = [],
    label = '',
    labelwidth,
    tags = false,
    tagSeparators = [' ', 'Enter'],
    max: maxProp,
    multiple = false,
    placeholder = '',
    theme,
    note = '',
    error = '',
    disabled = false,
    allowCustomValues = true,
    searchItem: matchItemFn,
    renderValue,
    renderListItem,
    renderList: renderListProp,
    CustomListComponent,
    onChange = () => {},
    floatingContainerConfig,
  } = props;
  const max = multiple ? Infinity : maxProp || (tags ? Infinity : 1);
  const renderList = CustomListComponent
    ? (values, { sendMessage }) => (
      <CustomListComponent
        filteredValues={values}
        handleListItemClick={index => sendMessage('value.select', { item: values[index] })}
        getListItemCssClasses={() => {}}
      />
    )
    : renderListProp;

  const rootRef = useRef(null);
  const comboboxControlRef = useRef(null);
  const dropdownRef = useRef(null);

  const [value, setValue] = useState(getValueFromProp(propValue));
  const [values, setValues] = useState(propValues);
  const [searchValue, setSearchValue] = useState('');
  const [activeItem, setActiveItem] = useState(null);
  const [isOpened, setIsOpened] = useState(false);

  function getThemeClasses() {
    const themes = theme ? theme.split(' ') : [];
    return themes.map(iTheme => `tyk-form-group--${iTheme}`);
  }

  function getCssClasses() {
    return [
      'tyk-form-group',
      'tyk-combobox2',
      ...getThemeClasses(),
      error && 'has-error',
      labelwidth && 'tyk-form-group--label-has-width',
      disabled && 'disabled',
    ].filter(Boolean).join(' ');
  }

  function getFilteredValues() {
    const defaultFn = (v, s) => v.name.toLowerCase().includes(s);
    const fn = matchItemFn || defaultFn;
    return values.filter(v => fn(v, searchValue));
  }

  function updateSearchValue(newSearchValue) {
    setSearchValue(newSearchValue);
    if (activeItem && getFilteredValues().every(fv => fv.id !== activeItem.id)) {
      setActiveItem(null);
    }
  }

  function openDropdown() {
    setIsOpened(true);
  }

  function closeDropdown() {
    setIsOpened(false);
    if (!tags) updateSearchValue('');
    setActiveItem(null);
  }

  function updateValue(newValue) {
    setValue(newValue);
    onChange(max === 1 && !tags ? (newValue[0] || null) : newValue);
  }

  function addTag(val) {
    if (value.length >= max) return;
    if (value.some(({ name }) => name === val)) return;

    const listValueIndex = values.findIndex(lv => lv.name === val);
    if (listValueIndex === -1) {
      if (allowCustomValues) updateValue([...value, { id: val, name: val }]);
    } else {
      setValues([
        ...values.slice(0, listValueIndex),
        { ...values[listValueIndex], selected: true },
        ...values.slice(listValueIndex + 1),
      ]);
      updateValue([...value, values[listValueIndex]]);
    }
  }

  function removeTag(id) {
    const listValueIndex = values.findIndex(lv => lv.id === id);
    if (listValueIndex !== -1) {
      setValues([
        ...values.slice(0, listValueIndex),
        { ...values[listValueIndex], selected: false },
        ...values.slice(listValueIndex + 1),
      ]);
    }
    updateValue(value.filter(v => v.id !== id));
  }

  function selectValue({ id }) {
    const val = values.find(v => v.id === id);
    if (val.selected) {
      updateValue(value.filter(v => v.id !== val.id));
      setValues(values.map(v => (v.id === val.id ? { ...v, selected: false } : v)));
    } else if (value.length < max) {
      updateValue([...value, val]);
      setValues(values.map(v => (v.id === val.id ? { ...v, selected: true } : v)));
    } else if (max === 1) {
      updateValue([val]);
      setValues(values.map(v => ({ ...v, selected: v.id === val.id })));
    }

    if (max === 1) {
      closeDropdown();
    }
  }

  function moveUpActiveItem() {
    const visibleItems = getFilteredValues().filter(v => !v.disabled);
    if (visibleItems.length === 0) return;
    if (activeItem === null || visibleItems.length === 1) {
      setActiveItem(visibleItems[visibleItems.length - 1]);
      return;
    }
    const activeIndex = visibleItems.findIndex(v => v.id === activeItem.id);
    setActiveItem(visibleItems[activeIndex > 0 ? activeIndex - 1 : visibleItems.length - 1]);
  }

  function moveDownActiveItem() {
    const visibleItems = getFilteredValues().filter(v => !v.disabled);
    if (visibleItems.length === 0) return;
    if (activeItem === null || visibleItems.length === 1) {
      setActiveItem(visibleItems[0]);
      return;
    }
    const activeIndex = visibleItems.findIndex(v => v.id === activeItem.id);
    setActiveItem(visibleItems[activeIndex < visibleItems.length - 1 ? activeIndex + 1 : 0]);
  }

  function handleDocumentClick(e) {
    const isClickInside = (rootRef.current && rootRef.current.contains(e.target))
      || (dropdownRef.current && dropdownRef.current.contains(e.target));
    if (!isClickInside) {
      closeDropdown();
    }
  }

  function onTagMessage(message, data) {
    if (message === 'add') {
      addTag(data);
      updateSearchValue('');
    }

    if (message === 'remove') removeTag(data);

    if (message === 'input.change') updateSearchValue(data);

    if (message === 'input.enter') {
      if (activeItem) {
        selectValue(activeItem);
      } else if (tagSeparators.includes('Enter')) {
        addTag(data);
        updateSearchValue('');
      }
    }

    if (message === 'input.arrowUp') {
      openDropdown();
      moveUpActiveItem();
    }

    if (message === 'input.arrowDown') {
      openDropdown();
      moveDownActiveItem();
    }

    if (message === 'input.escape') closeDropdown();
  }

  function onMessage(message, data) {
    if (message.startsWith('tag.')) onTagMessage(message.slice(4), data);

    if (message === 'value.select') selectValue(data.item);

    if (message === 'text-value.click') openDropdown();

    if (message === 'search.change') updateSearchValue(data);

    if (message === 'search.escape') closeDropdown();

    if (message === 'search.arrowUp') moveUpActiveItem();

    if (message === 'search.arrowDown') moveDownActiveItem();

    if (message === 'search.enter') {
      if (activeItem) selectValue(activeItem);
    }
  }

  useEffect(() => {
    window.addEventListener('click', handleDocumentClick);
    return () => window.removeEventListener('click', handleDocumentClick);
  }, []);

  useEffect(() => {
    setValues(propValues);
  }, [propValues]);

  useEffect(() => {
    const newValue = getValueFromProp(propValue);
    setValue(newValue);
    setValues(values.map(v => ({ ...v, selected: newValue.some(nv => nv.id === v.id) })));
  }, [propValue]);

  return (
    <div className={getCssClasses()} ref={rootRef}>
      <label style={{ flexBasis: labelwidth || 'auto' }}>{label}</label>
      <div
        className="tyk-form-control__wrapper"
        style={{ flexBasis: `calc(100% - ${labelwidth} - 20px)` }}
      >
        <div className="tyk-form-control" ref={comboboxControlRef}>
          {disabled && (
            <div className="tyk-combobox-disabled-overlay" />
          )}
          <div className="current-values">
            <Value
              value={value}
              tags={tags}
              tagSeparators={tagSeparators}
              allowCustomValues={allowCustomValues}
              placeholder={placeholder}
              disabled={disabled}
              renderValue={renderValue}
              onMessage={onMessage}
            />
          </div>
          <div
            className="values-container-trigger"
            role="button"
            tabIndex={disabled ? -1 : 0}
            onClick={openDropdown}
            onKeyPress={openDropdown}
          >
            <Icon type="arrow-down" />
          </div>
        </div>
        {isOpened && (
          <FloatingContainer
            element={comboboxControlRef}
            size="matchElement"
            className={`combobox-dropdown tyk-form-group ${getThemeClasses().join(' ')}`}
            ref={dropdownRef}
            {...floatingContainerConfig}
          >
            {renderList ? (
              renderList(getFilteredValues(), {
                tags,
                searchValue,
                activeItem,
                sendMessage: onMessage,
              })
            ) : (
              <List
                values={getFilteredValues()}
                tags={tags}
                searchValue={searchValue}
                activeItem={activeItem}
                onMessage={onMessage}
                renderListItem={renderListItem}
              />
            )}
          </FloatingContainer>
        )}
        {note && (
          <p className="tyk-form-control__help-block">{note}</p>
        )}
        {error && error !== 'true' && error !== 'false' && (
          <p className="tyk-form-control__error-message">{error}</p>
        )}
      </div>
    </div>
  );
}

Combobox.propTypes = {
  allowCustomValues: PropTypes.bool,
  CustomListComponent: PropTypes.elementType,
  searchItem: PropTypes.func,
  renderValue: PropTypes.func,
  renderListItem: PropTypes.func,
  renderList: PropTypes.func,
  disabled: PropTypes.bool,
  error: PropTypes.string,
  label: PropTypes.string,
  labelwidth: PropTypes.string,
  max: PropTypes.number,
  multiple: PropTypes.bool,
  note: PropTypes.oneOfType([
    PropTypes.node,
    PropTypes.element,
    PropTypes.string,
  ]),
  onChange: PropTypes.func,
  placeholder: PropTypes.string,
  tags: PropTypes.bool,
  tagSeparators: PropTypes.arrayOf(PropTypes.string),
  theme: PropTypes.string,
  value: PropTypes.oneOfType([
    PropTypes.string,
    PropTypes.instanceOf(Array),
    PropTypes.instanceOf(Object),
  ]),
  values: PropTypes.instanceOf(Array),
  floatingContainerConfig: PropTypes.instanceOf(Object),
};

export default Combobox;
