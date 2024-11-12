describe('Teste de aluno visualizar horários das disciplinas', () => {
    describe('Professor criar horários', () => {

    before(() => {
        cy.exec('python create_superuser.py');
    })

    before(() => {
        const nomes = ['FDS', 'Logica para computação', 'IHC', 'Fundamentos de projetos: Gestão de projetos', 'PIF', 'Projeto 2']
        cy.visit('/admin/');
        cy.get('#id_username').type('pedrogusmao');
        cy.get('#id_password').type('123');
        cy.get('.submit-row > input').click();
        cy.get('#usuarios-materia > a').click();

        for (let i = 0; i < 6; i++) {
            cy.get('li > .addlink').click();
            cy.get('#id_nome').type(nomes[i]);
            cy.get('#id_descricao').type('nada');
            cy.get('.default').click();
        } 
    })
    
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
        cy.get('form > :nth-child(3) > input').type('123');
        cy.get('button').click();
        cy.get('#menu-toggle').click();
        cy.get('[href="/materias/"]').click();
    })

    it('Cadastrar horários com sucesso', () => {
        cy.get(':nth-child(1) > .card > .card-body > div > .btn-info').click();
        cy.get('#dia').type('segunda e quarta');
        cy.get('#hora_inicio').type('08:15');
        cy.get('#hora_fim').type('10:00');
        cy.get('.btn').click();
        cy.get(':nth-child(1) > .card > .card-body > ul').children().last().invoke('text').should('have.string', 'segunda e quarta');
    })

    it('Avisar que todas as entradas não foram preenchidas', () => {
        cy.get(':nth-child(1) > .card > .card-body > div > .btn-info').click();
        cy.get('.btn').click();
        cy.get('.alert').should('be.visible');
    })

    });

    describe('Aluno visualizar horários', () => {

    it('Visualizar horário com sucesso', () => {
        cy.visit('/');
        cy.get('form > :nth-child(2) > input').type('0102');
        cy.get('form > :nth-child(3) > input').type('123');
        cy.get('button').click();
        cy.get('#menu-toggle').click();
        cy.get('[href="/materias/"]').click();
        cy.get(':nth-child(1) > .card > .card-body > ul').children().last().invoke('text').should('have.string', 'segunda e quarta');
    })

    });

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
