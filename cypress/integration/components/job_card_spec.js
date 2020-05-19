describe('job card', () => {
  beforeEach(() => {
    cy.visit('/')
  })
  it('tests the job card container then each individual card', () => {
    cy.get("[data-cy='job-card-container']>a")
      .should('have.length', 6)
      .each((jobCard) => {
        // slices specifically to the end of http://localhost:3000/job-board/{jobId}
        const jobId = jobCard[0].href.slice(32)
        cy.get(`[data-cy='job-card-image-${jobId}']`).should('have.attr', 'src')
        cy.get(`[data-cy='job-card-company-name-${jobId}']`)
        cy.get(`[data-cy='job-card-job-title-${jobId}']`)
        cy.get(`[data-cy='job-card-role-focus-${jobId}']`)
        cy.get(`[data-cy='job-card-formatted-date-${jobId}']`)
        cy.get(`[data-cy='job-card-link-${jobId}']`).click()
        cy.go('back')
      })
  })
})
