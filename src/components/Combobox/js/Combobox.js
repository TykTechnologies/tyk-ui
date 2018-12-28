import React, { Component, Fragment, createRef } from 'react';
import ReactDOM from 'react-dom';
import PropTypes from 'prop-types';

import { Icon } from '../../Icon';

const getStateSelectedValues = (multiple, tags, value) => {
  if(!value) {
    return (multiple || tags) ? [] : null;
  }

  return value;
};

export default class Combobox extends Component {
  static propTypes = {
    disabled: PropTypes.bool,
    id: PropTypes.string,
    label: PropTypes.string,
    multiple: PropTypes.bool,
    name: PropTypes.string,
    note: PropTypes.string,
    onChange: PropTypes.func,
    placeholder: PropTypes.string,
    tags: PropTypes.bool,
    validationmessages: PropTypes.object,
    values: PropTypes.array
  };

  state = {
    cursor: -1,
    opened: false,
    width: 50,
    initialValue: this.props.value,
    stateSelectedValues: getStateSelectedValues(this.props.multiple, this.props.tags, this.props.value),
    searchText: ''
  };

  constructor(props) {
    super(props);

    this.comboboxRef = createRef();
    this.valuesListRef = createRef();
    this.inputRef = createRef();
    this.textRef = createRef();

    this.focusInput = this.focusInput.bind(this);
    this.onKeyUp = this.onKeyUp.bind(this);
    this.openList = this.openList.bind(this);
    this.handleClickOutside = this.handleClickOutside.bind(this);
    this.handleItemsNavigation = this.handleItemsNavigation.bind(this);
    this.handleComboboxDropdownClick = this.handleComboboxDropdownClick.bind(this);
    this.handleListItemClick = this.handleListItemClick.bind(this);
    this.handlePillRemoveClick = this.handlePillRemoveClick.bind(this);
    this.manageSelectedTags = this.manageSelectedTags.bind(this);
  }

  componentDidMount() {
    const { tags } = this.props;

    if(tags) {
      this.setInputWidth();
    }

    this.bindEvents();
  }

  componentWillUnmount() {
    this.unBindEvents();
  }

  static getDerivedStateFromProps(nextProps, prevState) {
    if(JSON.stringify(nextProps.value) !== JSON.stringify(prevState.initialValue)) {
      return {
        initialValue: nextProps.value,
        stateSelectedValues: getStateSelectedValues(nextProps.multiple, nextProps.tags, nextProps.value)
      };
    }

    return null;
  }

  reset() {
    const { multiple, tags, value} = this.props;

    this.setState({
      stateSelectedValues: getStateSelectedValues(multiple, tags, value)
    });
  }

  focusInput() {
    if(this.inputRef.current) {
      this.inputRef.current.focus();
    }
  }

  closeList() {
    const { values } = this.props;

    return {
      cursor: -1,
      opened: false
    };
  }

  openList() {
    return {
      opened: true
    };
  }

  onKeyUp(e) {
    const { tags } = this.props;
    const { cursor, opened } = this.state;
    let filteredValues = this.filterValues();
    let tempState = Object.assign({}, this.getSearchText());

    if(tags && e.key !== 'Escape') {
      tempState = Object.assign({}, tempState, this.setInputWidth());
    }

    if(e.key === 'Enter') {
      let methodName = (tags) ? 'manageSelectedTags' : 'manageSelectedValues';
      tempState = Object.assign({}, tempState, this[methodName](cursor));
    }

    if(e.key === ' ' && tags) {
      tempState = Object.assign({}, tempState, this.manageSelectedTags());
    }

    if(
      !opened
      && this.inputRef.current.value
      && filteredValues
      && filteredValues.length
      && e.key !== 'Escape'
    ) {
      tempState = Object.assign({}, tempState, this.openList());
    }

    if(e.key === 'Escape' && opened) {
      tempState = Object.assign({}, tempState, this.closeList());
    }

    if(opened && filteredValues && !filteredValues.length) {
      tempState = Object.assign({}, tempState, this.closeList());
    }

    this.setState((previousState) => {
      return Object.assign({}, previousState, tempState);
    });
  }

