describe('Baseline Functionality Testing', () => {
  it('Opens PartyCheck and checks for the Welcome', () => {
    cy.contains('Welcome to PartyCheck!');
  });

  it('Opens PartyCheck, clicks Search, and nothing happens', () => {
    cy.contains('Search').click();
    cy.contains('Welcome to PartyCheck!');
  });

  it('Should type `TheAlpacalypse` into the search and see the results table', () => {
    cy.get('input').type('TheAlpacalypse')
    cy.contains('Search').click();
    cy.get('table')
  })

  it('Should type `The` into the search and see the error warning', () => {
    cy.get('input').type('The')
    cy.contains('Search').click();
    cy.contains('You need to enter a valid FFLogs username.')
  })

  // it('Should get a valid JSON response and then show Fights')
})