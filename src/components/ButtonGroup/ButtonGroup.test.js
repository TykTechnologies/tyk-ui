import React from 'react';
import ButtonGroup from './index';
import Button from '../Button';

describe('ButtonGroup', () => {
  const wrapperSelector = '.tyk-button-group__wrapper';

  it('renders the component with proper classes', () => {
    cy
      .mount(
        <ButtonGroup className="foo bar">
          <Button theme="secondary">button 1</Button>
          <Button theme="secondary">button 2</Button>
        </ButtonGroup>,
      )
      .get(wrapperSelector)
      .should('have.class', 'foo')
      .and('have.class', 'bar');
  });

  it('can have a label', () => {
    const labelText = 'My Label';

    cy
      .mount(
        <ButtonGroup className="foo bar" label={labelText}>
          <Button theme="secondary">button 1</Button>
          <Button theme="secondary">button 2</Button>
        </ButtonGroup>,
      )
      .get(wrapperSelector)
      .find('label')
      .should('exist')
      .and('have.text', labelText);
  });
});
