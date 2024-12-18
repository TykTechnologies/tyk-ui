import React from 'react';
import Card from './index';

describe('Card', () => {
  const cssClasses = {
    card: 'tyk-card',
    header: 'tyk-card__header',
    body: 'tyk-card__body',
    footer: 'tyk-card__footer',
    title: 'tyk-card__title',
    titleGroup: 'tyk-card__title-group',
    subtitle: 'tyk-card__sub-title',
    icon: 'tyk-card__title-icon',
    summary: 'tyk-card__summary',
  };

  const selectors = {
    card: `.${cssClasses.card}`,
    header: `.${cssClasses.header}`,
    body: `.${cssClasses.body}`,
    footer: `.${cssClasses.footer}`,
    title: `.${cssClasses.title}`,
    titleGroup: `.${cssClasses.titleGroup}`,
    subtitle: `.${cssClasses.subtitle}`,
    icon: `.${cssClasses.icon}`,
    summary: `.${cssClasses.summary}`,
  };

  it('should render the card', () => {
    cy.mount(
      <Card>
        <Card.Header>
          prct
        </Card.Header>
        <Card.Body>
          <Card.Title>prct title</Card.Title>
          <Card.SubTitle>prct subTitle</Card.SubTitle>
          <Card.Summary>prct description</Card.Summary>
        </Card.Body>
        <Card.Footer>
          prct Footer
        </Card.Footer>
      </Card>,
    )
      .get(selectors.card)
      .should('exist')
      .and('have.class', cssClasses.card)
      .as('card');

    cy.get('@card')
      .find(selectors.header)
      .should('exist');

    cy.get('@card')
      .find(selectors.body)
      .should('exist');

    cy.get('@card')
      .find(selectors.title)
      .should('exist');

    cy.get('@card')
      .find(selectors.subtitle)
      .should('exist');

    cy.get('@card')
      .find(selectors.summary)
      .should('exist');

    cy.get('@card')
      .find(selectors.footer)
      .should('exist');
  });

  it('should display just one line of the tile, when the title is too long', () => {
    cy.mount(
      <Card>
        <Card.Body>
          <Card.Title>
            prct title prct title prct title prct title prct title prct title prct title
          </Card.Title>
        </Card.Body>
      </Card>,
    )
      .get(selectors.title)
      .should('have.css', 'display', '-webkit-box')
      .and('have.css', '-webkit-line-clamp', '1')
      .and('have.css', '-webkit-box-orient', 'vertical');
  });

  it('Title can be configured to be displayed on 2 lines', () => {
    cy.mount(
      <Card>
        <Card.Body>
          <Card.Title maxLines={2}>
            prct title prct title prct title prct title prct title prct title prct title
          </Card.Title>
        </Card.Body>
      </Card>,
    )
      .get(selectors.title)
      .should('have.css', 'display', '-webkit-box')
      .and('have.css', '-webkit-line-clamp', '2')
      .and('have.css', '-webkit-box-orient', 'vertical');
  });

  it('should display just two lines of the summary, when the summary is too long', () => {
    cy.mount(
      <Card>
        <Card.Body>
          <Card.Summary>
            prct title prct title prct title prct title prct title prct title prct title
          </Card.Summary>
        </Card.Body>
      </Card>,
    )
      .get(selectors.summary)
      .should('have.css', 'display', '-webkit-box')
      .and('have.css', '-webkit-line-clamp', '2')
      .and('have.css', '-webkit-box-orient', 'vertical');
  });

  it('Summary can be configured to be displayed up to 5 lines', () => {
    cy.mount(
      <Card>
        <Card.Body>
          <Card.Summary maxLines={3}>
            prct title prct title prct title prct title prct title prct title prct title
            prct title prct title prct title prct title prct title prct title prct title
            prct title prct title prct title prct title prct title prct title prct title
            prct title prct title prct title prct title prct title prct title prct title
          </Card.Summary>
        </Card.Body>
      </Card>,
    )
      .get(selectors.summary)
      .should('have.css', 'display', '-webkit-box')
      .and('have.css', '-webkit-line-clamp', '3')
      .and('have.css', '-webkit-box-orient', 'vertical');
  });

  it('Displays content on the right hand side of the header', () => {
    cy.mount(
      <Card>
        <Card.Header right={<div className="custom-content">prct</div>} />
      </Card>,
    )
      .get(selectors.header)
      .find('.custom-content')
      .should('exist');
  });

  it('should render with customClassName', () => {
    const customClass = 'card-custom-class';
    cy.mount(<Card className={customClass} />)
      .get(selectors.card)
      .should('exist')
      .and('have.class', cssClasses.card)
      .and('have.class', customClass);
  });

  

  describe('Card - Selected and Selectable', () => {
    const cssClassesSelected = {
      selected: 'tyk-card--selected',
      selectable: 'tyk-card--selectable',
    };
  
    const selectors = {
      card: `.${cssClasses.card}`,
      selected: `.${cssClassesSelected.selected}`,
      selectable: `.${cssClassesSelected.selectable}`,
    };
  
    it('should render with the "selected" class when selected prop is true', () => {
      cy.mount(
        <Card selected>
          <Card.Body>
            <Card.Title>Selected Card</Card.Title>
          </Card.Body>
        </Card>,
      )
        .get(selectors.card)
        .should('exist')
        .and('have.class', cssClassesSelected.selected);
    });
  
    it('should not render the "selected" class when selected prop is false', () => {
      cy.mount(
        <Card>
          <Card.Body>
            <Card.Title>Not Selected Card</Card.Title>
          </Card.Body>
        </Card>,
      )
        .get(selectors.card)
        .should('exist')
        .and('not.have.class', cssClassesSelected.selected);
    });
  
    it('should render with the "selectable" class when onSelect prop is provided', () => {
      cy.mount(
        <Card onSelect={() => {}}>
          <Card.Body>
            <Card.Title>Selectable Card</Card.Title>
          </Card.Body>
        </Card>,
      )
        .get(selectors.card)
        .should('exist')
        .and('have.class', cssClassesSelected.selectable);
    });
  
    it('should not render the "selectable" class when onSelect prop is not provided', () => {
      cy.mount(
        <Card>
          <Card.Body>
            <Card.Title>Not Selectable Card</Card.Title>
          </Card.Body>
        </Card>,
      )
        .get(selectors.card)
        .should('exist')
        .and('not.have.class', cssClassesSelected.selectable);
    });
  
    it('should trigger onSelect callback when selectable card is clicked', () => {
      const onSelectSpy = cy.spy().as('onSelectSpy');
  
      cy.mount(
        <Card onSelect={onSelectSpy}>
          <Card.Body>
            <Card.Title>Selectable Card</Card.Title>
          </Card.Body>
        </Card>,
      )
        .get(selectors.card)
        .click();
  
      cy.get('@onSelectSpy').should('have.been.calledOnce');
    });
  });
});
