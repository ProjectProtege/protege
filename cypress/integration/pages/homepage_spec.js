const pageTitle = ''
const stringToTest = 'Latest Opportunities'
describe(`homepage test`, () => {
  it(`tests that the homepage exists`, () => {
    cy.visit(`/${pageTitle}`)
    cy.contains(stringToTest)
  })
})
