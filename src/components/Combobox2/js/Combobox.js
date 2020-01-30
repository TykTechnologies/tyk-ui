import React, { useState, useRef, useEffect } from 'react';
import PropTypes from 'prop-types';

import ResizeObserver from 'resize-observer-polyfill';
import Icon from '../../Icon';
import FloatingContainer from '../../FloatingContainer';

import Value from './Value';
import List from './List';

function normalizeValue(value, values) {
  let v = value;
  if (typeof value === 'string') v = { id: value, name: value };
  else if (!value.hasOwnProperty('name')) v = { ...value, name: value.id }; // eslint-disable-line no-prototype-builtins
  if (!values) return v;
  const existingVal = values.find(ev => ev.id === v.id);
  return existingVal ? { ...v, ...existingVal } : v;
}

function getValueFromProp(value, values) {
  if (!value) return [];
  if (Array.isArray(value)) return value.map(v => normalizeValue(v, values));
  return [normalizeValue(value, values)];
}

function Combobox(props) {
  const {
    value: propValue,
    values: propValues = [],
    valueOverflow = 'single',
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
    expandMode,
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

  const [value, setValue] = useState(getValueFromProp(propValue, propValues));
  const [values, setValues] = useState(propValues);
  const [searchValue, setSearchValue] = useState('');
  const [activeItem, setActiveItem] = useState(null);
  const [isOpened, setIsOpened] = useState(false);
  const [valuesExpanded, setValuesExpanded] = useState(false);

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

  function openDropdown() {
    setIsOpened(true);
  }

  function closeDropdown() {
    setIsOpened(false);
    if (!tags) updateSearchValue('');
    setActiveItem(null);
  }

  function updateSearchValue(newSearchValue) {
    setSearchValue(newSearchValue);
    if (activeItem && getFilteredValues().every(fv => fv.id !== activeItem.id)) {
      setActiveItem(null);
    }
    if (newSearchValue && !isOpened) openDropdown();
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

  function executeTriggerAction() {
    if (expandMode) {
      setValuesExpanded(!valuesExpanded);
    } else {
      openDropdown();
    }
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
    if (propValues.length) {
      setValues(propValues.map(v => ({ ...v, selected: value.some(sv => sv.id === v.id) })));
    } else if (values.length) {
      setValues([]);
    }
  }, [propValues]);

  useEffect(() => {
    const newValue = getValueFromProp(propValue, values);
    setValue(newValue);
    setValues(values.map(v => ({ ...v, selected: newValue.some(nv => nv.id === v.id) })));
  }, [propValue]);

  useEffect(() => {
    if (!expandMode) return () => {};

    const valuesElement = comboboxControlRef.current.querySelector('.tyk-combobox2__current-values');
    const updateScroll = () => {
      valuesElement.scrollTop = valuesElement.scrollHeight;
    };
    /* eslint-disable-next-line no-undef */
    const mobserver = new MutationObserver(updateScroll);
    const robserver = new ResizeObserver(updateScroll);

    mobserver.observe(valuesElement, { attributes: true, childList: true, subtree: true });
    robserver.observe(valuesElement);

    return () => {
      mobserver.disconnect();
      robserver.disconnect();
    };
  });

  const filteredValues = getFilteredValues();
  const currentValuesClasses = [
    'tyk-combobox2__current-values',
    expandMode && 'expand-mode',
    `tyk-combobox2__current-values--${valuesExpanded ? 'expanded' : 'collapsed'}`,
  ].join(' ');
  return (
    <div className={getCssClasses()} ref={rootRef}>
      {label && (
        <label style={{ flexBasis: labelwidth || 'auto' }}>{label}</label>
      )}
      <div
        className="tyk-form-control__wrapper"
        style={{ flexBasis: `calc(100% - ${labelwidth} - 20px)` }}
      >
        <div className="tyk-form-control" ref={comboboxControlRef}>
          {disabled && (
            <div className="tyk-combobox2-disabled-overlay" />
          )}
          <div className={currentValuesClasses}>
            <Value
              value={value}
              max={max}
              tags={tags}
              tagSeparators={tagSeparators}
              allowCustomValues={allowCustomValues}
              placeholder={placeholder}
              disabled={disabled}
              valueOverflow={valueOverflow}
              renderValue={renderValue}
              focus={isOpened}
              onMessage={onMessage}
            />
          </div>
          <div
            className={`tyk-combobox2__values-container-trigger${valuesExpanded ? ' tyk-combobox2__values-container-trigger--expanded' : ''}`}
            role="button"
            tabIndex={disabled ? -1 : 0}
            onClick={executeTriggerAction}
            onKeyPress={executeTriggerAction}
          >
            <Icon type="arrow-down" />
            {tags && filteredValues.length === 0 && !expandMode && (
              <div
                className="disabled-overlay"
                onClick={e => e.stopPropagation()}
                role="none"
              />
            )}
          </div>
        </div>
        {isOpened && (!tags || filteredValues.length > 0) && (
          <FloatingContainer
            element={comboboxControlRef}
            size="matchElement"
            className={`tyk-combobox2__combobox-dropdown tyk-form-group ${getThemeClasses().join(' ')}`}
            ref={dropdownRef}
            {...floatingContainerConfig}
          >
            {renderList ? (
              renderList(filteredValues, {
                tags,
                searchValue,
                activeItem,
                sendMessage: onMessage,
              })
            ) : (
              <List
                values={filteredValues}
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
  valueOverflow: PropTypes.oneOf(['single', 'multiple']),
  expandMode: PropTypes.bool,
};

export default Combobox;
