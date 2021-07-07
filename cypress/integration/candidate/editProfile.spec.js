import users from '../../fixtures/users'

describe('Candidate Edit Profile', () => {
  const { candidate } = users

  beforeEach(() => {
    cy.logout()
    cy.log('Signed out')
    cy.visit('/')
  })

  it('Candidate sign up flow', () => {
    // clicks sign up, checks url, confirms candidate is selected
    cy.findByRole('link', { name: 'Sign Up' }).click()
    cy.url().should('include', '/account-select')
    cy.findByRole('button', { name: /Candidate/g })
      .click()
      .should('have.class', 'ring-teal')

    // clicks continue, navigates to candidate sign up form
    cy.findByRole('button', { name: 'Continue' }).click()
    cy.url().should('include', 'accountType=candidate')

    // checks that errors exist on submit
    cy.get('[data-cy="sign-up-form"]').should(
      'have.attr',
      'data-cy',
      'sign-up-form'
    )
    cy.findByRole('button', { name: /Create an account/i }).click()
    cy.get('[data-cy="name-error"]').should('be.visible')

    // inputs a name, checkes that error is removed
    cy.findByLabelText('Name').clear().type(candidate.name)
    cy.get('[data-cy="name-error"]').should('not.exist')

    // inputs an email, checkes that error is removed
    cy.findByLabelText('Email').clear().type(candidate.email)
    cy.get('[data-cy="email-error"]').should('not.exist')

    // inputs a password, checkes that error is removed
    cy.findByLabelText('Password').clear().type(candidate.password)
    cy.get('[data-cy="password-error"]').should('not.exist')

    // create account
    const candidateName = 'candidate-name'
    cy.findByRole('button', { name: /Create an account/i }).click()
    cy.url({ timeout: 5000 }).should(
      'include',
      `/candidate/${candidateName}/edit-profile`
    )

    // checks that errors exist on form save
    cy.findByRole('button', { name: 'Save' }).click()
    cy.get('[data-cy="firstName-error"]').should('be.visible')

    // inputs a firstName, checkes that error is removed
    cy.findByLabelText('First Name').clear().type('First')
    cy.get('[data-cy="firstName-error"]').should('not.exist')

    // inputs a lastName, checkes that error is removed
    cy.findByLabelText('Last Name').clear().type('Last')
    cy.get('[data-cy="lastName-error"]').should('not.exist')

    // inputs a timezone, checkes that error is removed
    cy.findByLabelText('Timezone')
      .select('(UTC-10:00) Hawaii')
      .should('have.value', '(UTC-10:00) Hawaii')

    // inputs a timezone, checkes that error is removed
    cy.findByLabelText('Timezone')
      .select('(UTC-10:00) Hawaii')
      .should('have.value', '(UTC-10:00) Hawaii')

    // inputs a timeframe_to, checkes that error is removed
    cy.findByLabelText('To')
      .select('(UTC-10:00) Hawaii')
      .should('have.value', '(UTC-10:00) Hawaii')

    // inputs a timeframe_from, checkes that error is removed
    cy.findByLabelText('From')
      .select('(UTC-10:00) Hawaii')
      .should('have.value', '(UTC-10:00) Hawaii')

    // inputs tech used and checks that the item is displayed
    cy.findByLabelText(/Tech Used/g)
      .clear()
      .type('Javascript')
    cy.get('[data-cy="submit-tech"]').click()
    cy.get('[data-cy="tech-item"]').should('be.visible')
    cy.get('.toast').contains(/was added!/g)

    cy.findByLabelText(/Tech Used/g)
      .clear()
      .type('Vue')
    cy.get('[data-cy="submit-tech"]').click()
    cy.get('[data-cy="tech-item"]').should('be.visible')
    cy.get('.toast').contains(/was added!/g)

    // inputs tech used and makes sure projectUrl error is displayed on button click
    cy.findByLabelText(/Project Name/g)
      .clear()
      .type('Real Time Chat App')
    cy.findByRole('button', { name: 'Save' }).click()
    cy.get('[data-cy="projectUrl-error"]').should('be.visible')

    // adds project url, checks that error is removed, adds project item to array, confirms toast
    cy.findByLabelText(/Project Url/g)
      .clear()
      .type('https://www.google.com/')
    cy.get('[data-cy="projectUrl-error"]').should('not.exist')
    cy.get('[data-cy="submit-project"]').click()
    cy.get('[data-cy="project-item"]').should('be.visible')
    cy.get('.toast').contains(/was added!/g)

    // inputs project name and url, adds project item to array, confirms toast
    cy.findByLabelText(/Project Name/g)
      .clear()
      .type('Vue Dashboard')

    cy.findByLabelText(/Project Url/g)
      .clear()
      .type('https://www.google.com/')
    cy.get('[data-cy="submit-project"]').click()
    cy.get('[data-cy="project-item"]').should('be.visible')
    cy.get('.toast').contains(/was added!/g)

    // // removes project item and confirms toast
    // cy.get('[data-cy="project-item"]')
    //   .last()
    //   .findByRole('button', { name: 'x' })
    //   .click()
    // cy.get('.toast').contains(/was removed!/g)

    // // removes tech item and confirms toast
    // cy.get('[data-cy="tech-item"]')
    //   .last()
    //   .findByRole('button', { name: 'x' })
    //   .click()
    // cy.get('.toast').contains(/was removed!/g)

    // inputs an answer to question one, checkes that error is removed
    cy.get('[data-cy="question-one"]').clear().type('This is an answer')
    cy.get('[data-cy="question-one-error"]').should('not.exist')

    // inputs an answer to question two, checkes that error is removed
    cy.get('[data-cy="question-two"]').clear().type('This is an answer')
    cy.get('[data-cy="question-two-error"]').should('not.exist')

    // inputs an answer to question three, checkes that error is removed
    cy.get('[data-cy="question-three"]').clear().type('This is an answer')
    cy.get('[data-cy="question-three-error"]').should('not.exist')

    // Save form and check redirect to Dashboard url
    cy.findByRole('button', { name: 'Save' }).click()
    cy.url().should('include', '/dashboard')
  })
})
