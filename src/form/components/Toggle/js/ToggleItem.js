import React, { Component, createRef } from 'react';
import PropTypes from 'prop-types';

class ToggleItem extends Component {
  static getNotchCssClasses(context) {
    return ['tyk-toggle__item-notch', `tyk-toggle__item-notch--${context.type}`].join(' ');
  }

  constructor(props) {
    super(props);

    this.itemRef = createRef();
  }

  componentDidMount() {
    const { context, value } = this.props;

    if (context.value === value) {
      context.saveSelectedRef(this.itemRef);
    }
  }

  componentDidUpdate(prevProps) {
    const { context, value } = this.props;

    if (prevProps.context.value !== context.value && context.value === value) {
      context.saveSelectedRef(this.itemRef);
    }
  }

  onChange(event) {
    const { context, value } = this.props;
    const { disabled, readOnly } = context;

    if (disabled || readOnly) {
      return;
    }

    context.onItemSelected(context.type === 'single' ? !context.value : value, event);
  }

  render() {
    const {
      context, label, name, value,
    } = this.props;
    return (
      <li className={`tyk-toggle__item ${(context.value && (context.type === 'single' || context.value === value)) ? 'tyk-toggle__item--active' : ''}`} ref={this.itemRef}>
        <label>
          <input
            type={context.type === 'single' ? 'checkbox' : 'radio'}
            name={name}
            checked={context.value === value}
            onChange={this.onChange.bind(this)}
            value={value}
          />
          {
            label
              ? <span>{ label }</span>
              : <span className="empty-toggle"> </span>
          }
          {
            context.type === 'single'
              ? <span className={ToggleItem.getNotchCssClasses(context)} />
              : null
          }
        </label>
      </li>
    );
  }
}

ToggleItem.propTypes = {
  context: PropTypes.instanceOf(Object),
  label: PropTypes.oneOfType([
    PropTypes.arrayOf(PropTypes.node),
    PropTypes.node,
    PropTypes.element,
    PropTypes.func,
    PropTypes.string,
  ]),
  name: PropTypes.string,
  value: PropTypes.string,
};

export default ToggleItem;
