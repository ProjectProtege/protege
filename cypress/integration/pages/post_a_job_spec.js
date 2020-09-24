const pageTitle = 'post-a-job'
const stringToTest = 'Inexperienced doesn’t mean incapable.'
describe(`${pageTitle} test`, () => {
  it(`tests that the ${pageTitle} page exists`, () => {
    cy.visit(`/${pageTitle}`)
    cy.contains(stringToTest)
  })
})
