describe('status bar test', () => {
  beforeEach(() => {
    cy.visit('/post-a-job')
  })
  it('make sure the status bar exists and has 3 circles', () => {
    cy.get("[data-cy='status-bar']>svg>circle").should('have.length', 3)
  })
  it('the first circle should be opaque the rest should be 50% opacity', () => {
    cy.get("[data-cy='status-bar']>svg>circle")
      .first()
      .should('not.have.attr', 'fill-opacity')
    cy.get("[data-cy='status-bar']>svg>circle")
      .eq(1)
      .should('have.attr', 'fill-opacity')
    cy.get("[data-cy='status-bar']>svg>circle")
      .eq(2)
      .should('have.attr', 'fill-opacity')
  })
})
