import Header from '../../components/Header.vue'

const mountVue = require('cypress-vue-unit-test');

const base_url = 'http://127.0.0.1:3000/';

describe('Branding', () => {

  context('Homepage', function () {

    beforeEach(() => {
      cy.visit(base_url);
    });

    it('Has correct page title', () => {
      cy.title().should('include', 'edusanjal');
    });

    it('Header has logo', () => {
      // cy.get('.navbar-burger span:first-child').click()
      cy.get('nav.navbar.is-primary .navbar-brand a img')
    });

    it('Navbar has brand name', () => {
      // cy.get('.navbar-burger span:first-child').click()
      cy.get('nav.navbar.is-primary .navbar-brand a').contains('edusanjal')
    });

    it('Navigate away from home', () => {
      // cy.get('.navbar-burger span:first-child').click()
      cy.url().should('eq', base_url);
      cy.get('div.main a:first-child').click()
      cy.url().should('not.eq', base_url);
    });

    it('Navigate back to home', () => {
      cy.get('div.main a:first-child').click()
      cy.url().should('not.eq', base_url);
      cy.get('nav.navbar.is-primary .navbar-brand a').click()
      cy.url().should('eq', base_url);
    });

  });

});
