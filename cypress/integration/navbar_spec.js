describe('navbar test', () => {
    it('checks all links in the navbar are working correctly', () => {
        cy.visit("baseUrl")
        cy.get('header').children()

    })
})