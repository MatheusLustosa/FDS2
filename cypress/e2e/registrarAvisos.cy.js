describe('Teste de aluno visualizar informações dos professores', () => {
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
    })

    it('Visualizar todos os campos de um aviso registrado', () => {
        cy.get('.btn-primary').click();
        cy.get('#titulo').type('Tech design');
        cy.get('#conteudo').type('Evento para apresentação de vários projetos');
        cy.get('input[type="date"]').type('2024-10-16');
        cy.get('#ativo').click();
        cy.get('.btn').click();
        cy.get('ul').children().last().invoke('text').should('have.string', 'Tech design');
    })

    it('Mensagem "não ativa" não deve ser visualizado por aluno', () => {
        cy.get('.btn-primary').click();
        cy.get('#titulo').type('Tech design');
        cy.get('#conteudo').type('Evento para apresentação de vários projetos');
        cy.get('input[type="date"]').type('2024-10-16');
        cy.get('.btn').click();
        cy.get('ul').children().should('have.length', 1);    
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