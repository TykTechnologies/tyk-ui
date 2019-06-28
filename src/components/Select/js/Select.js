import React, { Component, Fragment } from 'react';
import PropTypes from 'prop-types';

export default class Select extends Component {
  static propTypes = {
    disabled: PropTypes.bool,
    id: PropTypes.string,
    isfield: PropTypes.bool,
    error: PropTypes.oneOfType([
      PropTypes.string,
      PropTypes.bool,
    ]),
    options: PropTypes.instanceOf(Array),
    label: PropTypes.string,
    labelwidth: PropTypes.string,
    name: PropTypes.string,
    note: PropTypes.string,
    onBlur: PropTypes.func,
    onChange: PropTypes.func,
    placeholder: PropTypes.string,
    theme: PropTypes.string,
    value: PropTypes.oneOfType([
      PropTypes.string,
      PropTypes.object,
    ]),
  }

  constructor(props) {
    super(props);
    const {
      value,
    } = this.props;

    this.state = {
      initValue: value,
      stateValue: value,
    };

    this.handleOnChange = this.handleOnChange.bind(this);
    this.handleOnBlur = this.handleOnBlur.bind(this);
  }

  getSelectComponent() {
    const {
      isfield, options, onChange, onBlur, value, ...rest
    } = this.props;
    const {
      stateValue,
    } = this.state;

    let selectValue = '';

    if (isfield && value) {
      selectValue = value;
    } else if (stateValue) {
      selectValue = stateValue;
    }

    return (
      <select
        className="tyk-form-control tyk-select"
        {...rest}
        onChange={this.handleOnChange}
        onBlur={this.handleOnBlur}
        value={selectValue ? selectValue.id : ''}
      >
        {
          options.map(option => <option key={option.id} value={option.id}>{ option.name }</option>)
        }
      </select>
    );
  }

  getSelectError() {
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
    const { error, labelwidth, theme } = this.props;
    const cssClasses = ['tyk-form-group'];
    const themes = theme ? theme.split(' ') : [];

    if (themes.length) {
      themes.forEach((iTheme) => {
        cssClasses.push(`tyk-form-group--${iTheme}`);
      });
    }

    if (labelwidth) {
      cssClasses.push('tyk-form-group--label-has-width');
    }

    if (error) {
      cssClasses.push('has-error');
    }

    return cssClasses.join(' ');
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

  handleOnBlur() {
    const { value, onBlur } = this.props;

    if (onBlur) {
      onBlur(value);
    }
  }

  handleOnChange(e) {
    const {
      onChange,
      isfield,
      options,
    } = this.props;
    let selectedValue = null;

    selectedValue = options.filter(option => option.id === e.target.value);
    [selectedValue] = selectedValue;

    if (!isfield) {
      this.setState({
        stateValue: selectedValue,
      }, () => {
        onChange(selectedValue.id ? selectedValue : null);
      });
    } else {
      onChange(selectedValue.id ? selectedValue : null);
    }
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
      note,
    } = this.props;

    return (
      <Fragment>
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
            {
              this.getSelectComponent()
            }
            {
              note
                ? <p className="tyk-form-control__help-block">{ note }</p>
                : null
            }
            { this.getSelectError() }
          </div>
        </div>
      </Fragment>
    );
  }
}
