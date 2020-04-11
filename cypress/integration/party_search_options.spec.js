// Testing suite for search options to filter out fights based on job, name, etc.
describe('PartyTableSearch functionality testing', () => {
  it('Contains the options dropdown button, clicks it, and sees a set of options', () => {
    cy.contains('Options').click();
    cy.contains('Filter by Fight');
    cy.contains('Filter by Job');
    cy.contains('Filter by Result');
  });

  it('Clicks the options dropdown after expanding it, hiding the options', () => {
    cy.contains('Options').click();
    cy.contains('Filter by Fight');
    cy.contains('Options').click();
  })

  it('Selects a fight filter and removes that result from the table', () => {
  })

  it('Selects a job filter and removes that result from the table', () => {
  })

  it('Selects a result filter and removes that result from the table', () => {
  })
})