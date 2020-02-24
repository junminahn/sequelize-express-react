describe('Social posts generation flow', () => {
  const MLS_ID = 'R2409163';

  beforeEach(() => {
    cy.visit('/facebook');

    cy.get('.main-container')
      .find('div.social-post')
      .first()
      .click();
  });

  it('should show one mls listing and two social templates', () => {
    cy.searchForListing(MLS_ID);

    cy.get('.search-results-container')
      .find('li')
      .and('have.length', 1);

    cy.get('.search-results-container')
      .find('a')
      .click();

    cy.get('.main-container')
      .find('.social-horizontal-wrapper')
      .and('have.length', 1);

    cy.get('.main-container')
      .find('.social-vertical-wrapper')
      .and('have.length', 1);
  });

  it('should store mlsId in session storage', () => {
    cy.searchForListing(MLS_ID);

    cy.get('.search-results-container')
      .find('a')
      .click();

    cy.checkSessionMlsId(MLS_ID);
  });
});
