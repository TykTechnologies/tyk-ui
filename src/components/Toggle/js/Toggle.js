import React, { Component, createRef } from 'react';
import PropTypes from 'prop-types';

import ToggleContext from './ToggleContext';

class Toggle extends Component {
  static propTypes = {
    children: PropTypes.oneOfType([
      PropTypes.arrayOf(PropTypes.node),
      PropTypes.node,
      PropTypes.element,
      PropTypes.string,
    ]),
    className: PropTypes.string,
    disabled: PropTypes.bool,
    onChange: PropTypes.func,
    label: PropTypes.string,
    labelwidth: PropTypes.string,
    theme: PropTypes.string,
    type: PropTypes.string, // single || multiple
    size: PropTypes.string,
    separated: PropTypes.bool,
    direction: PropTypes.string,
    value: PropTypes.oneOfType([
      PropTypes.bool,
      PropTypes.string,
    ]),
  };

  static defaultProps = {
    separated: false,
    theme: 'primary',
    type: 'single',
    direction: 'row',
  };

  state = {
    selectedRef: null,
  }

  constructor(props) {
    super(props);

    this.notchRef = createRef();
    this.toggleRef = createRef();
  }

  onItemSelected(value, event) {
    const { onChange } = this.props;

    if (onChange) {
      onChange(value, event);
    }
  }

  getCssClasses() {
    const {
      className,
      disabled,
      size,
      theme,
      direction,
    } = this.props;

    let cssClasses = [
      'tyk-toggle',
      `tyk-toggle--disabled-${disabled}`,
      `tyk-toggle--${size || 'md'}`,
      `tyk-toggle--${theme}`,
      `tyk-toggle--${direction}`,
    ];

    if (className) {
      cssClasses = cssClasses.concat(className.split(' '));
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

  saveSelectedRef(ref) {
    this.setState({
      selectedRef: ref,
    });
  }

  positionNotch() {
    const { separated } = this.props;
    const { selectedRef } = this.state;

    if (!selectedRef || separated) {
      return {};
    }

    const selectedWidth = selectedRef.current.offsetWidth;
    const selectedOffset = selectedRef.current.getBoundingClientRect().left;
    const toggleOffset = this.toggleRef.current.getBoundingClientRect().left;
    const left = selectedOffset - toggleOffset;

    return {
      left: `${left}px`,
      width: `${selectedWidth}px`,
    };
  }

  render() {
    const {
      children,
      disabled,
      label,
      type,
      separated,
      value,
    } = this.props;

    return (
      <div className={this.getCssClasses()} ref={this.toggleRef}>
        <ToggleContext.Provider
          value={{
            disabled,
            onItemSelected: this.onItemSelected.bind(this),
            saveSelectedRef: this.saveSelectedRef.bind(this),
            separated,
            type,
            value,
          }}
        >
          {
            label
              ? <label className="tyk-toggle__label" style={this.getLabelStyles()}>{label}</label>
              : null
          }
          <ul className={`tyk-toggle__list tyk-toggle__list--${type}  tyk-toggle__list--${separated ? 'separated' : 'not-separated'}`}>
            { children }
            {
              type === 'multiple' && !separated
                ? <li className="tyk-toggle__notch" ref={this.notchRef} style={this.positionNotch()} />
                : null
            }
          </ul>
        </ToggleContext.Provider>
      </div>
    );
  }
}

export default Toggle;
