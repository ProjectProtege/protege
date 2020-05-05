describe('post a job form', () => {
    beforeEach( () => {
        cy.visit('/post-a-job')
    })
    it('tests the form exists with all expected fields', () => {
        cy.get("[data-cy='post-a-job-form']")
        cy.get('input[name="jobTitle"]')
        cy.get('select[name="roleFocus"]')
        cy.get('select[name="positionType"]')
        // Quill Input
        // cy.get('input[name="jobDescription"]')
        cy.get('input[name="howToApply"]')
        cy.get('input[name="companyName"]')
        cy.get('input[name="companyWebsite"]')
        cy.get('input[name="companyEmail"]')
        cy.get('input[name="companyLogo"]')
        // Quill Input
        // cy.get('input[name="companyDescription"]')
        cy.get('input[name="companyHQ"]')
    })
    it('tests the form for error messages', () => {
        cy.get("[data-cy='next-step-button']").click()
        cy.get('.input-error').should('have.length', 10)
    })
    it('tests inputs all the form fields', () => {
        cy.get('input[name="jobTitle"]').type('Junior Developer')
        cy.get('select[name="roleFocus"]')
        cy.get('select[name="positionType"]')
        // Quill Input
        // cy.get('input[name="jobDescription"]')
        cy.get('input[name="howToApply"]').type('burtMaclin@fbi.com')
        cy.get('input[name="companyName"]').type('FBI')
        cy.get('input[name="companyWebsite"]').type('FBI.gov') 
        cy.get('input[name="companyEmail"]').type('burtMaclin@fbi.com')
        cy.get('input[name="companyLogo"]')
        // Quill Input
        // cy.get('input[name="companyDescription"]')
        cy.get('input[name="companyHQ"]').type('Washington, D.C.')
        cy.get("[data-cy='next-step-button']").click()
    })

})