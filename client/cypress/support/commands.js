Cypress.Commands.add('searchForListing', input => {
  cy.get('[data-test-id="search-mls-input"]').type(input);
  cy.get('.button.search-button').click();
});

Cypress.Commands.add('checkSessionMlsId', mlsId => {
  cy.window()
    .its('sessionStorage')
    .its('SEARCHED_LISTING')
    .should('contain', mlsId);
});
