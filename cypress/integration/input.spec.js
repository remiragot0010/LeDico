import Input from '../../src/components/Input.vue'
import {  mount } from '@cypress/vue'

describe('ButtonCounter', () => {
    const lettre = "";
    const indice = 1;
    const nbClick = 0;


  it('emits "increment" event on click', () => {
    mount(Input, {
        propsData: {
            lettre,indice,nbClick
        }
      })
    const spy = cy.spy()
    Cypress.vue.$on('clickInput', spy)
    cy.get('#1')
      .click()
      .click()
      .then(() => {
        expect(spy).to.be.calledTwice
      })
  })
})