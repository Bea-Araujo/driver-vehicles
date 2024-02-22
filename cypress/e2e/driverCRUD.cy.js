/// <reference types="cypress"/>
describe('Deve tester CRUD de drivers', () => {
    beforeEach(() => {
        cy.visit('http://localhost:3000')
    })

    it("Deve econtrar h1 motoristas na página", () => {
        cy.get("h1").contains("Motoristas")
    })

    it("Deve listar drivers", () => {
        cy.get('.MuiPaper-root').should('contain.html', 'table').within(() => {
            cy.get('tbody').should('exist');
            cy.get('tr').should('exist');
        })
    })

    it("Deve criar driver", () => {
        cy.get(".MuiButtonBase-root").contains("Criar").click()
        cy.get("#create-driver-form__name").type('Driver 1')
        cy.get("#create-driver-form__document").type('99999999999')
        cy.get("#create-driver-form__select__input").click()
        cy.get('[data-value="IpcGRvT"]').click()
        cy.get('.mui-1ppmer3 > .MuiButton-outlined').contains("Criar").click()
        cy.get('#notistack-snackbar').contains('Motorista criado')
    })

    it("Deve atualizar driver", () => {
        cy.wait(1500)
        cy.get("table > tbody > tr:first-child").click()
        cy.get('.MuiButton-outlinedPrimary').contains('Editar').click()
        cy.get('#edit-driver-form__name').clear().type('New Name')
        cy.get('.mui-1ppmer3 > .MuiButton-outlined').contains("Salvar").click()
        cy.get('#notistack-snackbar').contains('Motorista atualizado')
    })


    it.only("Deve deletar driver", () => {
        cy.wait(1500)
        cy.get("table > tbody > tr:first-child").click()
        cy.get('.MuiButton-outlinedError').contains('Deletar').click()
        cy.get('#notistack-snackbar').contains('Motorista deletado')
    })
})