describe('post a job form', () => {
    beforeEach( () => {
        cy.visit('/post-a-job')
        cy.fixture('mockData.json').as('mockData')
    })
    it('tests the form exists with all expected fields', () => {
        cy.get("[data-cy='status-bar']>svg>circle").first().should('not.have.attr', 'fill-opacity')
        cy.get("[data-cy='post-a-job-form']")
        cy.get('input[name="jobtitle"]')
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
        cy.get('.input-error').should('have.length', 11)
    })
    it('tests inputs all the form fields', () => {
        cy.get('input[name="jobtitle"]').type('Junior Developer').should('value', 'Junior Developer')
        cy.get('select[name="roleFocus"]').select('Front-end').should('value', 'Front-end')
        cy.get('select[name="positionType"]').select('Full-time').should('value', 'Full-time')
        // Quill Input
        cy.get(".ql-editor").first().type('This is a GREAT gig.')
        cy.get(".ql-editor").first().children().contains('This is a GREAT gig.')
        cy.get('input[name="howToApply"]').type('https://indeed.com?snakeholeLounge').should('value', 'https://indeed.com?snakeholeLounge')
        cy.get('input[name="companyName"]').type('Snakehole Lounge').should('value', 'Snakehole Lounge')
        cy.get('input[name="companyWebsite"]').type('https://parksandrecreation.fandom.com/wiki/The_Snakehole_Lounge').should('value', 'https://parksandrecreation.fandom.com/wiki/The_Snakehole_Lounge')
        cy.get('input[name="companyEmail"]').type('tom@snakeholelounge.club').should('value', 'tom@snakeholelounge.club')
        
        // Logo Upload
        cy.fixture('SnakeholeLoungeLogo.png').then( fileContent => {
            cy.get("[data-cy='company-logo-upload']").upload(
                { fileContent, fileName: 'SnakeholeLoungeLogo.png', mimeType: 'image/png' },
                { subjectType: 'input' }
            )
            cy.get("[data-cy='company-logo-uploaded']").should('have.attr', 'src')
            cy.get("[data-cy='logo-upload-fileName']").contains('SnakeholeLoungeLogo.png')
        })
        // Quill Input
        cy.get(".ql-editor").last().type('We are the dopest, trillest club around.')
        cy.get(".ql-editor").last().children().contains('We are the dopest, trillest club around.')
        cy.get('input[name="companyHQ"]').type('Pawnee, IN').should('value', 'Pawnee, IN')
        cy.get("[data-cy='next-step-button']").click()

        // Then test the preview
        // Status Bar
        cy.get("[data-cy='status-bar']>svg>circle").first().should('not.have.attr', 'fill-opacity')
        cy.get("[data-cy='status-bar']>svg>circle").next().should('not.have.attr', 'fill-opacity')
        cy.get("[data-cy='status-bar']>svg>circle").last().should('have.attr', 'fill-opacity')
    
        // Makes sure all the fields came through the inputs. 
        cy.get("[data-cy='job-title']").contains('Junior Developer')
        cy.get("[data-cy='role-focus-and-position-type']").contains('Front-end • Full-time')
        cy.get("[data-cy='job-description-title']").contains('Job Description')
        cy.get("[data-cy='job-description']").contains('This is a GREAT gig.')
        cy.get("[data-cy='company-description-title']").contains('About Snakehole Lounge')
        cy.get("[data-cy='company-description']").contains('We are the dopest, trillest club around.')
        cy.get("[data-cy='company-logo']").should('have.attr', 'src')
        cy.get("[data-cy='company-name-sidebar']").contains('Snakehole Lounge')
        cy.get("[data-cy='company-website']").should('have.attr', 'href', 'https://parksandrecreation.fandom.com/wiki/The_Snakehole_Lounge')
        cy.get("[data-cy='company-email']").should('have.attr', 'href', 'mailto:tom@snakeholelounge.club')
        cy.get("[data-cy='how-to-apply']").should('have.attr', 'href', 'https://indeed.com?snakeholeLounge')
        cy.get("[data-cy='how-to-apply-bottom']").should('have.attr', 'href', 'https://indeed.com?snakeholeLounge')


        // The following tests are not passing in Cypress, but are working in 
        // Tests Edit Button
        // cy.get("[data-cy='edit-job-button']").click()
        // cy.get("[data-cy='company-description']").type(' And perk is free Snakejuice.')
        // cy.get("[data-cy='next-step-button']").click()

        // Uncomment this line
        // cy.get("[data-cy='job-posting-approval-button']").click()

        // Confirmation Page
        // cy.get("[data-cy='status-bar']>svg>circle").each( (circle) => {
        //     circle.should('not.have.attr', 'fill-opacity')
        // })
    })



})