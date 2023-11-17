import React from 'react';
import CodeEditor from './index';

function Component(props) {
  return (
    <CodeEditor
      label="Standard code editor"
      height="200px"
      name="defaultPanelCode"
      mode="json"
      width="100%"
      showPrintMargin
      showGutter
      highlightActiveLine
      editorProps={{ $blockScrolling: Infinity }}
      setOptions={{
        showLineNumbers: true,
        tabSize: 2,
      }}
      disableValidation
      value=""
      {...props}
    />
  );
}

const classes = {
  error: 'has-error',
  labelWidth: 'tyk-form-group--label-has-width',
};

const selectors = {
  component: '.tyk-form-group',
  editorContent: '.ace_content',
  error: '.tyk-form-control__error-message',
  note: '.tyk-form-control__help-block',
};

describe('CodeEditor', () => {
  it('renders the component and cand write text', () => {
    const text = 'foo';
    cy.mount(<Component />)
      .get(selectors.component)
      .should('exist')
      .get(selectors.editorContent)
      .click()
      .type(text)
      .should('have.text', text);
  });

  it('you cannot type if disabled or readOnly', () => {
    cy.mount(<Component disabled />)
      .get(selectors.editorContent)
      .click()
      .type('foo')
      .should('have.text', '');

    cy.mount(<Component disabled />)
      .get(selectors.editorContent)
      .click()
      .type('foo')
      .should('have.text', '');
  });

  it('can render with error', () => {
    const error = 'my error';
    cy.mount(<Component error={error} />)
      .get(selectors.component)
      .should('have.class', classes.error)
      .get(selectors.error)
      .should('have.text', error);
  });

  it('can set a custom label', () => {
    const label = 'my label';
    cy.mount(<Component label={label} />)
      .get(selectors.component)
      .find('label')
      .should('have.text', label);
  });

  it('can customize the label width', () => {
    const labelWidth = '100px';
    cy.mount(
      <>
        <style>
          {'.tyk-form-group { display: flex; }'}
        </style>
        <Component label="my label" labelwidth={labelWidth} />
      </>,
    )
      .get(selectors.component)
      .should('have.class', classes.labelWidth)
      .find('label')
      .should('have.css', 'width', labelWidth);
  });

  it('can display a note', () => {
    const note = 'please read this';
    cy.mount(<Component label="my label" note={note} />)
      .get(selectors.note)
      .should('exist')
      .and('have.text', note);
  });

  it('calls the onBlur callback when losing the focus', () => {
    const onBlur = cy.stub().as('onBlur');
    cy.mount(<Component onBlur={onBlur} />)
      .get(selectors.editorContent)
      .click()
      .type('something')
      .get('.ace_text-input')
      .blur()
      .get('@onBlur')
      .should('be.called');
  });

  it('calls the onChange callback with the current value when losing the focus', () => {
    const onChange = cy.stub().as('onChange');
    const text = 'something';
    cy.mount(<Component onChange={onChange} />)
      .get(selectors.editorContent)
      .click()
      .type(text)
      .get('.ace_text-input')
      .blur()
      .get('@onChange')
      .should('be.calledWith', text);
  });

  it('can have themes', () => {
    const theme = 'awesome';
    cy.mount(<Component theme={theme} />)
      .get(selectors.component)
      .and('have.class', `tyk-form-group--${theme}`);
  });

  it('can have an initial value', () => {
    const value = 'some code';
    cy.mount(<Component value={value} />)
      .get(selectors.editorContent)
      .should('have.text', value);
  });

  it('can have a custom css class', () => {
    const wrapperClassName = 'editor-1';
    cy.mount(<Component wrapperClassName={wrapperClassName} />)
      .get(selectors.component)
      .should('have.class', wrapperClassName);
  });
});
