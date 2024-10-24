
describe('Teste de registrar presença/falta dos alunos', () => {

    
    before(() => {
        cy.visit('/');
        cy.get('p > a').click();
        cy.get('form > :nth-child(2) > input').type('1212');
        cy.get(':nth-child(3) > input').type('Gustavo');
        cy.get(':nth-child(4) > input').type('60');
        cy.get(':nth-child(5) > select').select('Professor');
        cy.get(':nth-child(6) > input').type('Design');
        cy.get(':nth-child(7) > input').type('Cais do Apolo 463');
        cy.get(':nth-child(8) > select').select('2024.1');
        cy.get(':nth-child(9) > input').type('123');
        cy.get(':nth-child(10) > input').type('123');
        cy.get('button').click()
    })
    
    beforeEach(() => {
        cy.visit('/');
        cy.get('form > :nth-child(2) > input').type('1212');
        cy.get(':nth-child(3) > input').type('123');
        cy.get('button').click();
        cy.get('#menu-toggle').click();
        cy.get('[href="/materias/"]').click();
    })

    it('Número de faltas menor que zero', () => {
        cy.get(':nth-child(1) > div > .btn-warning').click()
        cy.get('#aluno').select('Pedro');
        cy.get('#faltas').type(-1);
        cy.get('.btn').click();
        // cy.get('.alert').invoke('text').should('have.string','O número de faltas não pode ser negativo.');
    })

    it('Número de faltas maior que a quantidade máxima permitida', () => {
        cy.get(':nth-child(1) > div > .btn-warning').click()
        cy.get('#aluno').select('Pedro');
        cy.get('#faltas').type(16);
        cy.get('.btn').click();
        // cy.get('.alert').should('be.visible');
    })

    it('Registrar falta com sucesso', () => {
        let arr = [4, 6, 8, 0, 2, 1];
        for (let i = 1; i <= 6; i++) { 
            cy.get(`:nth-child(${i}) > div > .btn-warning`).click();
            cy.get('#aluno').select('Pedro');
            cy.get('#faltas').type(arr[i-1]);
            cy.get('.btn').click();
        }
    })

    it('Consultar faltas' ,() => {
        cy.visit('/');
        cy.get('form > :nth-child(2) > input').type('0102');
        cy.get(':nth-child(3) > input').type('123');
        cy.get('button').click();
        cy.get('#menu-toggle').click();
        cy.get('[href="/materias/"]').click();
        cy.get('tbody > :nth-child(1) > :nth-child(2)').should('be.visible');
        cy.get('tbody > :nth-child(1) > :nth-child(3)').should('be.visible');
    })
})