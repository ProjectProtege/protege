describe('job card', () => {
    beforeEach( () => {
        cy.visit('/')
    })
    it('tests the job card', () => {
        cy.get("[data-cy='job-card-container']>a").should('have.length', 6)
            .each( (jobCard) => {
                console.log(jobCard)
                // cy.get('img')
                // cy.get("[data-cy='job-card-company-name']")
            })
    })
})