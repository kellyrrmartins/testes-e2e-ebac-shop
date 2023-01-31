const user = {}

Cypress.Commands.add('login', (usuario, senha) => {
    cy.get('#username').type(usuario)
    cy.get('#password').type(senha, { log: false })
    cy.get('.woocommerce-form > .button').click()
});
/* Cypress.Commands.add('addProdutos', (produto, tamanho, cor, quantidade) => {
    cy.get('[class="product-block grid"]').contains(produto).click()
    cy.get('.button-variable-item-' + tamanho).click()
    cy.get('.button-variable-item-' + cor).click()
    cy.get('.input-text').clear().type(quantidade)
}) */
Cypress.Commands.add('carrinho', () => {
    cy.get('.woocommerce-message > .button').click()
    cy.get('.checkout-button').click()
    cy.get('.dropdown-toggle > .mini-cart-items').should('contain', 4)

})
Cypress.Commands.add('checkoutt', (nome, sobrenome, pais, endereco, cidade, estado, cep, telefone, email) => {
    cy.get('#billing_first_name').clear().type(nome)
    cy.get('#billing_last_name').clear().type(sobrenome)
    cy.get('#billing_company').clear().type('{backspace}')
    cy.get('#select2-billing_country-container')
        .click()
        .type(pais)
        .get('[aria-selected="true"]')
        .click()

    cy.get('#billing_address_1').clear().type(endereco)
    cy.get('#billing_address_2').clear().type('{backspace}')
    cy.get('#billing_city').clear().type(cidade)
    cy.get('#billing_city').click().type(estado, '{enter}')
    cy.get('#billing_postcode').clear().type(cep)
    cy.get('#billing_phone').clear().type(telefone)
    cy.get('#billing_email').clear().type(email)
    cy.get('#order_comments').focus().blur()
    cy.get('#payment_method_bacs').should('be.visible').click()
    cy.get('#terms').should('be.visible').click()
    cy.get('#place_order').click()
    cy.get('.woocommerce-notice').should('contain', 'Obrigado. Seu pedido foi recebido.')

})