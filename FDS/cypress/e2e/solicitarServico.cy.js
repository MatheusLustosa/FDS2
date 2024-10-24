describe('Teste de solicitar serviços acadêmicos', () => {
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
        cy.get('[href="/nova-solicitacao/"]').click();
    })

    it('Solicitação feita corretamente', () => {
        cy.get('#matricula').type('0102');
        cy.get('#tipo_servico').select('Declaração de Matrícula');
        cy.get('#motivo').type('Estou cansado da turma B');
        cy.get('#descricao').type('Quero ver se convivo melhor com outras turmas');
        cy.get('button.btn').click()
        cy.get('tbody > :nth-child(1) > :nth-child(3)').invoke('text').should('have.string', 'Estou cansado da turma B');
    });

    it('Avisar que todas as entradas não foram preenchidas', () => {
        /*cy.get('#matricula').type('0102');
        cy.get('#tipo_servico').select('Declaração de Matrícula');
        cy.get('#motivo').type('Estou cansado da turma B');
        cy.get('#descricao').type('Quero ver se convivo melhor com outras turmas');*/
        cy.get('button.btn').click()
        // cy.get('.alert').should('be.visible');
    });
    
    // after(() => {
    //     cy.visit('/admin/');
    //     cy.get('#id_username').type('pedrogusmao');
    //     cy.get('#id_password').type('123');
    //     cy.get('.submit-row > input').click();
    //     cy.get('#auth-user > a').click();
    //     cy.get('#searchbar').type('0102');
    //     cy.get('#changelist-search > div > [type="submit"]').click();
    //     cy.get('.action-select').click();
    //     cy.get('select').select('Delete selected users');
    //     cy.get('.button').click();
    //     cy.get('div > [type="submit"]').click();
    // })

})