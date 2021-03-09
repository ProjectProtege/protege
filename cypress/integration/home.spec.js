context('Home page', () => {
  beforeEach(() => {
    cy.visit('/')
  })

  it('renders', () => {
    // Check for the screen reader h1
    cy.get('h1')
      .should('exist')
      .should('have.text', 'Protege.dev | Remote jobs for junior developers')

    // Check that links to the job board exist
    cy.findAllByRole('link', { name: 'Find a Job' }).should('exist').should('have.length', 3)

    cy.findAllByRole('link', {name: 'Post a Job'}).should('exist').should('have.length', 3)

    // Check that the email sign up button exist
    cy.findByRole('button', { name: 'Sign Up' }).should('exist')
  })
})