  handleItemsNavigation(e) {
    const { tags } = this.props;
    if(['ArrowDown', 'ArrowUp'].indexOf(e.key) === -1) {
      return;
    }

    const { cursor } = this.state;
    let filteredValues = this.filterValues();
    let cursorNext;

    e.preventDefault();

    if(e.key === 'ArrowDown') {
      if(cursor === -1 || cursor === filteredValues.length - 1) {
        cursorNext = 0;
      }
      else if(cursor < filteredValues.length - 1) {
        cursorNext = cursor + 1;
      }
    }

    if(e.key === 'ArrowUp') {
      if(cursor > 0) {
        cursorNext = cursor - 1;
      } else {
        cursorNext = filteredValues.length - 1;
      }
    }

    if(this.valuesListRef.current && cursorNext > 4) {
      let scrollTop = (cursorNext - 4) * 38;

      this.valuesListRef.current.scrollTop = (!tags) ? 60 + scrollTop : scrollTop;
    } else if (this.valuesListRef.current) {
      this.valuesListRef.current.scrollTop = 0;
    }

    this.setState((previousState) => {
      return {
        ...previousState,
        opened: true,
        cursor: cursorNext
      };
    });
  }

  handleListItemClick(index) {
    let { tags } = this.props;

    let methodName = (tags) ? 'manageSelectedTags' : 'manageSelectedValues';
    let tempState = Object.assign({}, tempState, this[methodName](index));

    this.setState((previousState) => {
      return Object.assign({}, previousState, tempState);
    });
  }

  handlePillRemoveClick(index) {
    const { disabled } = this.props;

    if(disabled) {
      return;
    }

    let tempState = this.removeSelectedValue(index);

    this.setState((previousState) => {
      return Object.assign({}, previousState, tempState);
    });
  }

  handleClickOutside() {
    if (
      this.valuesListRef.current && !this.valuesListRef.current.contains(event.target) &&
      this.comboboxRef.current && !this.comboboxRef.current.contains(event.target)
    ) {
      this.setState((previousState) => {
        return Object.assign({}, previousState, this.closeList());
      });
    }
  }

  handleComboboxDropdownClick() {
    const { disabled } = this.props;

    if(disabled) {
      return;
    }

    this.setState((previousState) =>{
      return Object.assign({}, previousState, this.openList());
    });
  }

  bindEvents() {
    document.addEventListener('mousedown', this.handleClickOutside);
  }

  unBindEvents() {
    document.removeEventListener('mousedown', this.handleClickOutside);
  }


  filterValues() {
    const { values } = this.props;

    if(!this.inputRef.current) {
      return values;
    }

    let arr = values.filter((value) => {
      return value.name.toLowerCase().indexOf(this.inputRef.current.value.toLowerCase()) > -1;
    });

    return arr;
  }

  setInputWidth() {
    return {
      width: 50 + this.textRef.current.offsetWidth
    };
  }

  isInInitialValues(value) {
    const { values } = this.props;
    let ok = false;

    values.forEach((item) => {
      if(value.id === item.id) {
        ok = true;
      }
    });

    return ok;
  }

  getSelectedIndex(value) {
    const { stateSelectedValues } = this.state;
    const { tags, values } = this.props;
    let position = -1;

    if(Array.isArray(stateSelectedValues)) {
      stateSelectedValues.forEach((item, index) => {
        if(item.id === value.id) {
          position = index;
        }
      });
    } else if(stateSelectedValues) {
      if(stateSelectedValues.id === value.id) {
        position = 0;
      }
    }

    return position;
  }

  getSearchText() {
    return {
      searchText: this.inputRef.current.value
    };
  }

