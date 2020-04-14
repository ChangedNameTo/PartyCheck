describe('Checks that footer content renders', () => {
  it('Verifies that the footer is visible', () => {
    cy.get('.raised')
  })

  it('Opens PartyCheck and checks for the Github link, and clicks it', () => {
    cy.contains('View on Github')
  });
  
  it('Opens PartyCheck and checks for the LinkedIn link, and clicks it', () => {
    cy.contains('Find me on LinkedIn')
  });
})