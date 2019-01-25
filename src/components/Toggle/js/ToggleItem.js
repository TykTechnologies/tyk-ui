import React, { Component, createRef } from 'react';
import PropTypes from 'prop-types';

import ToggleContext from './ToggleContext';

class ToggleItem extends Component {
  static propTypes = {
    name: PropTypes.string
  }

  state = {
    active: this.props.active
  };

  constructor(props) {
    super(props);

    this.itemRef = createRef();
  }

  componentDidMount() {
    const { context, value } = this.props;

    if(context.value === value) {
      context.saveSelectedRef(this.itemRef);
    }
  }

  getNotchCssClasses(context) {
    let cssClasses = ['tyk-toggle__item-notch', `tyk-toggle__item-notch--${context.type}`];

    return cssClasses.join(' ');
  }

  onChange() {
    const { context, name, value } = this.props;

    if(context.disabled) {
      return;
    }

    context.onItemSelected(context.type === 'single' ? !context.value : value, this.itemRef);

    if(context.type === 'multiple') {
      context.saveSelectedRef(this.itemRef);
    }
  }

  render() {
    const { context, label, name, value, type } = this.props;

    return (
      <li className={ "tyk-toggle__item " + ((context.value && context.type === 'single') ? 'tyk-toggle__item--active' : '') } ref={ this.itemRef }>
        <label>
          <input
            type={ context.type === 'single' ? 'checkbox' : 'radio'}
            name={ name }
            defaultChecked={ context.value === value }
            onChange={ this.onChange.bind(this) }
            value={ value }
          />
          <span>{ label }</span>
          {
            context.type === 'single'
              ? <span className={ this.getNotchCssClasses(context) }></span>
              : null
          }
        </label>
      </li>
    );
  }
}

export default React.forwardRef((props, ref) => (
  <ToggleContext.Consumer>
    {context => <ToggleItem {...props} context={context} ref={ref}> { props.children } </ToggleItem>}
  </ToggleContext.Consumer>
));
