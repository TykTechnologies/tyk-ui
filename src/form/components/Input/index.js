import React, { Component } from 'react';
import PropTypes from 'prop-types';

import Icon from '../../../components/Icon';
import MaskSecret from '../../../components/MaskSecret';
import './Input.css';

class Input extends Component {
  static getAddon(content) {
    return (
      <div className="tyk-input-group__addon">
        { content }
      </div>
    );
  }

  constructor(props) {
    super(props);
    const {
      value,
    } = this.props;

    this.state = {
      initValue: value,
      stateValue: value,
      showPassword: false,
    };

    this.handleOnChange = this.handleOnChange.bind(this);
    this.togglePasswordVisibility = this.togglePasswordVisibility.bind(this);
  }

  componentDidUpdate(prevProps) {
    const {
      isfield,
      value,
      onChange,
    } = this.props;

    if (!isfield && prevProps.value !== value) {
      this.setState({
        stateValue: value,
      }, () => {
        if (onChange) {
          onChange(value);
        }
      });
    }
  }

  handleOnChange(e) {
    const { onChange, isfield } = this.props;
    const inputValue = e.target.value;

    if (!isfield) {
      this.setState({
        stateValue: inputValue,
      }, () => {
        if (onChange) {
          onChange(inputValue);
        }
      });
    } else {
      onChange(inputValue);
    }
  }

  togglePasswordVisibility() {
    this.setState(prevState => ({
      showPassword: !prevState.showPassword,
    }));
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

  getCssClasses() {
    const {
      error,
      theme,
      labelwidth,
      inputgroupaddonleft,
      inputgroupaddonright,
    } = this.props;
    const cssClasses = ['tyk-form-group'];
    const themes = theme ? theme.split(' ') : [];

    if (themes.length) {
      themes.forEach((iTheme) => {
        cssClasses.push(`tyk-form-group--${iTheme}`);
      });
    }

    if (inputgroupaddonleft) {
      cssClasses.push('tyk-form-group--addon-left');
    }

    if (inputgroupaddonright) {
      cssClasses.push('tyk-form-group--addon-right');
    }

    if (labelwidth) {
      cssClasses.push('tyk-form-group--label-has-width');
    }

    if (error) {
      cssClasses.push('has-error');
    }

    return cssClasses.join(' ');
  }

  getInputGroupAddon() {
    const {
      inputgroupaddonleft,
      inputgroupaddonright,
    } = this.props;

    return (
      <div className="tyk-input-group">
        {
          inputgroupaddonleft
            ? Input.getAddon(inputgroupaddonleft)
            : null
        }
        { this.getInputComponent() }
        {
          inputgroupaddonright
            ? Input.getAddon(inputgroupaddonright)
            : null
        }
      </div>
    );
  }

  getInputComponent() {
    const {
      isfield, value, type, ...rest
    } = this.props;
    const { stateValue, showPassword } = this.state;

    const resolvedType = (type === 'password' && showPassword) ? 'text' : type;

    const inputEl = (
      <input
        autoComplete="off"
        className="tyk-form-control"
        {...rest}
        type={resolvedType}
        onChange={this.handleOnChange}
        value={(isfield) ? value : stateValue}
      />
    );

    if (type === 'password') {
      return (
        <div className="tyk-form-control__password-wrapper">
          { inputEl }
          <button
            type="button"
            className="tyk-form-control__password-toggle"
            onClick={this.togglePasswordVisibility}
            aria-label={showPassword ? 'Hide password' : 'Show password'}
            disabled={rest.disabled}
          >
            <Icon type={showPassword ? 'eye-slash' : 'eye'} />
          </button>
        </div>
      );
    }

    return inputEl;
  }

  reset() {
    const { initValue } = this.state;

    this.setState({
      stateValue: initValue,
    });
  }

  render() {
    const {
      label,
      id,
      inputgroupaddonleft,
      inputgroupaddonright,
      note,
      readOnly,
      type,
      value,
    } = this.props;

    return (
      <div className={this.getCssClasses()}>
        {
          label
            ? <label htmlFor={id} style={this.getLabelStyles()}>{ label }</label>
            : null
        }
        {!readOnly && (
          <div
            className="tyk-form-control__wrapper"
            style={this.getNonLabelWidth()}
          >
            {
              inputgroupaddonleft || inputgroupaddonright
                ? this.getInputGroupAddon()
                : this.getInputComponent()
            }
            {
              note
                ? <p className="tyk-form-control__help-block">{ note }</p>
                : null
            }
            { this.getInputError() }
          </div>
        )}
        {readOnly && (
          type === 'password' ? (
            <div className="tyk-form-control--readonly">
              <MaskSecret value={value} />
            </div>
          ) : (
            <div className="tyk-form-control--readonly">{value || '-'}</div>
          )
        )}
      </div>
    );
  }
}

Input.propTypes = {
  disabled: PropTypes.bool,
  readOnly: PropTypes.bool,
  id: PropTypes.string,
  isfield: PropTypes.bool,
  error: PropTypes.oneOfType([
    PropTypes.string,
    PropTypes.bool,
  ]),
  inputgroupaddonleft: PropTypes.oneOfType([
    PropTypes.element,
    PropTypes.node,
    PropTypes.string,
  ]),
  inputgroupaddonright: PropTypes.oneOfType([
    PropTypes.element,
    PropTypes.node,
    PropTypes.string,
  ]),
  label: PropTypes.oneOfType([
    PropTypes.string,
    PropTypes.element,
    PropTypes.node,
  ]),
  labelwidth: PropTypes.string,
  name: PropTypes.string,
  note: PropTypes.string,
  onChange: PropTypes.func,
  placeholder: PropTypes.string,
  theme: PropTypes.string,
  type: PropTypes.string,
  value: PropTypes.oneOfType([
    PropTypes.number,
    PropTypes.string,
  ]),
};

export default Input;
