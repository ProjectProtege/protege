const pageTitle = 'job-board'
const stringToTest = 'All Jobs'
describe(`${pageTitle} test`, () => {
  it(`tests that the ${pageTitle} page exists`, () => {
    cy.visit(`/${pageTitle}`)
    cy.contains(stringToTest)
  })
})
