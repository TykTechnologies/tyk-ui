import React, { Component, Fragment, createRef } from 'react';
import ReactDOM from 'react-dom';
import PropTypes from 'prop-types';

import Icon from '../../Icon';

const getStateSelectedValues = (multiple, tags, value) => {
  if (!value) {
    return (multiple || tags) ? [] : null;
  }

  return value;
};

export default class Combobox extends Component {
  static propTypes = {
    disabled: PropTypes.bool,
    error: PropTypes.string,
    id: PropTypes.string,
    label: PropTypes.string,
    multiple: PropTypes.bool,
    note: PropTypes.string,
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
    if (JSON.stringify(nextProps.value) !== JSON.stringify(prevState.initialValue)) {
      return {
        initialValue: nextProps.value,
        stateSelectedValues: getStateSelectedValues(
          nextProps.multiple,
          nextProps.tags,
          nextProps.value,
        ),
      };
    }

    return null;
  }

  onKeyUp(e) {
    const { tags } = this.props;
    const { cursor, opened } = this.state;
    const filteredValues = this.filterValues();
    let tempState = Object.assign({}, this.getSearchText());

    if (tags && e.key !== 'Escape') {
      tempState = Object.assign({}, tempState, this.setInputWidth());
    }

    if (e.key === 'Enter') {
      const methodName = (tags) ? 'manageSelectedTags' : 'manageSelectedValues';
      tempState = Object.assign({}, tempState, this[methodName](cursor));
    }

    if (e.key === ' ' && tags) {
      tempState = Object.assign({}, tempState, this.manageSelectedTags());
    }

    if (
      !opened
        && this.inputRef.current.value
        && filteredValues
        && filteredValues.length
        && e.key !== 'Escape'
    ) {
      tempState = Object.assign({}, tempState, Combobox.openList());
    }

    if (e.key === 'Escape' && opened) {
      tempState = Object.assign({}, tempState, Combobox.closeList());
    }

    if (opened && filteredValues && !filteredValues.length) {
      tempState = Object.assign({}, tempState, Combobox.closeList());
    }

    this.setState(previousState => Object.assign({}, previousState, tempState));
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
    const { error, disabled, theme } = this.props;
    const cssClasses = ['tyk-form-group', 'tyk-combobox'];
    const themes = theme ? theme.split(' ') : [];

    if (error) {
      cssClasses.push('has-error');
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
      values
      && values.length
      && !Array.isArray(stateSelectedValues) && !stateSelectedValues.name
    ) {
      return values.filter(value => value.id === stateSelectedValues.id)[0].name;
    }

    return stateSelectedValues.name;
  }

  manageSelectedTags(index) {
    const filteredValues = this.filterValues();
    const value = { id: this.inputRef.current.value, name: this.inputRef.current.value };
    const tempValue = filteredValues[index] || value;
    const selectedIndex = this.getSelectedIndex(tempValue);
    let selectedValues = {};

    this.inputRef.current.value = '';

    if (selectedIndex > -1 && this.isInInitialValues(tempValue)) {
      selectedValues = this.removeSelectedValue(selectedIndex);
    } else if (selectedIndex === -1) {
      selectedValues = this.addSelectedValue(tempValue);
    }

    return selectedValues;
  }

