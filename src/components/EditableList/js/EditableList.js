import React, { Component, Fragment, createRef } from 'react';
import ReactDOM from 'react-dom';
import PropTypes from 'prop-types';
import { fromJS } from 'immutable';
import { cloneDeep } from 'lodash';
import moment from 'moment';

import EditableListForm from './EditableListForm';
import Column from '../../Column';
import { Icon } from '../../Icon';
import Row from '../../Row';

export default class EditableList extends Component {
  static propTypes = {
    addValueOnFieldChange: PropTypes.bool,
    error: PropTypes.string,
    config: PropTypes.object,
    onChange: PropTypes.func,
  };

  state = {
    initialValue: this.props.value || '',
    value: this.props.value || [],
    buttonWidth: 0,
  };

  constructor(props) {
    super(props);

    this._handleFormSubmit = this._handleFormSubmit.bind(this);
    this.getMainFormButtonWidth = this.getMainFormButtonWidth.bind(this);
    this.dropdownListItemRef = createRef();
  }

  static getDerivedStateFromProps(nextProps, prevState) {
    const state = {};

    if (nextProps.value && JSON.stringify(nextProps.value) !== JSON.stringify(prevState.initialValue)) {
      state.value = nextProps.value || [];
      state.initialValue = nextProps.value || '';
    }

    return state.value ? state : null;
  }

  getMainFormButtonWidth(value) {
    this.setState({
      buttonWidth: value,
    });
  }

  triggerOnChange(index, prevValue, nextValue) {
    const { onChange } = this.props;

    if (onChange && typeof onChange === 'function') {
      onChange(((this.state.value.length) ? this.state.value : null), index, prevValue, nextValue);
    }
  }

  closeListItems() {
    const { value } = this.state;

    const newValues = value.map((value, index) => {
      if (value.editMode) {
        value.editMode = false;
        return value;
      }

      return value;
    });

    return newValues;
  }

  _handleFormSubmit(value) {
    const tempState = this.addValues(value);
    this.setState(previousState => Object.assign({}, previousState, tempState), () => {
      this.triggerOnChange(tempState.value.length - 1, null, value);
    });
  }

  isInList(index, itemValue) {
    const { value } = this.state;
    let ok = false;

    value.forEach((item, itemIndex) => {
      if (JSON.stringify(item.value) === JSON.stringify(itemValue)) {
        if (index >= 0 && itemIndex === index) {
          ok = false;
        } else {
          ok = true;
        }
      }
    });

    return ok;
  }

  addValues(newValue) {
    const { value } = this.state;
    const { config } = this.props;
    const itemValue = {
      editMode: false,
      value: newValue,
    };
    const tempState = {
      value: value.slice(0),
    };

    if (config.children) {
      itemValue.children = [];
    }

    tempState.value.push(itemValue);

    return tempState;
  }

  removeListItem(index) {
    let removedItem;
    this.setState((previousState) => {
      const valueArr = previousState.value.slice(0);
      removedItem = valueArr.splice(index, 1);

      return {
        value: valueArr,
      };
    }, () => {
      this.triggerOnChange(index, removedItem, null);
    });
  }

  setItemEditMode(index) {
    const newValues = this.closeListItems();

    this.setState((previousState) => {
      previousState.value = newValues;
      previousState.value[index].editMode = !previousState.value[index].editMode;

      return previousState;
    });
  }

  handleItemUpdate(index, value) {
    let prevValue;
    this.setState((previousState) => {
      prevValue = fromJS(previousState.value[index].value).toJS();
      previousState.value[index].value = value;
      previousState.value[index].editMode = false;

      return previousState;
    }, () => {
      this.triggerOnChange(index, prevValue, value);
    });
  }

  getListItemCssClass(displayType) {
    const cssClasses = [];

    if (displayType === 'inline') {
      cssClasses.push('editable-list-item--inline');
    }

    return cssClasses.join(' ');
  }

  getListItemsCssClass(displayType) {
    const { config } = this.props;
    const cssClasses = ['editable-list-items'];

    cssClasses.push(config.displayType || 'table');

    if (displayType === 'inline') {
      cssClasses.push('editable-list-items--inline');
    }

    return cssClasses.join(' ');
  }

  handleChildrenOnChange(index, value) {
    let prevValue;
    this.setState((previousState) => {
      prevValue = fromJS(previousState.value[index].children).toJS();
      previousState.value[index].children = value;

      return previousState;
    }, () => {
      this.triggerOnChange(index, prevValue, value);
    });
  }

  getItemListValue(itemValue) {
    let tempValue = null;

    if (typeof itemValue === 'string') {
      tempValue = itemValue;
    }

    if (Object.prototype.toString.call(itemValue) === '[object Object]') {
      tempValue = itemValue.name;
    }

    if (moment.isMoment(itemValue)) {
      tempValue = itemValue.format('L');
    }

    if (Object.prototype.toString.call(itemValue) === '[object Date]') {
      tempValue = moment(itemValue).format('L');
    }

    return tempValue;
  }

