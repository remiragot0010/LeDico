describe('On test', () => {

    beforeEach(() => {
        cy.visit('http://localhost:8080/#/')
    })
    
    it('Utilisation complete', () => {
      
        cy.get('select').select('9');

        cy.focused().should('have.attr', 'id' , '1')
       
        cy.get('#1').type('C')
        cy.focused().should('have.attr', 'id' , '2')
        cy.get('#2').type('O')
        cy.focused().should('have.attr', 'id' , '3')
        cy.get('#3').type('N')
        cy.focused().should('have.attr', 'id' , '4')
        cy.get('#4').type('C')
        cy.focused().should('have.attr', 'id' , '5')
        cy.get('#5').type('O')
        cy.focused().should('have.attr', 'id' , '6')
        cy.get('#6').type('M')
        cy.focused().should('have.attr', 'id' , '7')
        cy.get('#7').type('B')
        cy.focused().should('have.attr', 'id' , '8')
        cy.get('#8').type('R')
        cy.focused().should('have.attr', 'id' , '9')
        cy.get('#9').type('E')
        cy.focused().should('have.attr', 'id' , '9')

        cy.get('#1').dblclick().should('have.css', 'background-color', 'rgb(221, 58, 58)');
        cy.get('#2').dblclick().should('have.css', 'background-color', 'rgb(221, 58, 58)');
        cy.get('#3').dblclick().should('have.css', 'background-color', 'rgb(221, 58, 58)');
        cy.get('#4').dblclick().should('have.css', 'background-color', 'rgb(221, 58, 58)');
        cy.get('#8').click().should('have.css', 'background-color', 'rgb(207, 142, 56)');
        cy.get('#9').click().should('have.css', 'background-color', 'rgb(207, 142, 56)');

        cy.get('#button2').click();

        cy.get(':nth-child(2) > li').should('have.text', 'CONCOMBRE');

        cy.get('.grid').find('li').should('have.length', 22);

        cy.get('#1').type('C')
        cy.get('#2').type('O')
        cy.get('#3').type('N')
        cy.get('#4').type('C')
        cy.get('#5').type('E')
        cy.get('#6').type('R')
        cy.get('#7').type('T')
        cy.get('#8').type('E')
        cy.get('#9').type('S')

        cy.get('#1').dblclick();
        cy.get('#2').dblclick();
        cy.get('#3').dblclick();
        cy.get('#4').dblclick();
        cy.get('#5').dblclick();
        cy.get('#6').dblclick();
        cy.get('#8').dblclick();
        cy.get('#9').dblclick();

        cy.get('#button2').click();

        cy.get('#app > :nth-child(1) > :nth-child(2) > :nth-child(2)').should('have.text', 'CONCERTES');

        cy.get('.grid').find('li').should('have.length', 1);

        cy.get('.grid > li').should('have.text', 'CONCERNES');

        cy.get('#button1').click();

        cy.focused().should('have.attr', 'id' , '1')
        cy.get('.grid').find('li').should('have.length', 0);

    })

    it('Change select', () => {
      
        cy.get('select').select('6');

        cy.get('#1').type('C')
        cy.get('#2').type('R')

        cy.get('#1').dblclick().should('have.css', 'background-color', 'rgb(221, 58, 58)');

        cy.get('select').select('5');

        cy.get('#1').should('have.css', 'background-color', 'rgb(225, 225, 225)');

    })

    it('Change select after research', () => {
      
        cy.get('select').select('6');

        cy.get('#1').type('C')
        cy.get('#2').type('R')

        cy.get('#1').dblclick().should('have.css', 'background-color', 'rgb(221, 58, 58)');

        cy.get('#button2').click();

        cy.get(':nth-child(2) > li').should('have.text', 'CR');

        cy.get('select').select('5');

        cy.get(':nth-child(2) > li').should('not.exist');

        cy.get('#1').should('have.css', 'background-color', 'rgb(225, 225, 225)');

    })

    it('Clear All', () => {
      
        cy.get('select').select('6');

        cy.get('#1').type('C')
        cy.get('#2').type('R')

        cy.get('#1').dblclick().should('have.css', 'background-color', 'rgb(221, 58, 58)');

        cy.get('#button2').click();

        cy.get(':nth-child(2) > li').should('have.text', 'CR');

        cy.get('#button3').click();

        cy.get(':nth-child(2) > li').should('not.exist');

        cy.get('#1').should('have.css', 'background-color', 'rgb(225, 225, 225)');
        cy.get('#1').should('have.text', '');
        cy.get('#2').should('have.text', '');

    })

    it('Test touche effacer', () => {

        cy.get('select').select('6');
        
        cy.get('#2').dblclick().should('have.css', 'background-color', 'rgb(221, 58, 58)');
        cy.get('#1').type('C')
        cy.get('#2').type('R')

        cy.focused().should('have.attr', 'id' , '3')

        cy.get('#3').type('{backspace}')

        cy.focused().should('have.attr', 'id' , '2')
        cy.get('#2').should('have.css', 'background-color', 'rgb(225, 225, 225)');
        cy.get('#2').should('have.text', '');

        cy.focused().should('have.attr', 'id' , '2')
    })

    it('Test touche controle', () => {

        cy.get('select').select('6');
        
        cy.get('#1').type('{ctrl}')
        cy.get('#1').type('C')

        cy.get('#1').should('have.css', 'background-color', 'rgb(221, 58, 58)');
    })

    it('Test touche shift', () => {

        cy.get('select').select('6');
        
        cy.get('#1').type('{shift}')
        cy.get('#1').type('C')

        cy.get('#1').should('have.css', 'background-color', 'rgb(207, 142, 56)');
    })

    it('Test touche del', () => {

        cy.get('select').select('6');

        cy.get('#1').type('C')
        cy.get('#2').type('R')

        cy.get('#1').dblclick().should('have.css', 'background-color', 'rgb(221, 58, 58)');

        cy.get('#2').type('{del}')

        cy.get('#1').should('have.css', 'background-color', 'rgb(225, 225, 225)');
        cy.get('#1').should('have.text', '');
        cy.get('#2').should('have.text', '');

    })

    it('Test click', () => {

        cy.get('select').select('6');
        
        cy.get('#1').type('{ctrl}')
        cy.get('#1').type('E')
        cy.get('#2').type('{ctrl}')
        cy.get('#2').type('N')
        cy.get('#3').type('T')
        cy.get('#4').type('R')
        cy.get('#5').type('E')
        cy.get('#6').type('{shift}')
        cy.get('#6').type('R')

        cy.get('#6').type('{enter}')

        cy.get(':nth-child(1) > a').click();
        cy.get('#1').should('have.value', 'E')
        cy.get('#2').should('have.value', 'N')
        cy.get('#3').should('have.value', 'C')
        cy.get('#4').should('have.value', 'I')
        cy.get('#5').should('have.value', 'R')
        cy.get('#6').should('have.value', 'A')

        cy.get('#1').should('have.css', 'background-color', 'rgb(221, 58, 58)');
        cy.get('#2').should('have.css', 'background-color', 'rgb(221, 58, 58)');
        cy.get('#3').should('have.css', 'background-color', 'rgb(225, 225, 225)');
        cy.get('#4').should('have.css', 'background-color', 'rgb(225, 225, 225)');
        cy.get('#5').should('have.css', 'background-color', 'rgb(225, 225, 225)');
        cy.get('#6').should('have.css', 'background-color', 'rgb(225, 225, 225)');
    })



  })