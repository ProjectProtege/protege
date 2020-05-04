describe('footer test', () => {
    beforeEach( () => {
        cy.visit('/')
    })
    it('tests the footer exits', () => {
        cy.get("[data-cy='footer']")
    })
    it('tests the email input', () => {
        cy.get("[data-cy='mailing-list-signup']").type('testemail@gmail.com').should('have.value', 'testemail@gmail.com')
        cy.get("[data-cy='mailing-list-signup-button']").should('have.text', 'Sign Up')
        // wanted to test .click() to submit, but the form doesn't work on localhost. 
    })
    it('checks the footer links', () => {
        cy.get("[data-cy='footer-links']>ul>li>a").should('have.length', 3)
            .each( (item) => {
                cy.visit(item[0].href)
            })
    })
    it('checks that the twitter icon links correctly', () => {
        cy.get("[data-cy='footer-links']>a").should('have.attr', 'href', 'https://twitter.com/devprotege')
    })
})