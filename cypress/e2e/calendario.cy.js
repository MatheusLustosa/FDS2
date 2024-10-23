let data = '2024-10-26';

describe('Teste de calendário acadêmico', () => {
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

    beforeEach(() => {
        cy.visit('/');
        cy.get('form > :nth-child(2) > input').type('0102');
        cy.get(':nth-child(3) > input').type('123');
        cy.get('button').click();
        cy.get('#menu-toggle').click();
        cy.get('[href="/calendario/10/2024/"]').click();
    })

    it('Evento aparece no dia que foi registrado pelo usuário', () => {
        cy.get('#data').type(data)
        //const dia = Number(data.split('/')[0])
        cy.get('#descricao').type('Entrega 3 FDS')
        cy.get('#entrada > button').click()

        //let evento = cy.get(`:nth-child(${(dia+8)})`).find('#descricao_evento').last()
        //cy.get(evento).invoke('text').should(evento => expect(evento).to.eq('Entrega 3 FDS'))
        cy.get(':nth-child(34)').children().last().invoke('text').should('have.string', 'Entrega 3 FDS')


    })

    after(() => {
        cy.visit('/admin/');
        cy.get('#id_username').type('pedrogusmao');
        cy.get('#id_password').type('123');
        cy.get('.submit-row > input').click();
        cy.get('#auth-user > a').click();
        cy.get('#searchbar').type('0102');
        cy.get('#changelist-search > div > [type="submit"]').click();
        cy.get('.action-select').click();
        cy.get('select').select('Delete selected users');
        cy.get('.button').click();
        cy.get('div > [type="submit"]').click();
    })
})