  manageSelectedValues(index) {
    const {
      multiple, onChange,
    } = this.props;
    const filteredValues = this.filterValues();
    const tempSelectedValues = filteredValues[index];
    let selectedValues;
    const selectedIndex = this.getSelectedIndex(tempSelectedValues);

    if (tempSelectedValues && multiple) {
      if (selectedIndex > -1) {
        selectedValues = this.removeSelectedValue(selectedIndex);
      } else {
        selectedValues = this.addSelectedValue(filteredValues[index]);
      }

      // tempSelectedValues = stateSelectedValues;
    } else {
      selectedValues = {
        stateSelectedValues: (selectedIndex === -1) ? tempSelectedValues : { id: null },
      };

      if (onChange && typeof onChange === 'function') {
        onChange((selectedIndex === -1) ? tempSelectedValues : null);
      }
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
    const { values } = this.props;

    if (!this.inputRef.current) {
      return values;
    }

    const arr = values
      .filter(
        value => value.name.toLowerCase().indexOf(this.inputRef.current.value.toLowerCase()) > -1,
      );

    return arr;
  }

  bindEvents() {
    document.addEventListener('mousedown', this.handleClickOutside);
  }

  unBindEvents() {
    document.removeEventListener('mousedown', this.handleClickOutside);
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

    this.setState(previousState => ({
      ...previousState,
      opened: true,
      cursor: cursorNext,
    }));
  }

  handleListItemClick(index) {
    const { multiple, tags } = this.props;

    const methodName = (tags) ? 'manageSelectedTags' : 'manageSelectedValues';
    const tempState = Object.assign({}, this.state, this[methodName](index));

    this.setState((previousState) => {
      if (!multiple && !tags) {
        tempState.opened = false;
      }

      return Object.assign({}, previousState, tempState);
    });
  }

  handlePillRemoveClick(index) {
    const { disabled } = this.props;

    if (disabled) {
      return;
    }

    const tempState = this.removeSelectedValue(index);

    this.setState(previousState => Object.assign({}, previousState, tempState));
  }

  handleClickOutside(event) {
    if (
      this.valuesListRef.current && !this.valuesListRef.current.contains(event.target)
      && this.comboboxRef.current && !this.comboboxRef.current.contains(event.target)
    ) {
      this.setState(previousState => Object.assign({}, previousState, Combobox.closeList()));
    }
  }

  handleComboboxDropdownClick() {
    const { disabled } = this.props;

    if (disabled) {
      return;
    }

    this.setState(previousState => Object.assign({}, previousState, Combobox.openList()));
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

  render() {
    const {
      disabled,
      id,
      label,
      note,
      tags,
      placeholder,
    } = this.props;
    const {
      width, opened, searchText, stateSelectedValues,
    } = this.state;

    const filteredValues = this.filterValues();

    return (
      <Fragment>
        <div className={this.getCssClasses()}>
          {
            label
              ? <label htmlFor={id}>{ label }</label>
              : null
          }
          <div className="tyk-form-control__wrapper">
            <ul
              className={`tyk-form-control${(tags) ? ' tyk-form-control--with-tags' : ''}`}
              onClick={this.focusInput}
              onKeyDown={() => {}}
              ref={this.comboboxRef}
            >
              {
                tags
                  ? (
                    <Fragment>
                      {
                        stateSelectedValues.map((value, index) => (
                          <li className="pill" key={value.id}>
                            <button type="button" onClick={this.handlePillRemoveClick.bind(this, index)}>
                              <Icon type="times" />
                            </button>
                            <span>{ value.name }</span>
                          </li>
                        ))
                      }
                      <li
                        className="tyk-combobox__search-box"
                        style={{
                          width: (!stateSelectedValues.length) ? '100%' : 'auto',
                        }}
                      >
                        <input
                          className="tyk-form-control"
                          disabled={disabled}
                          onKeyPress={(e) => {
                            if (e.key === 'Enter') {
                              e.preventDefault();
                            }
                          }}
                          onKeyUp={this.onKeyUp}
                          onKeyDown={this.handleItemsNavigation}
                          placeholder={(!stateSelectedValues.length) ? placeholder : ''}
                          ref={this.inputRef}
                          style={{
                            width: (!stateSelectedValues.length) ? '100%' : `${width}px`,
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
                      </li>
                    </Fragment>
                  )
                  : (
                    <li
                      className="tyk-combobox__placeholder"
                      onClick={this.handleComboboxDropdownClick}
                      onKeyDown={() => {}}
                    >
                      { this.getComboboxDisplayData() }
                      <Icon type="arrow-down" />
                    </li>
                  )
              }
            </ul>
            {
              note
                ? <p className="tyk-form-control__help-block">{ note }</p>
                : null
            }
            { this.getInputError() }
          </div>
        </div>
        {
          opened && filteredValues.length
            ? ReactDOM.createPortal(
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
              </ul>,
              document.querySelector('body'),
            )
            : null
        }
      </Fragment>
    );
  }
}
