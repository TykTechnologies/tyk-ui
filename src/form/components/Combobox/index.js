import React, { Component, createRef } from 'react';
import ReactDOM from 'react-dom';
import PropTypes from 'prop-types';

import Icon from '../../../components/Icon';
import Button from '../../../components/Button';

const getStateSelectedValues = (multiple, tags, value) => {
  if (!value) {
    return (multiple || tags) ? [] : null;
  }

  return value;
};

class Combobox extends Component {
  static closeList() {
    return {
      cursor: -1,
      opened: false,
    };
  }

  static openList() {
    return {
      opened: true,
    };
  }

  static filterByName(itemValue, inputValue) {
    return itemValue.name.toLowerCase().indexOf(inputValue) > -1;
  }

  constructor(props) {
    super(props);
    const {
      multiple,
      tags,
      value,
    } = props;

    this.state = {
      cursor: -1,
      opened: false,
      width: 50,
      initialValue: value,
      stateSelectedValues: getStateSelectedValues(multiple, tags, value),
      searchText: '',
      tags,
    };

    this.comboboxRef = createRef();
    this.valuesListRef = createRef();
    this.inputRef = createRef();
    this.textRef = createRef();

    this.focusInput = this.focusInput.bind(this);
    this.onKeyUp = this.onKeyUp.bind(this);
    Combobox.openList = Combobox.openList.bind(this);
    this.handleClickOutside = this.handleClickOutside.bind(this);
    this.handleItemsNavigation = this.handleItemsNavigation.bind(this);
    this.handleComboboxDropdownClick = this.handleComboboxDropdownClick.bind(this);
    this.handleListItemClick = this.handleListItemClick.bind(this);
    this.handlePillRemoveClick = this.handlePillRemoveClick.bind(this);
    this.manageSelectedTags = this.manageSelectedTags.bind(this);
  }

  componentDidMount() {
    const { tags } = this.props;

    if (tags) {
      this.setInputWidth();
    }

    this.bindEvents();
  }

  componentWillUnmount() {
    this.unBindEvents();
  }

  static getDerivedStateFromProps(nextProps, prevState) {
    if (
      JSON.stringify(nextProps.value) !== JSON.stringify(prevState.initialValue)
      || nextProps.tags !== prevState.tags
    ) {
      return {
        initialValue: nextProps.value,
        stateSelectedValues: getStateSelectedValues(
          nextProps.multiple,
          nextProps.tags,
          nextProps.value,
        ),
        tags: nextProps.tags,
      };
    }

    return null;
  }

  handleItemsNavigation(e) {
    const { tags } = this.props;
    if (['ArrowDown', 'ArrowUp'].indexOf(e.key) === -1) {
      return;
    }

    const { cursor } = this.state;
    const filteredValues = this.filterValues();
    let cursorNext;

    e.preventDefault();

    if (e.key === 'ArrowDown') {
      if (cursor === -1 || cursor === filteredValues.length - 1) {
        cursorNext = 0;
      } else if (cursor < filteredValues.length - 1) {
        cursorNext = cursor + 1;
      }
    }

    if (e.key === 'ArrowUp') {
      if (cursor > 0) {
        cursorNext = cursor - 1;
      } else {
        cursorNext = filteredValues.length - 1;
      }
    }

    if (this.valuesListRef.current && cursorNext > 4) {
      const scrollTop = (cursorNext - 4) * 38;

      this.valuesListRef.current.scrollTop = (!tags) ? 60 + scrollTop : scrollTop;
    } else if (this.valuesListRef.current) {
      this.valuesListRef.current.scrollTop = 0;
    }

    this.setState((previousState) => ({
      ...previousState,
      opened: true,
      cursor: cursorNext,
    }));
  }

  handleListItemClick(index) {
    const clickedValue = this.props.values[index];
    if (clickedValue.disabled) return;

    const { multiple, tags } = this.props;

    const methodName = (tags) ? 'manageSelectedTags' : 'manageSelectedValues';
    const tempState = { ...this.state, ...this[methodName](index) };

    this.setState((previousState) => {
      if (!multiple && !tags) {
        tempState.opened = false;
      }

      return { ...previousState, ...tempState };
    });
  }