  // generate list item valuse based on the display types
  // table, inline, list
  getListItemText(itemData) {
    const { config } = this.props;
    let value = null;

    switch (config.displayType) {
    case 'list':
    case 'inline':
      const itemText = itemData.value.reduce((prevValue, itemValue, index) => {
        const tempValue = this.getItemListValue(itemValue);
        let separator = ', ';

        if (index === itemData.value.length - 1) {
          separator = '';
        }

        return prevValue + tempValue + separator;
      }, '');

      value = itemText;

      break;
    default:
      value = (
        <Row>
          {
            config.components.map((component, index) => (
              <Column
                key={this.getItemListValue(itemData.value[index]) + index}
                size={`md-${component.size} lg-${component.size}`}
              >
                { this.getItemListValue(itemData.value[index]) }
              </Column>
            ))
          }
        </Row>
      );

      break;
    }

    return value;
  }

  genListItem(itemData, index) {
    const { config, disabled } = this.props;
    const { buttonWidth, value } = this.state;

    const clonedComponents = cloneDeep(config.components);

    itemData.value.forEach((itemValue, index) => {
      clonedComponents[index].props.value = itemValue;
    });

    return (
      <li
        key={index}
        className={this.getListItemCssClass(config.displayType)}
        ref={this.dropdownListItemRef}
      >
        <div
          className={`editable-list-item__text ${config.displayType || 'table'}${(itemData.editMode) ? ' edit-mode-wrapper' : ''}`}
        >
          {
            !itemData.editMode
              ? (
                <Fragment>
                  { this.getListItemText(itemData, index) }
                  <div
                    className="editable-list-item__controls"
                    style={{
                      display: 'block',
                      width: (config.displayType === 'inline') ? 'auto' : `${buttonWidth + 15}px`,
                    }}
                  >
                    <button disabled={disabled} type="button" className="editable-list-action__button" onClick={this.setItemEditMode.bind(this, index)}>
                      <Icon type="edit" />
                    </button>
                    <button disabled={disabled} type="button" className="editable-list-action__button" onClick={this.removeListItem.bind(this, index)}>
                      <Icon type="trash" />
                    </button>
                  </div>
                </Fragment>
              )
              : (
                <Fragment>
                  <EditableListForm
                    buttonName="Update"
                    noLabels={config.noLabels}
                    disabled={disabled}
                    displayType={config.displayType}
                    components={clonedComponents}
                    onSubmit={this.handleItemUpdate.bind(this, index)}
                    validate={this.isInList.bind(this, index)}
                    validationmessage="This value is already in the list"
                  />
                  <button type="button" className="editable-list-action__button on-edit" onClick={this.removeListItem.bind(this, index)}>
                    <Icon type="trash" />
                  </button>
                </Fragment>
              )
          }
        </div>
        {
          config.children
            ? (
              <EditableList
                disabled={disabled}
                onChange={this.handleChildrenOnChange.bind(this, index)}
                config={config.children.config}
                value={(value[index] && value[index].children) || []}
              />
            )
            : null
        }
      </li>
    );
  }

  genList() {
    const { config } = this.props;
    const { buttonWidth, value } = this.state;

    return (
      <Fragment>
        {
          config.displayType === 'table' || !config.displayType
            ? (
              <div
                className="editable-list__header"
                style={{
                  paddingRight: `${buttonWidth + 15}px`,
                }}
              >
                <Row>
                  {
                    config.components.map((component, index) => (
                      <Column key={component.props.label || index} size={`md-${component.size || 12} lg-${component.size || 12}`}>
                        { component.props.label }
                      </Column>
                    ))
                  }
                </Row>
              </div>
            )
            : null
        }
        <ul className={this.getListItemsCssClass(config.displayType)}>
          {
            value.map((itemData, index) => this.genListItem(itemData, index))
          }
        </ul>
      </Fragment>
    );
  }

  render() {
    const {
      addValueOnFieldChange, config, error, disabled, label,
    } = this.props;
    const { buttonWidth, value } = this.state;

    return (
      <div className="editable-list">
        {
          label
            ? <label>{ label }</label>
            : null
        }
        <EditableListForm
          addValueOnFieldChange={addValueOnFieldChange}
          components={config.components}
          buttonName={config.formButtonTitle}
          buttonStyle={config.formButtonStyle}
          disabled={disabled}
          error={error}
          errorPersist={!!(error)}
          noLabels={config.noLabels}
          onSubmit={this._handleFormSubmit}
          validate={this.isInList.bind(this, -1)}
          validationmessage="This value is already in the list"
          getMainFormButtonWidth={this.getMainFormButtonWidth}
        />
        {
          value.length
            ? config.appendTo
              ? ReactDOM.createPortal(
                this.genList(),
                document.querySelector(config.appendTo) || document.querySelector('body'),
              )
              : this.genList()
            : null
        }
      </div>
    );
  }
}
