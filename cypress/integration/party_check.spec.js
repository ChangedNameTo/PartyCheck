describe('Baseline Functionality Testing', () => {
  it('Opens PartyCheck and checks for the Welcome', () => {
    cy.contains('Welcome to PartyCheck!');
  });

  it('Opens PartyCheck, clicks Search, and nothing happens', () => {
    cy.contains('Search').click();
    cy.contains('Welcome to PartyCheck!');
  });

  it('Should type `TheAlpacalypse` into the search and see the results table', () => {
    // Set up the stub
    cy.server()
    cy.route('GET','/v1/reports/user/*','fixture:fights.json')
    cy.route('GET','/v1/report/fights/*','fixture:report.json')

    cy.get('input').type('TheAlpacalypse')
    cy.contains('Search').click();
    cy.get('table')
  })

  it('Should type `The` into the search and see the error warning', () => {
    cy.get('input').type('The')
    cy.contains('Search').click();
    cy.contains('You need to enter a valid FFLogs username.')
  })

  it('Should get a valid JSON response and then find the Show Fights button', () => {
    // Set up the stub
    cy.server()
    cy.route('GET','/v1/reports/user/*','fixture:fights.json')
    cy.route('GET','/v1/report/fights/*','fixture:report.json')

    cy.get('input').type('TheAlpacalypse')
    cy.contains('Search').click();
    cy.get('table').contains('Show Fights')
  })
  
  it('Should see a full fights table, and click show fights and see results', () => {
    // Set up the stub
    cy.server()
    cy.route('GET','/v1/reports/user/*','fixture:fights.json')
    cy.route('GET','/v1/report/fights/*','fixture:report.json')

    cy.get('input').type('TheAlpacalypse')
    cy.contains('Search').click();
    cy.get('table').contains('Show Fights').click();
    cy.get('tr').contains("Eden's Verse: Fulmination (Savage)")
  })
})