
describe('Teste de registrar presença/falta dos alunos e consultar faltas', () => {
    describe('Teste - Professor', () => {
    before(() => {
        cy.visit('/');
        cy.get('p > a').click();
        cy.get('form > :nth-child(2) > input').type('0102');
        cy.get(':nth-child(3) > input').type('Pedro');
        cy.get(':nth-child(4) > input').type('20');
        cy.get(':nth-child(5) > select').select('Aluno');
        cy.get(':nth-child(6) > input').type('CC');
        cy.get(':nth-child(7) > input').type('Cais do Apolo 463');
        cy.get(':nth-child(8) > select').select('2024.1');
        cy.get(':nth-child(9) > input').type('123');
        cy.get(':nth-child(10) > input').type('123');
        cy.get('button').click()
    })
    
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
        cy.get('.alert').should('be.visible');
    })

    it('Número de faltas maior que a quantidade máxima permitida', () => {
        cy.get(':nth-child(1) > div > .btn-warning').click()
        cy.get('#aluno').select('Pedro');
        cy.get('#faltas').type(16);
        cy.get('.btn').click();
        cy.get('.alert').should('be.visible');
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
    })
    describe('Teste - Aluno', () => {
    it('Consultar faltas' ,() => {
        cy.visit('/');
        cy.get('form > :nth-child(2) > input').type('0102');
        cy.get(':nth-child(3) > input').type('123');
        cy.get('button').click();
        cy.get('#menu-toggle').click();
        cy.get('[href="/materias/"]').click();
        /*cy.scrollTo('bottom');
        cy.get('tbody > :nth-child(1) > :nth-child(2)').scrollIntoView();
        cy.get('tbody > :nth-child(1) > :nth-child(2)').should('be.visible');*/
    })
    })

    after(() => {
        cy.visit('/admin/');
        cy.get('#id_username').type('pedrogusmao');
        cy.get('#id_password').type('123');
        cy.get('.submit-row > input').click();
        cy.get('#auth-user > a').click();
        cy.get('#searchbar').type('1212');
        cy.get('#changelist-search > div > [type="submit"]').click();
        cy.get('.action-select').click();
        cy.get('select').select('Delete selected users');
        cy.get('.button').click();
        cy.get('div > [type="submit"]').click();
    })

    after(() => {
        cy.visit('/admin/');
        cy.get('#auth-user > a').click();
        cy.get('#searchbar').type('0102');
        cy.get('#changelist-search > div > [type="submit"]').click();
        cy.get('.action-select').click();
        cy.get('select').select('Delete selected users');
        cy.get('.button').click();
        cy.get('div > [type="submit"]').click();
    })

    after(() => {
        cy.visit('/admin/');
        cy.get('#auth-user > a').click();
        cy.get('#usuarios-materia > a').click();
        cy.get('#action-toggle').click();
        cy.get('select').select('Delete selected materias');
        cy.get('.button').click();
        cy.get('div > [type="submit"]').click();
    })
})