  removeSelectedValue(index) {
    let { stateSelectedValues } = this.state;
    let { onChange, values, input } = this.props;
    let tempStateSelectedValues = JSON.parse(JSON.stringify(stateSelectedValues));

    tempStateSelectedValues.splice(index, 1);

    if(onChange && typeof onChange === 'function') {
      onChange(tempStateSelectedValues.length ? tempStateSelectedValues : null);
    }

    return {
      stateSelectedValues: tempStateSelectedValues,
      searchText: ''
    };
  }

  addSelectedValue(value) {
    let { stateSelectedValues } = this.state;
    let { onChange, values } = this.props;
    let tempStateSelectedValues = JSON.parse(JSON.stringify(stateSelectedValues));

    tempStateSelectedValues.push(value);

    if(onChange && typeof onChange === 'function') {
      onChange(tempStateSelectedValues.length ? tempStateSelectedValues : null);
    }

    return {
      stateSelectedValues: tempStateSelectedValues,
      searchText: ''
    };
  }

  manageSelectedTags(index) {
    let { stateSelectedValues } = this.state;
    let filteredValues = this.filterValues();
    let { tags, values } = this.props;
    let value = {id: this.inputRef.current.value, name: this.inputRef.current.value};
    let tempValue = filteredValues[index] || value;
    let selectedIndex = this.getSelectedIndex(tempValue);
    let selectedValues = {};

    this.inputRef.current.value = '';

    if(selectedIndex > -1 && this.isInInitialValues(tempValue)) {
      selectedValues = this.removeSelectedValue(selectedIndex);
    } else if(selectedIndex === -1) {
      selectedValues = this.addSelectedValue(tempValue);
    }

    return selectedValues;
  }

  manageSelectedValues(index) {
    const { multiple, onChange, tags, values } = this.props;
    let { stateSelectedValues } = this.state;
    let filteredValues = this.filterValues();
    let tempSelectedValues = filteredValues[index];
    let selectedValues;
    let selectedIndex = this.getSelectedIndex(tempSelectedValues);

    if(tempSelectedValues && multiple) {
      if(selectedIndex > -1) {
        selectedValues = this.removeSelectedValue(selectedIndex);
      } else {
        selectedValues = this.addSelectedValue(filteredValues[index]);
      }

      //tempSelectedValues = stateSelectedValues;
    } else {
      selectedValues = {
        stateSelectedValues: (selectedIndex === -1) ? tempSelectedValues : { id: null }
      };

      if(onChange && typeof onChange === 'function') {
        onChange((selectedIndex === -1) ? tempSelectedValues : null);
      }
    }

    return selectedValues;
  }

  getListItemCssClasses(value, index) {
    let cssClasses = [];

    if(this.state.cursor === index) {
      cssClasses.push('active');
    }

    return cssClasses.join(' ');
  }

  getComboboxListCssClass() {
    const { opened } = this.state;
    const { tags } = this.props;

    let cssClasses = ['tyk-combobox__list'];

    if(opened) {
      cssClasses.push('tyk-combobox__list--opened');
    }

    if(tags) {
      cssClasses.push('tyk-combobox__list--has-tags');
    }

    return cssClasses.join(' ');
  }