  handlePillRemoveClick(index) {
    const { disabled } = this.props;

    if (disabled) {
      return;
    }

    const tempState = this.removeSelectedValue(index);

    this.setState((previousState) => ({ ...previousState, ...tempState }));
  }

  handleClickOutside(event) {
    if (
      this.valuesListRef.current && !this.valuesListRef.current.contains(event.target)
      && this.comboboxRef.current && !this.comboboxRef.current.contains(event.target)
    ) {
      this.setState((previousState) => ({ ...previousState, ...Combobox.closeList() }));
    }
  }

  handleComboboxDropdownClick() {
    const { disabled } = this.props;

    if (disabled) {
      return;
    }

    this.setState((previousState) => ({ ...previousState, ...Combobox.openList() }));
  }

  onKeyUp(e) {
    const { tags, allowCustomValues } = this.props;
    const { cursor, opened } = this.state;
    const filteredValues = this.filterValues();
    let tempState = this.getSearchText();

    if (tags && e.key !== 'Escape') {
      tempState = { ...tempState, ...this.setInputWidth() };
    }

    if (e.key === 'Enter') {
      const methodName = (tags) ? 'manageSelectedTags' : 'manageSelectedValues';
      tempState = { ...tempState, ...this[methodName](cursor) };
    }

    if (allowCustomValues && e.key !== ' ' && tags) {
      tempState = { ...tempState, ...this.manageSelectedTags() };
    }

    if (
      !opened
        && this.inputRef.current.value
        && filteredValues?.length
        && e.key !== 'Escape'
    ) {
      tempState = { ...tempState, ...Combobox.openList() };
    }

    if (e.key === 'Escape' && opened) {
      tempState = { ...tempState, ...Combobox.closeList() };
    }

    if (opened && filteredValues && !filteredValues.length) {
      tempState = { ...tempState, ...Combobox.closeList() };
    }

    this.setState((previousState) => ({ ...previousState, ...tempState }));
  }

  getLabelStyles() {
    const { labelwidth } = this.props;
    const styles = {};

    if (labelwidth) {
      styles.flexBasis = labelwidth;
    }

    return styles;
  }

  getNonLabelWidth() {
    const { labelwidth } = this.props;
    const styles = {};

    if (labelwidth) {
      styles.flexBasis = `calc(100% - ${labelwidth} - 20px)`;
    }

    return styles;
  }

  setInputWidth() {
    return {
      width: 50 + this.textRef.current.offsetWidth,
    };
  }

  getSelectedIndex(value) {
    const { stateSelectedValues } = this.state;
    let position = -1;

    if (Array.isArray(stateSelectedValues)) {
      stateSelectedValues.forEach((item, index) => {
        if (item.id === value.id) {
          position = index;
        }
      });
    } else if (stateSelectedValues) {
      if (stateSelectedValues.id === value.id) {
        position = 0;
      }
    }

    return position;
  }

  getSearchText() {
    return {
      searchText: this.inputRef.current.value,
    };
  }

  getListItemCssClasses(value, index) {
    const cssClasses = [];
    const {
      cursor,
    } = this.state;

    if (cursor === index) {
      cssClasses.push('active');
    }

    if (value.disabled) {
      cssClasses.push('disabled');
    }

    return cssClasses.join(' ');
  }

  getComboboxListCssClass() {
    const { opened } = this.state;
    const { tags, theme } = this.props;
    const themes = theme ? theme.split(' ') : [];

    const cssClasses = ['tyk-combobox__list'];

    if (opened) {
      cssClasses.push('tyk-combobox__list--opened');
    }

    if (tags) {
      cssClasses.push('tyk-combobox__list--has-tags');
    }

    if (themes.length) {
      themes.forEach((iTheme) => {
        cssClasses.push(`tyk-form-group--${iTheme}`);
      });
    }

    return cssClasses.join(' ');
  }

