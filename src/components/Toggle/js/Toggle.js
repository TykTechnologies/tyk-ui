import React, { Component, createRef } from 'react';
import PropTypes from 'prop-types';

import ToggleContext from './ToggleContext';

class Toggle extends Component {
  static propTypes = {
    disabled: PropTypes.bool,
    theme: PropTypes.string,
    type: PropTypes.string, // single || multiple
    size: PropTypes.string,
    value: PropTypes.oneOfType([
      PropTypes.bool,
      PropTypes.string
    ])
  };

  static defaultProps = {
    theme: 'primary',
    type: 'single'
  };

  state = {
    selectedRef: null
  }

  constructor(props) {
    super(props);

    this.notchRef = createRef();
    this.toggleRef = createRef();
  }

  onItemSelected(value, ref) {
    const { onChange } = this.props;

    if(onChange) {
      onChange(value);
    }
  }

  saveSelectedRef(ref) {
    this.setState({
      selectedRef: ref
    });
  }

  positionNotch() {
    const { selectedRef } = this.state;

    if(!selectedRef) {
      return {};
    }

    let selectedWidth = selectedRef.current.offsetWidth;
    let selectedOffset = selectedRef.current.getBoundingClientRect().left;
    let toggleOffset = this.toggleRef.current.getBoundingClientRect().left;
    let left = selectedOffset - toggleOffset;

    return {
      left: left + 'px',
      width: selectedWidth + 'px'
    };
  }

  render() {
    const {
      children,
      disabled,
      size,
      theme,
      type,
      value
    } = this.props;

    const { notchStyle } = this.state;

    return (
      <div className={`tyk-toggle tyk-toggle--disabled-${ disabled } tyk-toggle--${ size || 'md' } tyk-toggle--${ theme }`} ref={ this.toggleRef }>
        <ToggleContext.Provider
          value={{
            disabled,
            onItemSelected: this.onItemSelected.bind(this),
            saveSelectedRef: this.saveSelectedRef.bind(this),
            type,
            value
          }}
        >
          <ul className={ `tyk-toggle__list tyk-toggle__list--${ type }` }>
            { children }
            {
              type === 'multiple'
                ? <li className="tyk-toggle__notch" ref={ this.notchRef } style={ this.positionNotch() }></li>
                : null
            }
          </ul>
        </ToggleContext.Provider>
      </div>
    );
  }
}

export default Toggle;
