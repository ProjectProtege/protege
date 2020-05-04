
const pageTitle = "learning-resources"
const stringToTest = 'Learning Resources'
describe(`${pageTitle} test`, () => {
    it(`tests that the ${pageTitle} page exists`, () => {
        cy.visit(`/${pageTitle}`)
        cy.contains(stringToTest)
    })
})