  getCssClasses() {
    const {
      error, disabled, theme, labelwidth,
    } = this.props;
    const cssClasses = ['tyk-form-group', 'tyk-combobox'];
    const themes = theme ? theme.split(' ') : [];

    if (error) {
      cssClasses.push('has-error');
    }

    if (labelwidth) {
      cssClasses.push('tyk-form-group--label-has-width');
    }

    if (themes.length) {
      themes.forEach((iTheme) => {
        cssClasses.push(`tyk-form-group--${iTheme}`);
      });
    }

    if (disabled) {
      cssClasses.push('disabled');
    }

    return cssClasses.join(' ');
  }

  getInputError() {
    const { error } = this.props;

    return (error && error !== 'true' && error !== 'false')
      ? (
        <p
          className="tyk-form-control__error-message"
        >
          { error }
        </p>
      )
      : null;
  }

  getStyles() {
    const { scrollTop } = document.documentElement;
    const el = this.comboboxRef.current;
    const elHeight = el.offsetHeight;
    const elWidth = el.offsetWidth;

    const offset = el.getBoundingClientRect();
    const { left } = offset;
    let top = 0;

    top = offset.top + scrollTop + elHeight;

    return {
      top: `${top - 1}px`,
      left: `${left}px`,
      width: `${elWidth}px`,
    };
  }

  getComboboxDisplayData() {
    const { stateSelectedValues } = this.state;
    const { multiple, placeholder, values } = this.props;

    if (!stateSelectedValues) {
      return placeholder;
    }

    if (stateSelectedValues && Array.isArray(stateSelectedValues) && !stateSelectedValues.length) {
      return placeholder;
    }

    if (stateSelectedValues && !Array.isArray(stateSelectedValues) && !stateSelectedValues.id) {
      return placeholder;
    }

    if (Array.isArray(stateSelectedValues) && multiple) {
      return stateSelectedValues.reduce((prevValue, value, index) => prevValue + value.name + ((index !== stateSelectedValues.length - 1) ? ', ' : ''), '');
    }

    if (
      values?.length
      && !Array.isArray(stateSelectedValues) && !stateSelectedValues.name
    ) {
      return values.filter((value) => value.id === stateSelectedValues.id)[0].name;
    }

    return stateSelectedValues.name;
  }

  manageSelectedTags(index) {
    const { max, allowCustomValues } = this.props;
    const { stateSelectedValues } = this.state;
    const filteredValues = this.filterValues();
    const value = { id: this.inputRef.current.value, name: this.inputRef.current.value };

    if (allowCustomValues === false && index === -1) {
      return null;
    }

    const tempValue = filteredValues[index] || value;
    const selectedIndex = this.getSelectedIndex(tempValue);
    let selectedValues = {};

    this.inputRef.current.value = '';

    if (selectedIndex > -1 && this.isInInitialValues(tempValue)) {
      selectedValues = this.removeSelectedValue(selectedIndex);
    } else if (selectedIndex === -1) {
      if (max && stateSelectedValues.length >= max) {
        return selectedValues;
      }
      selectedValues = this.addSelectedValue(tempValue);
    }

    return selectedValues;
  }

  manageSelectedValues(index) {
    const { stateSelectedValues } = this.state;
    const { multiple, onChange, max } = this.props;
    const filteredValues = this.filterValues();
    const tempSelectedValues = filteredValues[index];
    let selectedValues;
    const selectedIndex = this.getSelectedIndex(tempSelectedValues);

    if (tempSelectedValues && multiple) {
      if (selectedIndex > -1) {
        selectedValues = this.removeSelectedValue(selectedIndex);
      } else {
        if (max && stateSelectedValues.length >= max) {
          return selectedValues;
        }
        selectedValues = this.addSelectedValue(filteredValues[index]);
      }
    } else {
      selectedValues = {
        stateSelectedValues: (selectedIndex === -1) ? tempSelectedValues : { id: null },
      };

      onChange?.((selectedIndex === -1) ? tempSelectedValues : null);
    }

    return selectedValues;
  }

