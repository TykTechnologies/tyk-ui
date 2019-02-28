import React, { Component, Fragment, createRef } from 'react';
import PropTypes from 'prop-types';
import { fromJS } from 'immutable';

import Column from '../../Column';
import Row from '../../Row';
import Button from '../../Button';

export default class EditableListForm extends Component {
  static propTypes = {
    addValueOnFieldChange: PropTypes.bool,
    noLabels: PropTypes.bool,
    buttonName: PropTypes.string,
    buttonStyle: PropTypes.string,
    components: PropTypes.array,
    displayType: PropTypes.string,
    error: PropTypes.string,
    errorPersist: PropTypes.bool,
    onSubmit: PropTypes.func,
    validate: PropTypes.func,
    validationmessage: PropTypes.string,
  };

  state = {
    errors: {},
    mainError: null,
    mainFormValue: this.getMainFormValue(),
    refs: [],
  };

  constructor(props) {
    super(props);

    this.submitButtonRef = createRef();
    this.handleOnChange = this.handleOnChange.bind(this);
    this.submitForm = this.submitForm.bind(this);
  }

  componentDidMount() {
    const { addValueOnFieldChange } = this.props;
    this.createRefs();

    if (this.props.getMainFormButtonWidth) {
      this.props.getMainFormButtonWidth(!addValueOnFieldChange ? this.submitButtonRef.current.clientWidth : 0);
    }
  }

  getMainFormValue() {
    const { components } = this.props;
    const mainFormValue = new Array(components.length);

    components.forEach((component, index) => {
      mainFormValue[index] = component.props.value || undefined;
    });

    return mainFormValue;
  }

  createRefs() {
    const { components } = this.props;
    const refs = [];

    components.forEach((component) => {
      refs.push(createRef());
    });

    this.setState({
      refs,
    });
  }

  validateValue(value, props) {
    const { mainError } = this.state;
    const { error, errorPersist } = this.props;

    const validatorsNames = props.validate ? Object.keys(props.validate) : [];
    // if there is a general form error don't take field errors into consideration
    const tempState = {
      errors: (error || mainError) ? {} : Object.assign({}, this.state.errors),
    };
    let ok = true;

    // if the error should stay after changing fields values don't take actions
    if (errorPersist) {
      return tempState;
    }

    // validate each field from the form
    for (let i = 0; i < validatorsNames.length; i++) {
      const validator = props.validate[validatorsNames[i]];
      if (validator(value)) {
        tempState.errors[props.name] = props.validationmessages[validatorsNames[i]];
        ok = false;
        break;
      }
    }

    // if the field is ok delete its error
    if (ok) {
      delete tempState.errors[props.name];
    }

    tempState.mainError = null;

    return tempState;
  }

  hasMainFormErrors() {
    const { components, errorPersist } = this.props;
    const { mainFormValue } = this.state;
    const tempState = {
      errors: Object.assign({}, this.state.errors),
    };

    if (errorPersist && mainFormValue.indexOf(undefined) === -1) {
      return false;
    }

    if (Object.keys(tempState.errors).length > 0) {
      return true;
    }

    components.forEach((component, index) => {
      tempState.errors = Object.assign({}, tempState.errors, this.validateValue(mainFormValue[index], component.props).errors);
    });

    return Object.keys(tempState.errors).length > 0;
  }

  handleOnChange(component, index, value) {
    const { addValueOnFieldChange } = this.props;
    let tempState = this.state;

    tempState = Object.assign({}, tempState, this.validateValue(value, component.props));

    if (!tempState.errors[component.props.name]) {
      tempState.mainFormValue[index] = value;
    }

    this.setState(previousState => Object.assign({}, previousState, tempState), () => {
      console.log('aaaa', addValueOnFieldChange);
      if (addValueOnFieldChange) {
        this.submitForm();
      }
    });
  }

  resetForm() {
    const { refs, mainFormValue } = this.state;

    refs.forEach((ref) => {
      if (ref.current.reset) {
        ref.current.reset();
      }
    });

    this.setState({
      errors: {},
      mainError: null,
      mainFormValue: this.getMainFormValue(),
    });
  }

  showMainError(error) {
    const { components } = this.props;

    this.setState({
      mainError: error,
    });
  }

  submitForm() {
    const { errors, mainFormValue, refs } = this.state;
    const {
      errorPersist, onSubmit, validate, validationmessage, error,
    } = this.props;
    console.log(mainFormValue);
    if (errorPersist) {
      onSubmit(mainFormValue);
      this.resetForm();
    }

    if (
      Object.keys(errors).length === 0
      && (onSubmit && typeof onSubmit === 'function')
    ) {
      if (validate) {
        if (validate(mainFormValue)) {
          this.showMainError(validationmessage);
        } else {
          onSubmit(mainFormValue);
          this.resetForm();
        }
      } else {
        onSubmit(mainFormValue);
        this.resetForm();
      }
    }
  }

  getComponentsError(component) {
    const { errors, mainError } = this.state;

    if (this.props.error || mainError) {
      errors[component.props.name] = 'true';
    } else if (!(this.props.error || mainError) && errors[component.props.name] === 'true') {
      delete errors[component.props.name];
    }

    return errors[component.props.name] ? errors[component.props.name].toString() : undefined;
  }

  getButtonClassName() {
    const { buttonStyle, displayType } = this.props;
    const cssClasses = [];

    if (buttonStyle) {
      cssClasses.push(buttonStyle);
    }

    if (displayType) {
      cssClasses.push(displayType);
    }

    return cssClasses.join(' ');
  }

  getFormCssClasses() {
    const { noLabels } = this.props;
    const cssClasses = ['editable-list__form'];

    if (noLabels) {
      cssClasses.push('no-labels');
    }

    return cssClasses.join(' ');
  }

  render() {
    const {
      addValueOnFieldChange, components, buttonName, buttonStyle, disabled, displayType, error,
    } = this.props;
    const { errors, mainError, refs } = this.state;

    return (
      <div>
        <div className={this.getFormCssClasses()}>
          <Row>
            {
              components.map((component, index) => {
                const Component = component.name;
                return (
                  <Column size={`md-${component.size || '12'} lg-${component.size || '12'}`} key={component.props.name}>
                    <Component
                      disabled={disabled || component.props.disabled}
                      onChange={this.handleOnChange.bind(this, component, index)}
                      {...component.props}
                      label={displayType === 'inline' ? '' : component.props.label}
                      error={this.getComponentsError(component)}
                      ref={refs[index]}
                    />
                  </Column>
                );
              })
            }
          </Row>
          {
            !addValueOnFieldChange
              ? (
                <span
                  className={this.getButtonClassName()}
                  ref={this.submitButtonRef}
                >
                  <Button
                    disabled={this.hasMainFormErrors()}
                    onClick={this.submitForm}
                    theme="default"
                    type="button"
                    size={displayType === 'inline' ? 'sm' : 'md'}
                  >
                    { buttonName || 'ADD' }
                  </Button>
                </span>
              )
              : null
          }
        </div>
        {
          error || mainError
            ? (
              <div className="editable-list-main-error">
                <p className="error-message">
                  { error || mainError }
                </p>
              </div>
            )
            : null
        }
      </div>
    );
  }
}
