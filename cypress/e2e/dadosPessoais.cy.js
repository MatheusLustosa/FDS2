/*describe('Test Suite - Setup and Tests', () => {
        before(() => {
          // Renomeia o banco de dados existente, se houver
          cy.exec('if [ -f db.sqlite3 ]; then mv db.sqlite3 db_backup.sqlite3; fi', { failOnNonZeroExit: false });
          cy.exec("cd ..", { failOnNonZeroExit: false }); // Sobe um diretório
          cy.exec("cd ..", { failOnNonZeroExit: false }); // Sobe um diretório
          cy.exec("rm db.sqlite3", { failOnNonZeroExit: false }); // Remove banco de dados existente
          cy.exec("python3 manage.py makemigrations", { failOnNonZeroExit: false }); // Executa migração do banco de dados
          cy.exec("python3 manage.py migrate", { failOnNonZeroExit: false }); // Executa migração do banco de dados
        });
});*/

describe('Teste de dados pessoais', () => {

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
        cy.get('form > :nth-child(2) > input').type('0102');
        cy.get(':nth-child(3) > input').type('123');
        cy.get('button').click();
        cy.get('#menu-toggle').click();
        cy.get('[href="/usuario/"]').click();
    })

    it('Retornar dados do aluno', () => {
        cy.get('#matricula').type('0102');
        cy.get('.btn-custom').click();
        cy.get('#page-content-wrapper > :nth-child(2) > :nth-child(3)').should('be.visible');
        cy.get('ul').children().should('be.visible');

    })

    it('Informar erro ao digitar matrícula errada', () => {
        cy.get('#matricula').type('01023');
        cy.get('.btn-custom').click();
        cy.get('.alert').invoke('text').should('have.string','Por favor, insira uma matrícula válida.');
    })

    it('Impedir que alunos vejam dados de outros alunos', () => {
        cy.get('#matricula').type('1234');
        cy.get('.btn-custom').click();
        cy.get('.alert').invoke('text').should('have.string','Por favor, insira uma matrícula válida.');
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

    after(() => {
        cy.visit('/admin/');
        cy.get('#auth-user > a').click();
        cy.get('#searchbar').type('1234');
        cy.get('#changelist-search > div > [type="submit"]').click();
        cy.get('.action-select').click();
        cy.get('select').select('Delete selected users');
        cy.get('.button').click();
        cy.get('div > [type="submit"]').click();
    })

    /*after(() => {
            // Remove o banco de dados de testes
            cy.exec("rm db.sqlite3", { failOnNonZeroExit: false });
            // Restaura o banco de dados original, se houver
            cy.exec('if [ -f db_backup.sqlite3 ]; then mv db_backup.sqlite3 db.sqlite3; fi', { failOnNonZeroExit: false });
    });*/
})