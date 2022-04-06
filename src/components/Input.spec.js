import Input from './Input.vue'
import {  mount } from '@cypress/vue'

describe('Input', () => {

    beforeEach(() => {

        mount(Input, {
            propsData: {
                letter: "A",indice:1,nbClick:0
            }
          })

          
      
      })

  it('emits "increment" event on click', () => {
   
    cy.get('#1').should('have.value', "A")
    
    cy.get('#1').click();
    cy.get('#1').click();
    cy.get('#1').click();

    cy.get("@clickInput").should('be.calledThrice');

  })
})