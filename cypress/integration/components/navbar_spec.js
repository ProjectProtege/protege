describe('navbar test', () => {
    it('tests the mobile nav', () => {
        cy.visit('/')
        cy.get('[data-cy=mobile-nav]>ul>li>a').should('have.length', 3)
            .each( (item) => {
                cy.visit(item[0].href)
            })

    })
    it('tests the desktop nav', () => {
        cy.visit('/')
        cy.get('[data-cy=desktop-nav]>ul>li>a').should('have.length', 4)
            .each( (item) => {
                cy.visit(item[0].href)
            })
        
    })
    it('tests the quick filter', () => {
        cy.visit('/')
        cy.get('[data-cy=quick-filter]>li>a').should('have.length', 3)
            .each( (item) => {
                cy.visit(item[0].href)
            })
    })
})