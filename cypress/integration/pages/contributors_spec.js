const pageTitle = 'contributors'
const stringToTest = 'Contributors'
describe(`contributors page test`, () => {
    it(`tests that the contributors page exists`, () => {
        cy.visit(`/${pageTitle}`)
        cy.contains(stringToTest)
    })
})