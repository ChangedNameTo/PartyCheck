// Testing suite for search options to filter out fights based on job, name, etc.
describe('PartyTableSearch functionality testing', () => {
  it('Contains the options dropdown button, clicks it, and sees a set of options', () => {
    cy.contains('Options').click();
    cy.contains('Fights');
    cy.contains('Jobs');
    cy.contains('Kills');
  });

  it('Clicks the options dropdown after expanding it, hiding the options', () => {
    cy.contains('Options').click();
    cy.contains('Fights');
    cy.get('h4').contains('Fights');
    cy.contains('Options').click();
    cy.get('h4').should('not.be.visible');
  })

  it('Selects a job filter and removes that result from the table', () => {
    // Set up the stub
    cy.server();
    cy.route('GET','/v1/reports/user/*','fixture:fights.json');
    cy.route('GET','/v1/report/fights/*','fixture:report.json');

    cy.get('input').type('TheAlpacalypse');
    cy.contains('Search').click();

    cy.contains('Options').click();

    cy.get('#jobFilterSelect').click()
    cy.contains('Dancer').click()
    cy.contains('Options').click();

    cy.get('#showFightsButton').click()
    cy.get('tr > #job').should('not.eq','WhiteMage')
  })

  it('Selects a fight filter and removes that result from the table', () => {
    // Set up the stub
    cy.server();
    cy.route('GET','/v1/reports/user/*','fixture:fights.json');
    cy.route('GET','/v1/report/fights/*','fixture:report.json');

    cy.get('input').type('TheAlpacalypse');
    cy.contains('Search').click();

    cy.contains('Options').click();

    cy.get('#fightFilterSelect').click()
    cy.contains('Cinder Drift (Extreme)').click()
    cy.contains('Options').click();
  })

  it('Selects the kill filter "Kills" and removes wipes/kills from the table', () => {
    // Set up the stub
    cy.server();
    cy.route('GET','/v1/reports/user/*','fixture:fights.json');
    cy.route('GET','/v1/report/fights/*','fixture:report.json');

    cy.get('input').type('TheAlpacalypse');
    cy.contains('Search').click();

    cy.contains('Options').click();
    cy.get('button').contains('Kills').click();
    cy.get('tbody > tr').each(($value) => {
      cy.wrap($value).contains('0.00%')
    })

    cy.get('button').contains('Wipes').click();

    cy.get('#showFightsButton').click()
    cy.get('tr > #percentage').should('not.eq','0.00%')
  })
})