// import Header from '../../components/Header.vue'
//
// const mountVue = require('cypress-vue-unit-test');

const base_url = 'http://127.0.0.1:3000/';

describe('Hamburger', () => {

  beforeEach(() => {
    cy.visit(base_url);
  });

  it('Hamburger opens and closes', () => {
    cy.viewport('iphone-6')
    cy.get('.navbar-menu').should('not.be.visible')
    cy.get('.navbar-menu').should('not.have.class', 'is-active')
    cy.get('.navbar-burger').should('not.have.class', 'is-active')
    cy.get('.navbar-burger span:first-child').click()
    cy.get('.navbar-menu').should('be.visible')
    cy.get('.navbar-menu').should('have.class', 'is-active')
    cy.get('.navbar-burger').should('have.class', 'is-active')
    cy.get('.navbar-burger').click()
    cy.get('.navbar-menu').should('not.be.visible')
    cy.get('.navbar-menu').should('not.have.class', 'is-active')
    cy.get('.navbar-burger').should('not.have.class', 'is-active')
  });
});