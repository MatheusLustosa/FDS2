

describe('Teste de registrar nota dos alunos', () => {
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

    it('Informar erro ao inserir nota maior que 10 ', () => {
        cy.get(':nth-child(1) > #div > .btn-success').click()
        cy.get('#aluno').select('Pedro');
        cy.get('#nota').type(-1);
        cy.get('.btn').click();
        cy.get('.alert').should('be.visible');

    })

    it('Informar erro ao inserir nota menor que 0 ', () => {
        cy.get(':nth-child(1) > #div > .btn-success').click()
        cy.get('#aluno').select('Pedro');
        cy.get('#nota').type(11);
        cy.get('.btn').click();
        cy.get('.alert').should('be.visible');
    })

    it('Professor registrar Nota ', () => {
        let i = 1;
        let arr = [7.2, 9.8, 9.4, 9.5, 8.7, 7.1];
        cy.get('.list-group-item').each(($el) => {
            if (i == 7) {
                i = 6;
            }
            cy.get($el).get('#div').get(`:nth-child(${i}) > div > .btn-success`).click();
            cy.get('#aluno').select('Pedro');
            cy.get('#nota').type(arr[i-1]);
            cy.get('.btn').click();
            i+=1;
        })
    })

    it('Aluno consultar Nota' ,() => {
        cy.visit('/');
        cy.get('form > :nth-child(2) > input').type('0102');
        cy.get(':nth-child(3) > input').type('123');
        cy.get('button').click();
        cy.get('#menu-toggle').click();
        cy.get('[href="/materias/"]').click();
        cy.get('tbody > :nth-child(1) > :nth-child(2)').should('be.visible');
        cy.get('tbody > :nth-child(1) > :nth-child(3)').should('be.visible');
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
})