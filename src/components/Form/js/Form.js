import React, { PureComponent } from 'react';
import PropTypes from 'prop-types';
import { Form } from 'redux-form/immutable';

export default class TykForm extends PureComponent {
  static propTypes = {
    children: PropTypes.oneOfType([
      PropTypes.element,
      PropTypes.node
    ]),
    onSubmit: PropTypes.func,
    name: PropTypes.string,
    type: PropTypes.string
  }

  getCssClasses() {
    let cssClasses = [];

    if(this.props.type) {
      cssClasses.push('form-' + this.props.type);
    }

    return cssClasses.join(' ');
  }

  render() {
    const { onSubmit } = this.props;

    return (
      <Form
        className={ this.getCssClasses() }
        noValidate
        onSubmit={ onSubmit }
      >
        { this.props.children }
      </Form>
    );
  }
}
