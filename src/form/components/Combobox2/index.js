import React, {
  useCallback, useEffect, useMemo, useRef, useState,
} from 'react';
import PropTypes from 'prop-types';

import Icon from '../../../components/Icon';
import FloatingContainer from '../../../components/FloatingContainer';

import Value from './js/Value';
import List from './js/List';

/**
 * Dropdown-like component that can display selected values as regular text,
 *  tags, or in a custom way.
 * You can select values from a list or type in new ones.
 */
function Combobox2({
  value: propValue,
  values: propValues = [],
  valueOverflow = 'single',
  label = '',
  labelwidth,
  tags = false,
  tagSeparators = [' ', 'Enter'],
  addTagOnBlur = false,
  max: maxProp,
  multiple = false,
  placeholder = '',
  note = '',
  error = '',
  disabled = false,
  readOnly = false,
  allowCustomValues = true,
  searchItem: matchItemFn,
  renderValue,
  renderListItem,
  renderList: renderListProp,
  CustomListComponent,
  onBeforeChange = () => true,
  onChange = () => {},
  floatingContainerConfig,
  expandMode,
  infiniteScrollerConfig,
  displayDropdownTrigger = true,
  selectAll,
  closeOnSelect,
  showSearch = false,
  required = false,
  validateOnChange = () => {},
  wrapperClassName = '',
  ...restProps
}) {
  const max = useMemo(
    () => (multiple ? Infinity : maxProp || (tags ? Infinity : 1)),
    [multiple, maxProp, tags],
  );
  const renderList = CustomListComponent
    ? (values, { sendMessage }) => (
      <CustomListComponent
        filteredValues={values}
        handleListItemClick={(index) => sendMessage('value.select', { item: values[index] })}
      />
    )
    : renderListProp;

  const rootRef = useRef(null);
  const comboboxControlRef = useRef(null);
  const dropdownRef = useRef(null);
  const listRef = useRef(null);

  const [value, setValue] = useState(getValueFromProp(propValue, propValues));
  const [values, setValues] = useState(propValues.map((v) => normalizeValue(v)));
  const [searchValue, setSearchValue] = useState('');
  const [activeItem, setActiveItem] = useState(null);
  const [isOpened, setIsOpened] = useState(false);
  const [valuesExpanded, setValuesExpanded] = useState(false);
  const [localValidationError, setLocalValidationError] = useState('');

  function getCssClasses() {
    return [
      wrapperClassName,
      'tyk-form-group',
      'tyk-combobox2',
      (error || localValidationError) && 'has-error',
      labelwidth && 'tyk-form-group--label-has-width',
      disabled && 'disabled',
      expandMode && 'is-expand-mode',
    ].filter(Boolean).join(' ');
  }

  function getFilteredValues() {
    const defaultFn = (v, s) => v?.name?.toLowerCase()?.includes(s);
    const fn = matchItemFn || defaultFn;
    const filteredValues = values.filter((v) => fn(v, searchValue.toLowerCase()));
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
    if (activeItem && getFilteredValues().every((fv) => fv.id !== activeItem.id)) {
      setActiveItem(null);
    }
    if (newSearchValue && !isOpened) openDropdown();
  }

  function isValidValue(newValues, lastValue) {
    const localError = validateOnChange(newValues, lastValue);
    setLocalValidationError(localError);
    return localError === undefined;
  }

  function updateValue(newValues) {
    setValue(newValues);
    onChange(max === 1 && !tags ? (newValues[0] || null) : newValues);
  }

  function addTag(val) {
    if (!val) return;
    if (value.length >= max) return;
    if (value.some(({ name }) => name === val)) return;

    const listValueIndex = values.findIndex((lv) => lv.name === val);
    let newValue;
    let finalValue = [...value];
    let selectedValues;

    if (listValueIndex === -1) {
      if (allowCustomValues) {
        newValue = { id: val, name: val };
        finalValue = [...value, newValue];
      }
    } else {
      selectedValues = [
        ...values.slice(0, listValueIndex),
        { ...values[listValueIndex], selected: true },
        ...values.slice(listValueIndex + 1),
      ];
      newValue = values[listValueIndex];
      finalValue = [...value, values[listValueIndex]];
    }

    if (isValidValue(finalValue, newValue) && onBeforeChange(value, finalValue)) {
      if (selectedValues) {
        setValues(selectedValues);
      }
      updateValue(finalValue);
    }
  }

  function removeTag(id) {
    if (required && max === 1) return;

    const listValueIndex = values.findIndex((lv) => lv.id === id);
    const newValue = value.filter((v) => v.id !== id);

    if (!onBeforeChange(value, newValue)) return;

    if (listValueIndex !== -1) {
      setValues([
        ...values.slice(0, listValueIndex),
        { ...values[listValueIndex], selected: false },
        ...values.slice(listValueIndex + 1),
      ]);
    }
    updateValue(newValue);
  }

  function selectValue({ id }) {
    const val = values.find((v) => v.id === id);
    const valIndex = values.findIndex((v) => v.id === id);
    let finalValue = value;
    let selectedValues = values;

    if (val.selected) {
      if (!required || max !== 1) {
        finalValue = value.filter((v) => v.id !== val.id);
        selectedValues = values.with(valIndex, { ...val, selected: false });
      }
    } else if (value.length < max) {
      finalValue = [...value, val];
      console.log('IFRIM', values);
      console.log('IFRIM2', Array.isArray(values));
      console.log('IFRIM3', values.with);
      selectedValues = values.with(valIndex, { ...val, selected: true });
    } else if (max === 1) {
      finalValue = [val];
      selectedValues = values.map((v) => ({ ...v, selected: v.id === val.id }));
    }

    if (isValidValue(finalValue, val) && onBeforeChange(value, finalValue)) {
      updateValue(finalValue);
      setValues(selectedValues);
    }

    if (max === 1 || closeOnSelect) {
      closeDropdown();
    }
  }

  function selectAllValues(selected) {
    if (values.length > max) return;
    const newValue = selected ? [...values] : [];

    if (!onBeforeChange(value, newValue)) return;

    updateValue(newValue);
    setValues(values.map((v) => ({ ...v, selected })));
    if (closeOnSelect) closeDropdown();
  }

  function moveUpActiveItem() {
    const visibleItems = getFilteredValues().filter((v) => !v.disabled);
    if (visibleItems.length === 0) return;
    if (activeItem === null || visibleItems.length === 1) {
      setActiveItem(visibleItems[visibleItems.length - 1]);
      return;
    }
    const activeIndex = visibleItems.findIndex((v) => v.id === activeItem.id);
    setActiveItem(visibleItems[activeIndex > 0 ? activeIndex - 1 : visibleItems.length - 1]);
  }

  function moveDownActiveItem() {
    const visibleItems = getFilteredValues().filter((v) => !v.disabled);
    if (visibleItems.length === 0) return;
    if (activeItem === null || visibleItems.length === 1) {
      setActiveItem(visibleItems[0]);
      return;
    }
    const activeIndex = visibleItems.findIndex((v) => v.id === activeItem.id);
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
    const isClickInside = rootRef.current?.contains(e.target)
      || dropdownRef.current?.contains(e.target);
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

  const onMessage = useCallback((message, data) => {
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
  }, [
    onTagMessage,
    selectValue,
    selectAllValues,
    openDropdown,
    updateSearchValue,
    closeDropdown,
    moveUpActiveItem,
    moveDownActiveItem,
  ]);

  const renderIcon = useCallback(
    () => (expandMode
      ? <Icon type={valuesExpanded ? 'chevron-down' : 'chevron-up'} />
      : <Icon type="chevron-down" />
    ),
    [expandMode, valuesExpanded],
  );

  useEffect(() => {
    window.addEventListener('click', handleDocumentClick, true);
    return () => window.removeEventListener('click', handleDocumentClick, true);
  }, []);

  useEffect(() => {
    if (propValues.length) {
      const newValues = propValues.map((v) => ({
        ...normalizeValue(v),
        selected: value.some((sv) => sv.id === v.id),
      }));
      setValues(newValues);
      setValue((val) => val.map((v) => newValues.find((nv) => nv.id === v.id) || v));
    } else if (values.length) {
      setValues([]);
    }
  }, [propValues]);

  useEffect(() => {
    const newValue = getValueFromProp(propValue, values);
    setValue(newValue);
    setValues((vals) => vals.map((v) => ({
      ...normalizeValue(v),
      selected: newValue.some((nv) => nv.id === v.id),
    })));
  }, [propValue]);

  useEffect(() => {
    if (!expandMode) return () => {};

    const valuesElement = comboboxControlRef.current.querySelector('.tyk-combobox2__current-values');
    const updateScroll = () => {
      valuesElement.scrollTop = valuesElement.scrollHeight;
    };
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
      ref={rootRef}
      tabIndex={disabled ? '-1' : '0'}
      onClickCapture={onClickCapture}
      {...restProps}
      className={getCssClasses()}
    >
      {label && (
        <label style={{ flexBasis: labelwidth || 'auto' }}>{label}</label>
      )}
      {!readOnly && (
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
                readOnly={readOnly}
              />
            </div>
            {displayDropdownTrigger && (
              <div
                className={`tyk-combobox2__values-container-trigger${valuesExpanded ? ' tyk-combobox2__values-container-trigger--expanded' : ''}`}
                role="button"
                tabIndex={disabled ? -1 : 0}
                onClick={executeTriggerAction}
                onKeyDown={executeTriggerAction}
              >
                {renderIcon()}
              </div>
            )}
          </div>
          {isOpened && (!tags || filteredValues.length > 0) && (
            <FloatingContainer
              element={comboboxControlRef}
              size="matchElement"
              className="tyk-combobox2__combobox-dropdown tyk-form-group"
              ref={dropdownRef}
              displayAxis="vertical"
              {...floatingContainerConfig}
              infiniteScrollerConfig={infiniteScrollerConfig}
            >
              {renderList ? (
                renderList(filteredValues, {
                  tags,
                  searchValue,
                  activeItem,
                  listRef,
                  sendMessage: onMessage,
                })
              ) : (
                <List
                  listRef={listRef}
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
          {((error && error !== 'true' && error !== 'false') || Boolean(localValidationError)) && (
            <p className="tyk-form-control__error-message">{error || localValidationError}</p>
          )}
        </div>
      )}
      {readOnly && (
        <div>
          <Value
            value={value}
            tags={tags}
            renderValue={renderValue}
            readOnly={readOnly}
          />
        </div>
      )}
    </div>
  );
}

Combobox2.propTypes = {
  /** If `true` it allows entering values that are not in the list. */
  allowCustomValues: PropTypes.bool,
  /** Alias for `renderList`
   * used for backwards compatibility with the old Combobox component. */
  CustomListComponent: PropTypes.elementType,
  /** A function used for filtering elements displayed in the list when typing in. */
  searchItem: PropTypes.func,
  /** A custom component that will be used to display a value. */
  renderValue: PropTypes.func,
  /** A custom component that will be used to display an item in the dropdown list. */
  renderListItem: PropTypes.func,
  /** A custom component that will be used to display the entire content of the dropdown. */
  renderList: PropTypes.func,
  disabled: PropTypes.bool,
  /** hides the UI form element and displayes just the value as text */
  readOnly: PropTypes.bool,
  error: PropTypes.string,
  label: PropTypes.oneOfType([
    PropTypes.arrayOf(PropTypes.node),
    PropTypes.node,
    PropTypes.element,
    PropTypes.func,
    PropTypes.string,
  ]),
  labelwidth: PropTypes.string,
  /** The maximum number of values that can be selected/added. */
  max: PropTypes.number,
  /** Shorthand for max=Infinity */
  multiple: PropTypes.bool,
  note: PropTypes.oneOfType([
    PropTypes.node,
    PropTypes.element,
    PropTypes.string,
  ]),
  /**
   * Callback called before changing the value of the component.
   * The value change will succeed only if the callback's return value is truthy.
   * The callback is called with two arguments: 1) the previous value, 2) the next value */
  onBeforeChange: PropTypes.func,
  onChange: PropTypes.func,
  placeholder: PropTypes.string,
  /** Enables the display of values as `Pill` components that can be
   *  removed without opening the dropdown. */
  tags: PropTypes.bool,
  /** A list of characters that will trigger the creation of a tag when typed. */
  tagSeparators: PropTypes.arrayOf(PropTypes.string),
  /** If set to true a tag will be created whenever the component loses focus
   *  and there is something typed in. */
  addTagOnBlur: PropTypes.bool,
  /** The value of the component. It can be a string, an array,
   *  or an object with an `id` property. */
  value: PropTypes.oneOfType([
    PropTypes.string,
    PropTypes.instanceOf(Array),
    PropTypes.instanceOf(Object),
  ]),
  /** An array of selectable values. */
  values: PropTypes.instanceOf(Array),
  /** Config object passed to the internal floating container component. */
  floatingContainerConfig: PropTypes.instanceOf(Object),
  /** If set to `single` it will display the values on a single line
   *  with an ellipsis at the end. */
  valueOverflow: PropTypes.oneOf(['single', 'multiple']),
  /**
   * If set to `true` whenever the user clicks on the dropdown trigger
   * the selected values container
   * will expand to show all selected values instead of opening the dropdown.
   */
  expandMode: PropTypes.bool,
  /** Config object passed to the internal infinite scroller component. */
  infiniteScrollerConfig: PropTypes.instanceOf(Object),
  /** Toggles the display of the dropdown trigger. */
  displayDropdownTrigger: PropTypes.bool,
  /**
   * If a boolean it will toggle the select all functionality from the dropdown.
   * It can also be an object with the shape `{ label, show, mode, render }`.
   * label - A string displayed as the select all option
   * show - It can be one of `['always', 'notSameState']`.
   *    `always` means the option will always be displayed.
   *    `notSameState` means it will be displayed only if the list items are
   * not all with the same state (depending on the `mode` value)
   * mode - It can be one of `['select', 'unselect']` and makes sense only
   * when the `show` property is `notSameState`
   *    `select` means the select all option will only be displayed if not all
   * items are selected
   *    `unselect` means the option will be displayed if no items are selected
   */
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
  /** It `true` the dropdown will close after selecting a value. */
  closeOnSelect: PropTypes.bool,
  /** Toggles the display of the search input from the dropdown. */
  showSearch: PropTypes.bool,
  /** If it is required and can only select one value once you have something
   * selected you will not be able to deselect */
  required: PropTypes.bool,
  /** Validates newly added value before adding it to the selected values.
   * Returns an error string in case of error otherwise it returns undefined
   */
  validateOnChange: PropTypes.func,
  wrapperClassName: PropTypes.string,
};

export default Combobox2;

function normalizeValue(value, values) {
  let v = value;
  if (typeof value === 'string') v = { id: value, name: value };
  else if (!value.hasOwnProperty('name')) v = { ...value, name: value.id }; // eslint-disable-line no-prototype-builtins
  if (!values) return v;
  const existingVal = values.find((ev) => ev.id === v.id);
  return existingVal ? { ...v, ...existingVal } : v;
}

function getValueFromProp(value, values) {
  if (!value) return [];
  if (Array.isArray(value)) return value.map((v) => normalizeValue(v, values));
  return [normalizeValue(value, values)];
}
