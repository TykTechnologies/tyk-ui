import React, { Component } from 'react';
import PropTypes from 'prop-types';


/**
 * - Checkboxes are used when a user needs to select one or more values from a series of options.
 * - They can be also be used as a binary toggle but consider radio instead.
 * - Can be used with Formik respectively (FormikCheckbox)
 */
export default class Checkbox extends Component {
  static propTypes = {
    /** Disable a checkbox */
    disabled: PropTypes.bool,
    /** Readonly prop behaves the same as disable on checkboxes */
    readOnly: PropTypes.bool,
    /** Align checkbox with in same line with other elements */
    inline: PropTypes.bool,
    /** Set a theme for checkbox */
    theme: PropTypes.string,
    /** Set an error state for checkbox if boolean will show just icon without message */
    error: PropTypes.oneOfType([
      PropTypes.string,
      PropTypes.bool,
    ]),
    /** Adds additional information under the checkbox element */
    note: PropTypes.string,
    input: PropTypes.instanceOf(Object),
    /** Adds a label to checkbox */
    label: PropTypes.oneOfType([
      PropTypes.arrayOf(PropTypes.node),
      PropTypes.node,
      PropTypes.element,
      PropTypes.func,
      PropTypes.string,
    ]),
    /** Set a name for checkbox */
    name: PropTypes.string,
    /** Set initial value for checkbox */
    value: PropTypes.string,
    /** Make checkbox checked by default */
    checked: PropTypes.string,
    /** Callback function executed on change of checkbox */
    onChange: PropTypes.func,
    /** CSS classes added to the wrapper of the component */
    wrapperClassName: PropTypes.string,
  };

  getCssClasses() {
    const {
      inline, disabled, readOnly, theme = '', wrapperClassName = '',
    } = this.props;

    const cssClasses = [wrapperClassName];

    cssClasses.push('tyk-checkbox');

    if (inline) {
      cssClasses.push('tyk-checkbox--inline');
    }

    if (theme.trim()) {
      cssClasses.push(...theme.split(' ').map(t => `tyk-checkbox--theme-${t}`));
    }

    if (disabled || readOnly) {
      cssClasses.push('tyk-checkbox--is-disabled');
    }

    return cssClasses.join(' ');
  }

  displayError() {
    const { error } = this.props;
    if (!error) return null;

    return (
      <p className="tyk-form-control__error-message">
        {error}
      </p>
    );
  }

  displayNote() {
    const { note } = this.props;
    if (!note) return null;

    return (
      <p className="tyk-form-control__help-block">
        {note}
      </p>
    );
  }

  render() {
    const {
      input, value, label, ...rest
    } = this.props;
    return (
      <div
        className={this.getCssClasses()}
      >
        <div className="tyk-form-control__wrapper">
          <label>
            <input
              checked={input ? input.value : value}
              {...input}
              {...rest}
              type="checkbox"
            />
            {label}
          </label>
          {this.displayNote()}
          {this.displayError()}
        </div>
      </div>
    );
  }
}