  removeSelectedValue(index) {
    const { stateSelectedValues } = this.state;
    const { onChange } = this.props;
    const tempStateSelectedValues = JSON.parse(JSON.stringify(stateSelectedValues));

    tempStateSelectedValues.splice(index, 1);

    if (onChange && typeof onChange === 'function') {
      onChange(tempStateSelectedValues.length ? tempStateSelectedValues : null);
    }

    return {
      stateSelectedValues: tempStateSelectedValues,
      searchText: '',
    };
  }

  addSelectedValue(value) {
    const { stateSelectedValues } = this.state;
    const { onChange } = this.props;
    const tempStateSelectedValues = JSON.parse(JSON.stringify(stateSelectedValues));

    tempStateSelectedValues.push(value);

    if (onChange && typeof onChange === 'function') {
      onChange(tempStateSelectedValues.length ? tempStateSelectedValues : null);
    }

    return {
      stateSelectedValues: tempStateSelectedValues,
      searchText: '',
    };
  }

  isInInitialValues(value) {
    const { values } = this.props;
    let ok = false;

    values.forEach((item) => {
      if (value.id === item.id) {
        ok = true;
      }
    });

    return ok;
  }

  filterValues() {
    const { values, searchItem } = this.props;

    if (!this.inputRef.current) {
      return values;
    }

    const arr = values
      .filter(
        (value) => (searchItem
          ? searchItem(value, this.inputRef.current.value.toLowerCase())
          : Combobox.filterByName(value, this.inputRef.current.value.toLowerCase())),
      );

    return arr;
  }

  bindEvents() {
    document.addEventListener('mousedown', this.handleClickOutside);
  }

  unBindEvents() {
    document.removeEventListener('mousedown', this.handleClickOutside);
  }

  reset() {
    const { multiple, tags, value } = this.props;

    this.setState({
      stateSelectedValues: getStateSelectedValues(multiple, tags, value),
    });
  }

  focusInput() {
    if (this.inputRef.current) {
      this.inputRef.current.focus();
    }
  }

  renderInput(filteredValues) {
    const {
      disabled,
      tags,
      max,
      placeholder,
    } = this.props;
    const {
      width, searchText, stateSelectedValues,
    } = this.state;

    return (
      <ul
        className={`tyk-form-control${(tags) ? ' tyk-form-control--with-tags' : ''}`}
        onClick={this.focusInput}
        onKeyDown={() => {}}
        ref={this.comboboxRef}
      >
        {
          tags
            ? (
              <>
                {
                  (stateSelectedValues || []).map((value, index) => (
                    <li className="pill" key={value.id}>
                      <button
                        type="button"
                        onClick={this.handlePillRemoveClick.bind(this, index)}
                        aria-label="remove"
                      >
                        <Icon type="xmark" />
                      </button>
                      <span>{ value.name }</span>
                    </li>
                  ))
                }
                <li
                  className="tyk-combobox__search-box"
                  style={{
                    width: (!stateSelectedValues?.length) ? '100%' : 'auto',
                  }}
                >
                  {(max === undefined || stateSelectedValues?.length < max) && (
                    <>
                      <input
                        className="tyk-form-control"
                        disabled={disabled}
                        onKeyDown={(e) => {
                          if (e.key === 'Enter') {
                            e.preventDefault();
                          }
                          this.handleItemsNavigation(e);
                        }}
                        onKeyUp={this.onKeyUp}
                        placeholder={(!stateSelectedValues?.length) ? placeholder : ''}
                        ref={this.inputRef}
                        style={{
                          width: (!stateSelectedValues?.length) ? '100%' : `${width}px`,
                        }}
                      />
                      <span
                        ref={this.textRef}
                        style={{
                          visbility: 'hidden',
                          position: 'absolute',
                          top: '-9999px',
                        }}
                      >
                        { searchText }
                      </span>
                    </>
                  )}
                  {filteredValues.length > 0 && (
                    <Button
                      className="tyk-combobox--with-tags__button-down"
                      iconType="chevron-down"
                      iconOnly
                      onClick={this.handleComboboxDropdownClick}
                    />
                  )}
                </li>
              </>
            )
            : (
              <li
                className="tyk-combobox__placeholder"
                onClick={this.handleComboboxDropdownClick}
                onKeyDown={() => {}}
              >
                { this.getComboboxDisplayData() }
                <Icon type="chevron-down" />
              </li>
            )
        }
      </ul>
    );
  }

