```js
import React, { Component, Fragment } from 'react';

import ToggleItemWrapper from './js/ToggleItemWrapper';

import Row from '../../../layout/Row';
import Column from '../../../layout/Column';

class TestToggle extends Component {

  constructor(props) {
    super(props);
    this.state = {
    active: false,
    activeMultiple: 'option2',
  };
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
              label="Disabled toggle"
              theme="primary"
              size="md"
              disabled
            >
              <Toggle.Item
                name="option"
              />
            </Toggle>
            <Toggle
              value={active}
              onChange={this.toggleOnChange}
              label="Is enabled?"
              theme="primary"
              size="md"
              error="My error"
              readOnly
            >
              <Toggle.Item
                name="option"
              />
            </Toggle>
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
              size="lg"
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
              theme="primary"
            >
              <Toggle.Item
                label="Option"
                name="option"
              />
            </Toggle>

            <Toggle
              value={active}
              onChange={this.toggleOnChange}
              theme="success"
            >
              <Toggle.Item
                label="Option"
                name="option"
              />
            </Toggle>

            <Toggle
              value={active}
              onChange={this.toggleOnChange}
              theme="danger"
            >
              <Toggle.Item
                label="Option"
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
              value={activeMultiple}
              onChange={this.toggleMultipleOnChange}
              theme="primary"
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
              theme="primary"
              type="multiple"
            >
              <Toggle.Item
                label="short one"
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
            </Toggle>
            <br />
            <br />
            <Toggle
              value={activeMultiple}
              onChange={this.toggleMultipleOnChange}
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
            </Toggle>
            <br />
            <br />
            <Toggle
              value={activeMultiple}
              onChange={this.toggleMultipleOnChange}
              theme="danger"
              type="multiple"
              size="sm"
              onDark
            >
              <Toggle.Item
                label="short"
                name="option"
                value="FE team 1"
              />
              <Toggle.Item
                label="medium name"
                name="FE team "
                value="FE team 2"
              />
              <Toggle.Item
                label="very long long name"
                name="FE team "
                value="FE team 3s"
              />
            </Toggle>
            <br />
            <br />
            <Toggle
              value={activeMultiple}
              onChange={this.toggleMultipleOnChange}
              theme="warning"
              type="multiple"
              size="lg"
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
          </Column>
          <Column size="md-12">
            <Toggle
                value={activeMultiple}
                label="Disabled toggle"
                disabled
                onChange={this.toggleMultipleOnChange}
                theme="warning"
                type="multiple"
                size="lg"
                onDark
              >
                <Toggle.Item
                  label="short disabled"
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
          <Column size="md-12">
            <Toggle
                value={activeMultiple}
                label="Read Only toggle"
                readOnly
                onChange={this.toggleMultipleOnChange}
                theme="warning"
                type="multiple"
                size="lg"
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
          </Column>
        </Row>
      </Fragment>
    );
  }
}
<TestToggle />
```
