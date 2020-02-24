describe('Brochure generation flow: Search MLS and render the template', () => {
  const MLS_ID = 'R2409163';

  beforeEach(() => {
    cy.visit('/search');
  });

  it('should show one mls listing and 6 templates', () => {
    cy.searchForListing(MLS_ID);

    cy.get('.search-results-container')
      .find('li')
      .and('have.length', 1);

    cy.get('.search-results-container')
      .find('a')
      .click();

    cy.location('pathname').should('include', 'brochure');

    cy.get('.brochure-container')
      .find('a')
      .and('have.length', 6);
  });

  it('should return multiple mls listings for text search', () => {
    cy.searchForListing('vic');

    cy.get('.search-results-container')
      .find('li')
      .its('length')
      .should('be.gt', 2);
  });

  it('should show populated template with components', () => {
    cy.searchForListing(MLS_ID);

    cy.get('.search-results-container')
      .find('a')
      .click();

    cy.get('.brochure-container')
      .find('a')
      .first()
      .click();

    cy.get('[data-test-id="mls-id"]').should('have.text', MLS_ID);

    cy.get('.main-container')
      .find('.button')
      .first()
      .should('have.text', 'DOWNLOAD');

    cy.get('.main-container')
      .find('.image-container')
      .should('be.visible');
  });

  it('should store mlsId in session storage', () => {
    cy.searchForListing(MLS_ID);

    cy.get('.search-results-container')
      .find('a')
      .click();

    cy.checkSessionMlsId(MLS_ID);
  });
});