  renderDropdown(filteredValues) {
    const { tags } = this.props;
    const { opened } = this.state;
    return (
      <ul
        className={this.getComboboxListCssClass()}
        ref={this.valuesListRef}
        style={this.getStyles()}
      >
        {
          !tags
            ? (
              <li className="combobox-search__container">
                <input
                  autoFocus={opened}
                  className="tyk-form-control"
                  onKeyUp={this.onKeyUp}
                  onKeyDown={this.handleItemsNavigation}
                  key="searchInput"
                  ref={this.inputRef}
                />
              </li>
            )
            : null
        }
        {
          filteredValues
            .map((value, index) => (
              <li
                className={this.getListItemCssClasses(value, index)}
                onClick={this.handleListItemClick.bind(this, index)}
                onKeyDown={() => {}}
                key={value.id}
              >
                {
                  (this.getSelectedIndex(value) > -1)
                    ? <Icon type="check" />
                    : null
                }
                <span>
                  {' '}
                  { value.name }
                </span>
              </li>
            ))
        }
      </ul>
    );
  }

  render() {
    const {
      CustomListComponent,
      id,
      label,
      note,
    } = this.props;
    const { opened } = this.state;

    const filteredValues = this.filterValues();

    return (
      <>
        <div className={this.getCssClasses()}>
          {
            label
              ? <label htmlFor={id} style={this.getLabelStyles()}>{ label }</label>
              : null
          }
          <div
            className="tyk-form-control__wrapper"
            style={this.getNonLabelWidth()}
          >
            {this.renderInput(filteredValues)}
            {
              note
                ? <p className="tyk-form-control__help-block">{ note }</p>
                : null
            }
            { this.getInputError() }
          </div>
        </div>
        {
          !CustomListComponent
            ? opened && filteredValues.length
              ? ReactDOM.createPortal(
                this.renderDropdown(filteredValues),
                document.querySelector('body'),
              )
              : null
            : (
              <CustomListComponent
                ref={this.valuesListRef}
                className={this.getComboboxListCssClass()}
                getListItemCssClasses={this.getListItemCssClasses.bind(this)}
                getSelectedIndex={this.getSelectedIndex.bind(this)}
                filteredValues={filteredValues}
                handleListItemClick={this.handleListItemClick.bind(this)}
              />
            )
        }
      </>
    );
  }
}

Combobox.propTypes = {
  allowCustomValues: PropTypes.bool,
  CustomListComponent: PropTypes.elementType,
  searchItem: PropTypes.func,
  disabled: PropTypes.bool,
  error: PropTypes.string,
  id: PropTypes.string,
  label: PropTypes.oneOfType([
    PropTypes.arrayOf(PropTypes.node),
    PropTypes.node,
    PropTypes.element,
    PropTypes.func,
    PropTypes.string,
  ]),
  labelwidth: PropTypes.string,
  multiple: PropTypes.bool,
  max: PropTypes.number,
  note: PropTypes.oneOfType([
    PropTypes.node,
    PropTypes.element,
    PropTypes.string,
  ]),
  onChange: PropTypes.func,
  placeholder: PropTypes.string,
  tags: PropTypes.bool,
  theme: PropTypes.string,
  value: PropTypes.oneOfType([
    PropTypes.string,
    PropTypes.instanceOf(Object),
    PropTypes.instanceOf(Array),
  ]),
  values: PropTypes.instanceOf(Array),
};

Combobox.defaultProps = {
  allowCustomValues: true,
};

export default Combobox;
