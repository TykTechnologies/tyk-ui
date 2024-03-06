import React, { Component, createRef } from 'react';
import ReactDOM from 'react-dom';
import PropTypes from 'prop-types';
import { fromJS } from 'immutable';

import format from 'date-fns/format';
import isDate from 'date-fns/isDate';

import EditableListForm from './js/EditableListForm';
import Column from '../../../layout/Column';
import Icon from '../../../components/Icon';
import Row from '../../../layout/Row';

class EditableList extends Component {
  static getItemListValue(itemValue) {
    let tempValue = null;

    if (typeof itemValue === 'string') {
      tempValue = itemValue;
    }

    if (Object.prototype.toString.call(itemValue) === '[object Object]') {
      tempValue = itemValue.name;
    }

    if (isDate(itemValue)) {
      tempValue = format(itemValue, 'dd/MM/yyyy');
    }

    return tempValue;
  }

  static getListItemCssClass(displayType) {
    const cssClasses = [];

    if (displayType === 'inline') {
      cssClasses.push('tyk-editable-list-item--inline');
    }

    return cssClasses.join(' ');
  }

  constructor(props) {
    super(props);
    const {
      value,
    } = this.props;

    this.state = {
      initialValue: value || '',
      value: value || [],
      buttonWidth: 0,
    };

    this.startIndex = 1;

    this.handleFormSubmit = this.handleFormSubmit.bind(this);
    this.getMainFormButtonWidth = this.getMainFormButtonWidth.bind(this);
    this.dropdownListItemRef = createRef();
  }

  static getDerivedStateFromProps(nextProps, prevState) {
    const state = {};

    if (
      nextProps.value && JSON.stringify(nextProps.value)
      !== JSON.stringify(prevState.initialValue)
    ) {
      state.value = nextProps.value || [];
      state.initialValue = nextProps.value || '';
    }

    return state.value ? state : null;
  }

  handleFormSubmit(value) {
    const tempState = this.addValues(value);
    this.setState((previousState) => ({ ...previousState, ...tempState }), () => {
      this.triggerOnChange(tempState.value.length - 1, null, value);
    });
  }

  handleItemUpdate(index, value) {
    let prevValue;
    this.setState((previousState) => {
      const tempState = { ...previousState };
      prevValue = fromJS(tempState.value[index].value).toJS();
      tempState.value[index].value = value;
      tempState.value[index].editMode = false;

      return tempState;
    }, () => {
      this.triggerOnChange(index, prevValue, value);
    });
  }

  handleChildrenOnChange(index, value) {
    let prevValue;
    this.setState((previousState) => {
      const tempState = { ...previousState };
      prevValue = fromJS(tempState.value[index].children).toJS();
      tempState.value[index].children = value;

      return tempState;
    }, () => {
      this.triggerOnChange(index, prevValue, value);
    });
  }

  getListItemsCssClass(displayType) {
    const { config } = this.props;
    const cssClasses = ['tyk-editable-list-items'];

    cssClasses.push(config.displayType || 'table');

    if (displayType === 'inline') {
      cssClasses.push('tyk-editable-list-items--inline');
    }

    return cssClasses.join(' ');
  }

  getFormInputKey() {
    this.startIndex += 1;
    return this.startIndex;
  }

  // generate list item value's based on the display types
  // table, inline, list
  getListItemText(itemData) {
    const { config } = this.props;
    let value = null;

    switch (config.displayType) {
      case 'list':
      case 'inline': {
        const itemText = itemData.value.reduce((prevValue, itemValue, index) => {
          const tempValue = EditableList.getItemListValue(itemValue);
          let separator = ', ';

          if (index === itemData.value.length - 1) {
            separator = '';
          }

          return prevValue + tempValue + separator;
        }, '');

        value = itemText;

        break;
      }
      default:
        value = (
          <Row>
            {
              config.components.map((component, index) => (
                <Column
                  key={this.getFormInputKey()}
                  size={`md-${component.size} lg-${component.size}`}
                >
                  { EditableList.getItemListValue(itemData.value[index]) }
                </Column>
              ))
            }
          </Row>
        );

        break;
    }

    return value;
  }

  getMainFormButtonWidth(value) {
    this.setState({
      buttonWidth: value,
    });
  }

