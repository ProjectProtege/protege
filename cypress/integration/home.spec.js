import { it } from 'mocha'

context('Home page', () => {
  beforeEach(() => {
    cy.visit('/')
  })

  it('renders', () => {
    // Check for the screen reader h1
    cy.get('h1')
      .should('have.text', 'Protege.dev | Remote jobs for junior developers')
      .should('exist')

    // Check that links to the job board exist
    cy.findAllByRole('link', { name: 'Find a Job' }).should('exist')
    // Check that the email sign up button exist
    cy.findByRole('button', { name: 'Sign Up' }).should('exist')
  })
})
