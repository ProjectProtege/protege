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
        cy.get(".ql-editor").first().should('have.attr', 'contenteditable')
        cy.get('input[name="howToApply"]')
        cy.get('input[name="companyName"]')
        cy.get('input[name="companyWebsite"]')
        cy.get('input[name="companyEmail"]')
        cy.get('input[name="companyLogo"]')
        // Quill Input
        cy.get(".ql-editor").last().should('have.attr', 'contenteditable')
        cy.get('input[name="companyHQ"]')
    })
    it('tests the form for error messages', () => {
        cy.get("[data-cy='next-step-button']").click()
        cy.get('.input-error').should('have.length', 10)
    })
    it('tests inputs all the form fields', () => {
        cy.get('input[name="jobTitle"]').type('Junior Developer')
        cy.get('select[name="roleFocus"]').select('Front-end')
        cy.get('select[name="positionType"]').select('Full-time')
        // Quill Input
        cy.get(".ql-editor").first().type('This is a {cmd}b GREAT gig.')
        cy.get('input[name="howToApply"]').type('tom@snakeholelounge.club')
        cy.get('input[name="companyName"]').type('Snakehole Lounge')
        cy.get('input[name="companyWebsite"]').type('https://snakeholelounge.club') 
        cy.get('input[name="companyEmail"]').type('tom@snakeholelounge.club')
        
        // Logo Upload
        cy.fixture('SnakeholeLoungeLogo.png').then( fileContent => {
            cy.get("[data-cy='company-logo-upload']").upload(
                { fileContent, fileName: 'SnakeholeLoungeLogo.png', mimeType: 'image/*' },
                { subjectType: 'input' }
            )
            cy.get("[data-cy='company-logo-uploaded']").should('have.attr', 'src')
            cy.get("[data-cy='logo-upload-fileName']").contains('SnakeholeLoungeLogo.png')
        })
        // Quill Input
        cy.get(".ql-editor").last().type('We are the dopest, trillest club around.')
        cy.get('input[name="companyHQ"]').type('Pawnee, IN')
        cy.get("[data-cy='next-step-button']").click()
    })

})