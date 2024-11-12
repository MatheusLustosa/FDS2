describe('Teste de aluno visualizar informações dos professores', () => {
    describe('Professor criar avisos', () => {

    before(() => {
        cy.exec('python create_superuser.py');
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
        cy.get('form > :nth-child(3) > input').type('123');
        cy.get('button').click();
    })

    it('Visualizar todos os campos de um aviso registrado', () => {
        cy.get('.btn-primary').click();
        cy.get('#titulo').type('Tech design');
        cy.get('#conteudo').type('Evento para apresentação de vários projetos');
        cy.get('input[type="date"]').type('2024-10-16');
        cy.get('#ativo').click();
        cy.get('.btn').click();
        cy.get('.overflow-auto').children().last().invoke('text').should('have.string', 'Tech design');
    })

    it('Mensagem "não ativa" não deve ser visualizado por aluno', () => {
        cy.get('.btn-primary').click();
        cy.get('#titulo').type('Tech design');
        cy.get('#conteudo').type('Evento para apresentação de vários projetos');
        cy.get('input[type="date"]').type('2024-10-16');
        cy.get('.btn').click();
        cy.get('.overflow-auto').children().should('have.length', 1);    
    })

    it('Editar um aviso acadêmico registrado', () => {
        cy.get('a[href*="editar_aviso"]').first().click();  
        cy.get('#titulo').should('have.value', 'Tech design');
        cy.get('#conteudo').should('have.value', 'Evento para apresentação de vários projetos');
        cy.get('#titulo').clear().type('Tech Design - Novo Evento');
        cy.get('#conteudo').clear().type('Novo evento para mostrar novas ideias e projetos');
        cy.get('input[type="date"]').clear().type('2024-11-16'); 
        cy.get('.btn-success').click();

        cy.get('.overflow-auto').children().last().invoke('text').should('include', 'Tech Design - Novo Evento');
        cy.get('.overflow-auto').children().last().invoke('text').should('include', 'Novo evento para mostrar novas ideias e projetos');
        cy.get('.overflow-auto').children().last().invoke('text').should('contain', '2024');
        cy.get('.overflow-auto').children().last().invoke('text').should('not.contain', 'Inativo'); 
    });

    it('Deve excluir um aviso', () => {
        cy.on('window:confirm', (text) => {
            expect(text).to.contains('Tem certeza de que deseja excluir este aviso?');
            return true; });
        cy.get('a[href*="excluir_aviso"]').first().click();
        cy.get('.overflow-auto').children().should('not.contain', 'Tech Design - Novo Evento');  
    });

    });

    describe('Aluno visualizar avisos', () => {
        it('Aluno visualizar campos de um aviso registrado', () => {
            cy.visit('/');
            cy.get('form > :nth-child(2) > input').type('1212');
            cy.get('form > :nth-child(3) > input').type('123');
            cy.get('button').click();
            cy.get('.btn-primary').click();
            cy.get('#titulo').type('Tech design');
            cy.get('#conteudo').type('Evento para apresentação de vários projetos');
            cy.get('input[type="date"]').type('2024-10-16');
            cy.get('#ativo').click();
            cy.get('.btn').click();
            cy.visit('/');
            cy.get('form > :nth-child(2) > input').type('0102');
            cy.get('form > :nth-child(3) > input').type('123');
            cy.get('button').click();
            cy.get('.overflow-auto').children().last().invoke('text').should('have.string', 'Tech design');
        });
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
