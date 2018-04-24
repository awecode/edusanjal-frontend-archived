const base_url = 'http://127.0.0.1:3000';

describe('Branding', function () {
  context('Homepage', function () {

    beforeEach(function () {
      cy.visit(base_url);
    });

    it('.should() - assert that <title> is correct', function () {
      cy.title().toUpperCase().should('include', 'edusanjal')
    });
  });

});
