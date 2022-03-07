describe('Voucher purchasing flow', () => {

    before(() => {

      cy.visit('https://gift-cards.phorest.com/salons/demo-us#');

      cy.url().should('eq', 'https://gift-cards.phorest.com/salons/demo-us#')
        
   })

   require('./50-to-me-workflow.js');
   require('./100-to-me-workflow.js');
   require('./150-to-me-workflow.js');
   require('./other-to-me-workflow.js');
   require('./50-to-someone-else-workflow');
   require('./100-to-someone-else-workflow');
   require('./150-to-someone-else-workflow');
   require('./other-to-someone-else.js');
   require('./edit-on-confirmation-workflow.js');

})