import Header from '../../components/Header.vue'
const mountVue = require('cypress-vue-unit-test');

const base_url = 'http://127.0.0.1:3000';

describe('Branding', () => {
  
  context('Homepage', function () {

    beforeEach(() => {
      cy.visit(base_url);
    });

    it('Has correct title', () => {
      cy.title().should('include', 'edusanjal');
    });
    
    it('Header is a component', () => {
      mountVue(Header);
      
    });

  });

});
