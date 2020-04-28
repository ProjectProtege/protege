
// ["10x'er", 'Opportunity', 'Blue Chip', 'Moment', 'Prospect']

describe('tests the find your next component', () => {
    it('tests the component exists', () => {
        cy.visit('/')
        cy.get("[data-cy='find-your-next']")
        cy.contains("10x'er")
        cy.wait(2500)
        cy.contains('Opportunity')
        cy.wait(2500)
        cy.contains('Blue Chip')
        cy.wait(2500)
        cy.contains('Moment')
        cy.wait(2500)
        cy.contains('Prospect')
        cy.wait(2500)
    })
})