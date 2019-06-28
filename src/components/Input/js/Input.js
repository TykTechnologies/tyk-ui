import React, { Component, Fragment } from 'react';
import PropTypes from 'prop-types';

export default class Input extends Component {
  static propTypes = {
    disabled: PropTypes.bool,
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
    label: PropTypes.string,
    labelwidth: PropTypes.string,
    name: PropTypes.string,
    note: PropTypes.string,
    onChange: PropTypes.func,
    placeholder: PropTypes.string,
    theme: PropTypes.string,
    value: PropTypes.string,
  }

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
    };

    this.handleOnChange = this.handleOnChange.bind(this);
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
      isfield, onChange, value, ...rest
    } = this.props;
    const { stateValue } = this.state;
    return (
      <input
        autoComplete="off"
        className="tyk-form-control"
        {...rest}
        onChange={this.handleOnChange}
        value={(isfield) ? value : stateValue}
      />
    );
  }

  reset() {
    const { initValue } = this.state;

    this.setState({
      stateValue: initValue,
    });
  }

  handleOnChange(e) {
    const { onChange, isfield } = this.props;
    const inputValue = e.target.value;

    if (!isfield) {
      this.setState({
        stateValue: inputValue,
      }, () => {
        onChange(inputValue);
      });
    } else {
      onChange(inputValue);
    }
  }

  render() {
    const {
      label,
      id,
      inputgroupaddonleft,
      inputgroupaddonright,
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
        </div>
      </Fragment>
    );
  }
}
