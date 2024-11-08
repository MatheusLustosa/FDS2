describe('Teste de aluno visualizar horários das disciplinas', () => {
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
        cy.get('form > :nth-child(2) > input').type('1234');
        cy.get(':nth-child(3) > input').type('Peterson');
        cy.get(':nth-child(4) > input').type('70');
        cy.get(':nth-child(5) > select').select('Professor');
        cy.get(':nth-child(6) > input').type('Direito');
        cy.get(':nth-child(7) > input').type('Av. Norte 463');
        cy.get(':nth-child(8) > select').select('2024.1');
        cy.get(':nth-child(9) > input').type('123');
        cy.get(':nth-child(10) > input').type('123');
        cy.get('button').click()
    })

    beforeEach(() => {
        cy.visit('/');
        cy.get('form > :nth-child(2) > input').type('1234');
        cy.get(':nth-child(3) > input').type('123');
        cy.get('button').click();
        cy.get('#menu-toggle').click();
        cy.get('[href="/materias/"]').click();
    })

    it('Visualizar horário com sucesso', () => {
        cy.get(':nth-child(1) > div > .btn-info').click();
        cy.get('#dia').type('segunda e quarta');
        cy.get('#hora_inicio').type('08:15');
        cy.get('#hora_fim').type('10:00');
        cy.get('.btn').click();
        cy.get(':nth-child(1) > ul').children().last().invoke('text').should('have.string', 'segunda e quarta');
    })

    it('Avisar que todas as entradas não foram preenchidas', () => {
        cy.get(':nth-child(1) > div > .btn-info').click();
        cy.get('.btn').click();
        cy.get('.alert').should('be.visible')
    })

    after(() => {
        cy.visit('/admin/');
        cy.get('#id_username').type('pedrogusmao');
        cy.get('#id_password').type('123');
        cy.get('.submit-row > input').click();
        cy.get('#auth-user > a').click();
        cy.get('#searchbar').type('1234');
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