  getCssClasses() {
    const { error, disabled } = this.props;
    let cssClasses = ['tyk-form-group', 'tyk-combobox'];

    if(error) {
      cssClasses.push('has-error');
    }

    if(disabled) {
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
    let scrollTop = document.documentElement.scrollTop;
    let el = this.comboboxRef.current;
    let elHeight = el.clientHeight;
    let elWidth = el.offsetWidth;
    let valuesListEl = this.valuesListRef.current;

    let offset = el.getBoundingClientRect();
    let left = offset.left;
    let top = 0;

    top = offset.top + scrollTop + elHeight;

    return {
      top: top - 1 + 'px',
      left: left + 'px',
      width: elWidth + 'px'
    };
  }

  getComboboxDisplayData() {
    const { stateSelectedValues } = this.state;
    const { multiple, placeholder } = this.props;
    if(!stateSelectedValues) {
      return placeholder;
    }

    if(stateSelectedValues && Array.isArray(stateSelectedValues) && !stateSelectedValues.length) {
      return placeholder;
    }

    if(stateSelectedValues && !Array.isArray(stateSelectedValues) && !stateSelectedValues.id) {
      return placeholder;
    }

    if(Array.isArray(stateSelectedValues) && multiple) {
      return stateSelectedValues.reduce((prevValue, value, index) => {
        return prevValue + value.name + ((index !== stateSelectedValues.length - 1) ? ', ' : '');
      }, '');
    }

    return stateSelectedValues.name;
  }

  render() {
    const { disabled, tags, placeholder } = this.props;
    const { width, opened, searchText, stateSelectedValues } = this.state;

    let filteredValues = this.filterValues();

    return (
      <Fragment>
        <div className={ this.getCssClasses() }>
          {
            this.props.label
              ? <label htmlFor={ this.props.id }>{ this.props.label }</label>
              : null
          }
          <ul
            className="tyk-form-control"
            onClick={ this.focusInput }
            ref={ this.comboboxRef }
          >
            {
              tags
                ? <Fragment>
                    {
                      stateSelectedValues.map((value, index) => {
                        return (
                          <li className="pill" key={ value.id }>
                            <a onClick={ this.handlePillRemoveClick.bind(this, index) } >
                              <Icon type="times" />
                            </a>
                            <span>{ value.name }</span>
                          </li>
                          );
                      })
                    }
                    <li
                      className="tyk-combobox__search-box"
                      style={{
                        width: (!stateSelectedValues.length) ? '100%' : 'auto'
                      }}
                    >
                      <input
                        className="tyk-form-control"
                        disabled={ disabled }
                        onKeyPress={ e => {
                          if (e.key === 'Enter') {
                            e.preventDefault();
                          }
                        }}
                        onKeyUp={ this.onKeyUp }
                        onKeyDown={ this.handleItemsNavigation }
                        placeholder={ (!stateSelectedValues.length) ? placeholder : '' }
                        ref={ this.inputRef }
                        style={{
                          width: (!stateSelectedValues.length) ? '100%' : width + 'px'
                        }}
                      />
                      <span ref={ this.textRef } style={{
                        visbility: 'hidden',
                        position: 'absolute',
                        top: '-9999px'
                      }}
                      >
                        { searchText }
                      </span>
                    </li>
                  </Fragment>
                : <li className="tyk-combobox__placeholder" onClick={ this.handleComboboxDropdownClick }>
                    { this.getComboboxDisplayData() }
                    <Icon type="arrow-down" />
                  </li>
            }
          </ul>
          {
            this.props.note
              ? <p className="tyk-form-control__help-block">{ this.props.note }</p>
              : null
          }
        </div>
        { this.getInputError() }
        {
          opened && filteredValues.length
            ? ReactDOM.createPortal(
              <ul
                className={ this.getComboboxListCssClass() }
                ref={ this.valuesListRef }
                style={this.getStyles()}
              >
                {
                  !tags ?
                    <li className="combobox-search__container">
                      <input
                        autoFocus={ opened }
                        className="tyk-form-control"
                        onKeyUp={ this.onKeyUp }
                        onKeyDown={ this.handleItemsNavigation }
                        key="searchInput"
                        ref={ this.inputRef }
                      />
                    </li>
                    : null
                }
                {
                  filteredValues
                    .map((value, index) => {
                      return (
                          <li
                            className={ this.getListItemCssClasses(value, index) }
                            onClick={ this.handleListItemClick.bind(this, index) }
                            key={ value.id }
                          >
                            {
                              (this.getSelectedIndex(value) > -1)
                                ? <Icon type="check" />
                                : null
                            }
                            <span> { value.name }</span>
                          </li>
                        );
                    })
                }
              </ul>,
              document.querySelector('body')
            )
            : null
        }
      </Fragment>
    );
  }
}
