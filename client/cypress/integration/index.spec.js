describe('The index aka Dashboard page', () => {
  it('should contain the Dashboard, Brochures and Facebook links', () => {
    cy.visit('/');
    cy.get('.main-container');
    cy.get('h1').should('exist');

    cy.get('[data-test-id="dashboard-link"]')
      .and('have.attr', 'href')
      .and('include', '/');

    cy.get('[data-test-id="brochure-link"]')
      .and('have.attr', 'href')
      .and('include', '/search');

    cy.get('[data-test-id="social-link"]')
      .and('have.attr', 'href')
      .and('include', '/facebook');
  });

  it('should navigate to Search Mls and Facebook pages', () => {
    cy.visit('/');

    cy.get('[data-test-id="brochure-link"]').click({ force: true });
    cy.location('pathname').should('include', 'search');

    cy.get('[data-test-id="dashboard-link"]').click({ force: true });
    cy.location('pathname').should('include', '/');

    cy.get('[data-test-id="social-link"]').click({ force: true });
    cy.location('pathname').should('include', 'facebook');
  });
});