  setItemEditMode(index) {
    const newValues = this.closeListItems();

    this.setState((previousState) => {
      const tempState = { ...previousState };
      tempState.value = newValues;
      tempState.value[index].editMode = !tempState.value[index].editMode;

      return tempState;
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

  closeListItems() {
    const { value } = this.state;

    const newValues = value.map((itemValue) => {
      const tempItemValue = { ...itemValue };

      if (tempItemValue.editMode) {
        tempItemValue.editMode = false;
        return tempItemValue;
      }

      return tempItemValue;
    });

    return newValues;
  }

  triggerOnChange(index, prevValue, nextValue) {
    const { onChange } = this.props;
    const { value } = this.state;

    if (onChange && typeof onChange === 'function') {
      onChange(((value.length) ? value : null), index, prevValue, nextValue);
    }
  }

  genListItem(itemData, index) {
    const { config, disabled } = this.props;
    const { buttonWidth, value } = this.state;

    const clonedComponents = fromJS(config.components).toJS();

    itemData.value.forEach((itemValue, itemIndex) => {
      clonedComponents[itemIndex].props.value = itemValue;
    });

    return (
      <li
        key={index}
        className={EditableList.getListItemCssClass(config.displayType)}
        ref={this.dropdownListItemRef}
      >
        <div
          className={`tyk-editable-list-item__text ${config.displayType || 'table'}${(itemData.editMode) ? ' edit-mode-wrapper' : ''}`}
        >
          {
            !itemData.editMode
              ? (
                <>
                  { this.getListItemText(itemData, index) }
                  <div
                    className="tyk-editable-list-item__controls"
                    style={{
                      display: 'block',
                      width: (config.displayType === 'inline') ? 'auto' : `${buttonWidth + 60}px`,
                    }}
                  >
                    <button
                      disabled={disabled}
                      type="button"
                      className="tyk-editable-list-action__button"
                      onClick={this.setItemEditMode.bind(this, index)}
                      aria-label="edit"
                    >
                      <Icon type="edit" />
                    </button>
                    <button
                      disabled={disabled}
                      type="button"
                      className="tyk-editable-list-action__button"
                      onClick={this.removeListItem.bind(this, index)}
                      aria-label="remove"
                    >
                      <Icon type="trash" />
                    </button>
                  </div>
                </>
              )
              : (
                <>
                  <EditableListForm
                    buttonName="Update"
                    noLabels={config.noLabels}
                    disabled={disabled}
                    displayType={config.displayType}
                    components={clonedComponents}
                    // eslint-disable-next-line react/jsx-no-bind
                    onSubmit={this.handleItemUpdate.bind(this, index)}
                    // eslint-disable-next-line react/jsx-no-bind
                    validate={this.isInList.bind(this, index)}
                    validationmessage="This value is already in the list"
                  />
                  <button
                    type="button"
                    className="tyk-editable-list-action__button on-edit"
                    onClick={this.removeListItem.bind(this, index)}
                    aria-label="remove"
                  >
                    <Icon type="trash" />
                  </button>
                </>
              )
          }
        </div>
        {
          config.children
            ? (
              <EditableList
                disabled={disabled}
                // eslint-disable-next-line react/jsx-no-bind
                onChange={this.handleChildrenOnChange.bind(this, index)}
                config={config.children.config}
                value={value[index]?.children || []}
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

    if (!value || value.length === 0) {
      return null;
    }

    return (
      <>
        {
          config.displayType === 'table' || !config.displayType
            ? (
              <div
                className="tyk-editable-list__header"
                style={{
                  paddingRight: `${buttonWidth + 60}px`,
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
      </>
    );
  }

  render() {
    const {
      addValueOnFieldChange, config, error, disabled, label,
    } = this.props;
    const appendToElement = document.querySelector(config.appendTo) || document.querySelector('body');

    return (
      <div className="tyk-editable-list">
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
          onSubmit={this.handleFormSubmit}
          // eslint-disable-next-line react/jsx-no-bind
          validate={this.isInList.bind(this, -1)}
          validationmessage="This value is already in the list"
          getMainFormButtonWidth={this.getMainFormButtonWidth}
        />
        {
          config.appendTo
            ? ReactDOM.createPortal(
              this.genList(),
              appendToElement,
            )
            : this.genList()
        }
      </div>
    );
  }
}

EditableList.propTypes = {
  addValueOnFieldChange: PropTypes.bool,
  disabled: PropTypes.bool,
  error: PropTypes.string,
  config: PropTypes.instanceOf(Object),
  onChange: PropTypes.func,
  label: PropTypes.oneOfType([
    PropTypes.arrayOf(PropTypes.node),
    PropTypes.node,
    PropTypes.element,
    PropTypes.func,
    PropTypes.string,
  ]),
  value: PropTypes.oneOfType([
    PropTypes.instanceOf(Array),
    PropTypes.instanceOf(Object),
  ]),
};

export default EditableList;
