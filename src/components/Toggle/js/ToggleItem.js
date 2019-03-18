import React, { Component, createRef } from 'react';
import PropTypes from 'prop-types';

export default class ToggleItem extends Component {
  static propTypes = {
    context: PropTypes.instanceOf(Object),
    label: PropTypes.string,
    name: PropTypes.string,
    value: PropTypes.string,
  };

  static getNotchCssClasses(context) {
    const cssClasses = ['tyk-toggle__item-notch', `tyk-toggle__item-notch--${context.type}`];

    return cssClasses.join(' ');
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

  onChange() {
    const { context, value } = this.props;

    if (context.disabled) {
      return;
    }

    context.onItemSelected(context.type === 'single' ? !context.value : value, this.itemRef);

    if (context.type === 'multiple') {
      context.saveSelectedRef(this.itemRef);
    }
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
            defaultChecked={context.value === value}
            onChange={this.onChange.bind(this)}
            value={value}
          />
          <span>{ label }</span>
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
