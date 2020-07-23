import React, { Component, Fragment } from 'react';

import Toggle from './js/Toggle';
import ToggleItemWrapper from './js/ToggleItemWrapper';

import Row from '../Row';
import Column from '../Column';

Toggle.Item = ToggleItemWrapper;

export default class TestToggle extends Component {
  state = {
    active: false,
    activeMultiple: 'option2',
  };

  constructor(props) {
    super(props);
    this.toggleMultipleOnChange = this.toggleMultipleOnChange.bind(this);
    this.toggleOnChange = this.toggleOnChange.bind(this);
  }

  toggleOnChange(value) {
    this.setState({
      active: value,
    });
  }

  toggleMultipleOnChange(value) {
    this.setState({
      activeMultiple: value,
    });
  }

  render() {
    const { active, activeMultiple } = this.state;

    return (
      <Fragment>
        <Row>
          <Column size="md-12 lg-12">
            <Toggle
              value={active}
              onChange={this.toggleOnChange}
              label="Is enabled?"
              theme="primary"
              size="md"
              error="My error"
              onDark
            >
              <Toggle.Item
                name="option"
              />
            </Toggle>

            <Toggle
              value={active}
              onChange={this.toggleOnChange}
              label="Is enabled?"
              labelwidth="60%"
              theme="success inline-label block"
            >
              <Toggle.Item
                name="option"
              />
            </Toggle>

            <Toggle
              className="laurentiu-custom-class"
              value={active}
              onChange={this.toggleOnChange}
              theme="danger"
              size="sm"
            >
              <Toggle.Item
                name="option"
              />
            </Toggle>

            <Toggle
              value={active}
              onChange={this.toggleOnChange}
              theme="warning"
            >
              <Toggle.Item
                label="Option"
                name="option"
              />
            </Toggle>
          </Column>
        </Row>

        <br />
        <br />
        <Row>
          <Column size="md-12 lg-12">
            <Toggle
              value={active}
              onChange={this.toggleOnChange}
              theme="primary-gradient"
            >
              <Toggle.Item
                label="Option"
                name="option"
              />
            </Toggle>

            <Toggle
              value={active}
              onChange={this.toggleOnChange}
              theme="success-gradient"
            >
              <Toggle.Item
                label="Option"
                name="option"
              />
            </Toggle>

            <Toggle
              value={active}
              onChange={this.toggleOnChange}
              theme="danger-gradient"
            >
              <Toggle.Item
                label="Option"
                name="option"
              />
            </Toggle>

            <Toggle
              value={active}
              onChange={this.toggleOnChange}
              theme="warning-gradient"
            >
              <Toggle.Item
                label="Option"
                name="option"
              />
            </Toggle>
          </Column>
        </Row>

        <br />
        <br />
        <Row>
          <Column size="md-12 lg-12">
            <Toggle
              value={activeMultiple}
              onChange={this.toggleMultipleOnChange}
              theme="success-gradient"
              type="multiple"
              separated
              onDark
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
            <br />
            <br />
            <Toggle
              value={activeMultiple}
              onChange={this.toggleMultipleOnChange}
              theme="primary"
              direction="column"
              separated
              type="multiple"
            >
              <Toggle.Item
                label="shortssss"
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
            <br />
            <br />
            <Toggle
              value={activeMultiple}
              onChange={this.toggleMultipleOnChange}
              theme="default"
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
            <br />
            <br />
            <Toggle
              value={activeMultiple}
              onChange={this.toggleMultipleOnChange}
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
            </Toggle>
            <br />
            <br />
            <Toggle
              value={activeMultiple}
              onChange={this.toggleMultipleOnChange}
              theme="warning"
              type="multiple"
              label="this is a toggle demo"
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
            <br />
            <br />
            <Toggle
              value={activeMultiple}
              onChange={this.toggleMultipleOnChange}
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
            </Toggle>
            <br />
            <br />
            <Toggle
              value={activeMultiple}
              onChange={this.toggleMultipleOnChange}
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
            </Toggle>
            <br />
            <br />
            <Toggle
              value={activeMultiple}
              onChange={this.toggleMultipleOnChange}
              theme="danger-gradient"
              type="multiple"
              size="sm"
              onDark
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
            <br />
            <br />
            <Toggle
              value={activeMultiple}
              onChange={this.toggleMultipleOnChange}
              theme="warning-gradient"
              type="multiple"
              size="lg"
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
export { default as FormikToggle } from './js/FormikToggle';
