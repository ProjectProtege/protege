describe('navbar test', () => {
    it('checks all links in the navbar are working correctly', () => {
        cy.visit('/')
        cy.get('nav>ul>li')
        .each( (el) => {
            if(el === 'a'){
                cy.click()
            }
        }  )

    })
})