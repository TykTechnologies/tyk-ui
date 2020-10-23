import React, { useState, useRef, useEffect } from 'react';
import PropTypes from 'prop-types';

import ResizeObserver from 'resize-observer-polyfill';
import Icon from '../../../components/Icon';
import FloatingContainer from '../../../components/FloatingContainer';

import Value from './js/Value';
import List from './js/List';

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

/**
 * Dropdown-like component that can display selected values as regular text, tags, or in a custom way.
 * You can select values from a list or type in new ones.
 */
function Combobox2(props) {
  const {
    /** The value of the component. It can be a string, an array, or an object with an `id` property. */
    value: propValue,
    /** An array of selectable values. */
    values: propValues = [],
    /** If set to `single` it will display the values on a single line with an ellipsis at the end. */
    valueOverflow = 'single',
    label = '',
    labelwidth,
    /** Enables the display of values as `Pill` components that can be removed without opening the dropdown. */
    tags = false,
    /** A list of characters that will trigger the creation of a tag when typed. */
    tagSeparators = [' ', 'Enter'],
    /** If set to true a tag will be created whenever the component loses focus and there is something typed in. */
    addTagOnBlur = false,
    /** The number of values that can be selected. */
    max: maxProp,
    /** Shorthand for max=Infinity */
    multiple = false,
    placeholder = '',
    theme,
    note = '',
    error = '',
    disabled = false,
    /** If `true` it allows entering values that are not in the list. */
    allowCustomValues = true,
    /** A function used for filtering elements displayed in the list when typing in. */
    searchItem: matchItemFn,
    /** A custom component that will be used to display a value. */
    renderValue,
    /** A custom component that will be used to display an item in the dropdown list. */
    renderListItem,
    /** A custom component that will be used to display the entire content of the dropdown. */
    renderList: renderListProp,
    /** Alias for `renderList` used for backwards compatibility with the old Combobox component. */
    CustomListComponent,
    onChange = () => {},
    /** Config object passed to the internal floating container component. */
    floatingContainerConfig,
    /**
     * If set to `true` whenever the user clicks on the dropdown trigger the selected values container
     * will expand to show all selected values instead of opening the dropdown.
     */
    expandMode,
    /** Config object passed to the internal infinite scroller component. */
    infiniteScrollerConfig,
    /** Toggles the display of the dropdown trigger. */
    displayDropdownTrigger = true,
    /**
     * If a boolean it will toggle the select all functionality from the dropdown.
     * It can also be an object with the shape `{ label, show, mode, render }`.
     * label - A string displayed as the select all option
     * show - It can be one of `['always', 'notSameState']`.
     *    `always` means the option will always be displayed.
     *    `notSameState` means it will be displayed only if the list items are not all with the same state (depending on the `mode` value)
     * mode - It can be one of `['select', 'unselect']` and makes sense only when the `show` property is `notSameState`
     *    `select` means the select all option will only be displayed if not all items are selected
     *    `unselect` means the option will be displayed if no items are selected
     */
    selectAll,
    /** It `true` the dropdown will close after selecting a value. */
    closeOnSelect,
    /** Toggles the display of the search input from the dropdown. */
    showSearch = false,
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
  const [values, setValues] = useState(propValues.map(v => normalizeValue(v)));
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
      expandMode && 'is-expand-mode',
    ].filter(Boolean).join(' ');
  }

  function getFilteredValues() {
    const defaultFn = (v, s) => v.name.toLowerCase().includes(s);
    const fn = matchItemFn || defaultFn;
    const filteredValues = values.filter(v => fn(v, searchValue.toLowerCase()));
    return filteredValues;
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
    if (!val) return;
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

    if (max === 1 || closeOnSelect) {
      closeDropdown();
    }
  }

  function selectAllValues(selected) {
    if (values.length > max) return;
    updateValue(selected ? [...values] : []);
    setValues(values.map(v => ({ ...v, selected })));
    if (closeOnSelect) closeDropdown();
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

  function onClickCapture(e) {
    if (!disabled) return;
    if (!expandMode) {
      e.stopPropagation();
      return;
    }

    const triggerElement = rootRef.current.querySelector('.tyk-combobox2__values-container-trigger');
    if (!triggerElement) return;

    const isClickOnTrigger = triggerElement === e.target || triggerElement.contains(e.target);
    if (!isClickOnTrigger) e.stopPropagation();
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

    if (message === 'input.blur' && addTagOnBlur) {
      addTag(data);
      updateSearchValue('');
    }

    if (message === 'input.focus') {
      openDropdown();
    }
  }

  function onMessage(message, data) {
    if (message.startsWith('tag.')) onTagMessage(message.slice(4), data);

    if (message === 'value.select') selectValue(data.item);

    if (message === 'value.select-all') selectAllValues(data);

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
    window.addEventListener('click', handleDocumentClick, true);
    return () => window.removeEventListener('click', handleDocumentClick, true);
  }, []);

  useEffect(() => {
    if (propValues.length) {
      const newValues = propValues.map(v => ({
        ...normalizeValue(v),
        selected: value.some(sv => sv.id === v.id),
      }));
      setValues(newValues);
      setValue(val => val.map(v => newValues.find(nv => nv.id === v.id) || v));
    } else if (values.length) {
      setValues([]);
    }
  }, [propValues]);

  useEffect(() => {
    const newValue = getValueFromProp(propValue, values);
    setValue(newValue);
    setValues(vals => vals.map(v => ({
      ...normalizeValue(v),
      selected: newValue.some(nv => nv.id === v.id),
    })));
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
    <div
      className={getCssClasses()}
      ref={rootRef}
      tabIndex={disabled ? '-1' : '0'}
      onClickCapture={onClickCapture}
    >
      {label && (
        <label style={{ flexBasis: labelwidth || 'auto' }}>{label}</label>
      )}
      <div
        className="tyk-form-control__wrapper"
        style={{ flexBasis: `calc(100% - ${labelwidth} - 20px)` }}
      >
        <div className="tyk-form-control" ref={comboboxControlRef}>
          <div
            className={currentValuesClasses}
            onClick={openDropdown}
            role="none"
          >
            <Value
              value={value}
              max={max}
              tags={tags}
              tagSeparators={tagSeparators}
              addTagOnBlur={addTagOnBlur}
              allowCustomValues={allowCustomValues}
              placeholder={placeholder}
              disabled={disabled}
              valueOverflow={valueOverflow}
              renderValue={renderValue}
              focus={isOpened}
              onMessage={onMessage}
            />
          </div>
          {displayDropdownTrigger && (
            <div
              className={`tyk-combobox2__values-container-trigger${valuesExpanded ? ' tyk-combobox2__values-container-trigger--expanded' : ''}`}
              role="button"
              tabIndex={disabled ? -1 : 0}
              onClick={executeTriggerAction}
              onKeyPress={executeTriggerAction}
            >
              <Icon family="tykon" type="arrowdown" />
            </div>
          )}
        </div>
        {isOpened && (!tags || filteredValues.length > 0) && (
          <FloatingContainer
            element={comboboxControlRef}
            size="matchElement"
            className={`tyk-combobox2__combobox-dropdown tyk-form-group ${getThemeClasses().join(' ')}`}
            ref={dropdownRef}
            {...floatingContainerConfig}
            infiniteScrollerConfig={infiniteScrollerConfig}
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
                showSearch={showSearch}
                values={filteredValues}
                tags={tags}
                searchValue={searchValue}
                activeItem={activeItem}
                onMessage={onMessage}
                renderListItem={renderListItem}
                selectAll={selectAll}
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

Combobox2.propTypes = {
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
  addTagOnBlur: PropTypes.bool,
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
  infiniteScrollerConfig: PropTypes.instanceOf(Object),
  displayDropdownTrigger: PropTypes.bool,
  selectAll: PropTypes.oneOfType([
    PropTypes.bool,
    PropTypes.shape({
      label: PropTypes.string,
      mode: PropTypes.oneOf(['select', 'unselect']),
      show: PropTypes.oneOf(['always', 'notSameState']),
      render: PropTypes.func,
    }),
  ]),
  closeOnSelect: PropTypes.bool,
  showSearch: PropTypes.bool,
};

export default Combobox2;
