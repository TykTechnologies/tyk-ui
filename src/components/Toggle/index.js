import Toggle from './js/Toggle';
import ToggleItem from './js/ToggleItem';

Toggle.Item = ToggleItem;

import React, { Component, Fragment } from 'react';
import { Row } from '../Row';
import { Column } from '../Column';

export default class TestToggle extends Component {

  state = {
    active: false,
    activeMultiple: 'option2'
  };

  toggleOnChange(value) {
    this.setState({
      active: value
    });
  }

  toggleMultipleOnChange(value) {
    this.setState({
      activeMultiple: value
    });
  }

  render() {
    const { active, activeMultiple } = this.state;

    return (
      <Fragment>
        <Row>
          <Column size="md-12 lg-12">
            <Toggle
              value={ active }
              onChange={ this.toggleOnChange.bind(this) }
              theme="primary"
            >
              <Toggle.Item
                label="Option"
                name="option"
              />
            </Toggle>

            <Toggle
              value={ active }
              onChange={ this.toggleOnChange.bind(this) }
              theme="success"
            >
              <Toggle.Item
                label="Option"
                name="option"
              />
            </Toggle>

            <Toggle
              value={ active }
              onChange={ this.toggleOnChange.bind(this) }
              theme="danger"
            >
              <Toggle.Item
                label="Option"
                name="option"
              />
            </Toggle>

            <Toggle
              value={ active }
              onChange={ this.toggleOnChange.bind(this) }
              theme="warning"
            >
              <Toggle.Item
                label="Option"
                name="option"
              />
            </Toggle>
          </Column>
        </Row>
        <br /><br />
        <Row>
          <Column size="md-12 lg-12">
            <Toggle
              value={ active }
              onChange={ this.toggleOnChange.bind(this) }
              theme="primary-gradient"
            >
              <Toggle.Item
                label="Option"
                name="option"
              />
            </Toggle>

            <Toggle
              value={ active }
              onChange={ this.toggleOnChange.bind(this) }
              theme="success-gradient"
            >
              <Toggle.Item
                label="Option"
                name="option"
              />
            </Toggle>

            <Toggle
              value={ active }
              onChange={ this.toggleOnChange.bind(this) }
              theme="danger-gradient"
            >
              <Toggle.Item
                label="Option"
                name="option"
              />
            </Toggle>

            <Toggle
              value={ active }
              onChange={ this.toggleOnChange.bind(this) }
              theme="warning-gradient"
            >
              <Toggle.Item
                label="Option"
                name="option"
              />
            </Toggle>
          </Column>
        </Row>
        <br /><br />
        <Row>
          <Column size="md-12 lg-12">
            <Toggle
              value={ activeMultiple }
              onChange={ this.toggleMultipleOnChange.bind(this) }
              theme="primary"
              type="multiple"
            >
              <Toggle.Item
                label="short"
                name="option"
                value="option1"
              />
              <Toggle.Item
                label="medium name"
                name="option"
                value="option2"
              />
              <Toggle.Item
                label="very long long name"
                name="option"
                value="option3"
              />
            </Toggle><br /><br />
            <Toggle
              value={ activeMultiple }
              onChange={ this.toggleMultipleOnChange.bind(this) }
              theme="success"
              type="multiple"
            >
              <Toggle.Item
                label="short"
                name="option"
                value="option1"
              />
              <Toggle.Item
                label="medium name"
                name="option"
                value="option2"
              />
              <Toggle.Item
                label="very long long name"
                name="option"
                value="option3"
              />
            </Toggle><br /><br />
            <Toggle
              value={ activeMultiple }
              onChange={ this.toggleMultipleOnChange.bind(this) }
              theme="danger"
              type="multiple"
            >
              <Toggle.Item
                label="short"
                name="option"
                value="option1"
              />
              <Toggle.Item
                label="medium name"
                name="option"
                value="option2"
              />
              <Toggle.Item
                label="very long long name"
                name="option"
                value="option3"
              />
            </Toggle><br /><br />
            <Toggle
              value={ activeMultiple }
              onChange={ this.toggleMultipleOnChange.bind(this) }
              theme="warning"
              type="multiple"
            >
              <Toggle.Item
                label="short"
                name="option"
                value="option1"
              />
              <Toggle.Item
                label="medium name"
                name="option"
                value="option2"
              />
              <Toggle.Item
                label="very long long name"
                name="option"
                value="option3"
              />
            </Toggle><br /><br />
            <Toggle
              value={ activeMultiple }
              onChange={ this.toggleMultipleOnChange.bind(this) }
              theme="primary-gradient"
              type="multiple"
            >
              <Toggle.Item
                label="short"
                name="option"
                value="option1"
              />
              <Toggle.Item
                label="medium name"
                name="option"
                value="option2"
              />
              <Toggle.Item
                label="very long long name"
                name="option"
                value="option3"
              />
            </Toggle><br /><br />
            <Toggle
              value={ activeMultiple }
              onChange={ this.toggleMultipleOnChange.bind(this) }
              theme="success-gradient"
              type="multiple"
            >
              <Toggle.Item
                label="short"
                name="option"
                value="option1"
              />
              <Toggle.Item
                label="medium name"
                name="option"
                value="option2"
              />
              <Toggle.Item
                label="very long long name"
                name="option"
                value="option3"
              />
            </Toggle><br /><br />
            <Toggle
              value={ activeMultiple }
              onChange={ this.toggleMultipleOnChange.bind(this) }
              theme="danger-gradient"
              type="multiple"
            >
              <Toggle.Item
                label="short"
                name="option"
                value="option1"
              />
              <Toggle.Item
                label="medium name"
                name="option"
                value="option2"
              />
              <Toggle.Item
                label="very long long name"
                name="option"
                value="option3"
              />
            </Toggle><br /><br />
            <Toggle
              value={ activeMultiple }
              onChange={ this.toggleMultipleOnChange.bind(this) }
              theme="warning-gradient"
              type="multiple"
            >
              <Toggle.Item
                label="short"
                name="option"
                value="option1"
              />
              <Toggle.Item
                label="medium name"
                name="option"
                value="option2"
              />
              <Toggle.Item
                label="very long long name"
                name="option"
                value="option3"
              />
            </Toggle>
          </Column>
        </Row>
      </Fragment>
    );
  }
}

export { Toggle };
export { default as FieldToggle } from './js/FieldToggle';
