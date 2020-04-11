describe('PartyTable functionality testing', () => {
  it('Should click a column header and see the data contained change', () => {
    // Set up the stub
    cy.server();
    cy.route('GET','/v1/reports/user/*','fixture:fights.json');
    cy.route('GET','/v1/report/fights/*','fixture:report.json');

    cy.get('input').type('TheAlpacalypse');
    cy.contains('Search').click();
    cy.get('.descending').click();
    cy.get('table thead > tr > th').contains('.ascending')
  })
})