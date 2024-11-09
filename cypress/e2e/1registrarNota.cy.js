describe('Teste de registrar nota dos alunos e consultar notas', () => {
    describe('Teste - Professor', () => {

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
        cy.get('#menu-toggle').click();
        cy.get('[href="/materias/"]').click();
    })

    it('Informar erro ao inserir nota maior que 10 ', () => {
        cy.get(':nth-child(1) > .card > .card-body > div > .btn-success').click();
        cy.get('#aluno').select('Pedro');
        cy.get('#nota').type(-1);
        cy.get('.btn').click();
        cy.get('.alert').should('be.visible');

    })

    it('Informar erro ao inserir nota menor que 0 ', () => {
        cy.get(':nth-child(1) > .card > .card-body > div > .btn-success').click();
        cy.get('#aluno').select('Pedro');
        cy.get('#nota').type(11);
        cy.get('.btn').click();
        cy.get('.alert').should('be.visible');
    })

    it('Professor registrar nota com suscesso', () => {
        let arr = [7.2, 9.8, 9.4, 9.5, 8.7, 7.1];
        for (let i = 1; i <= 6; i++) { 
            cy.get(`:nth-child(${i}) > .card > .card-body > div > .btn-success`).click();
            cy.get('#aluno').select('Pedro');
            cy.get('#nota').type(arr[i-1]);
            cy.get('.btn').click();
        }
    })

    })

    describe('Teste - Aluno', () => {
    it('aluno consultar nota com sucesso' ,() => {
        cy.visit('/');
        cy.get('form > :nth-child(2) > input').type('0102');
        cy.get('form > :nth-child(3) > input').type('123');
        cy.get('button').click();
        cy.get('#menu-toggle').click();
        cy.get('[href="/materias/"]').click();
        cy.get('tbody > :nth-child(1) > :nth-child(2)').should('be.visible');
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
})
