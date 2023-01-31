/// <reference types="cypress" />
import Produto from '../support/page_objects/nome-funcionliada.page'
const dadosProdutos = require('../fixtures/produtos.json')
const faker = require('faker')
faker.locale = 'pt_BR'

context('Exercicio - Testes End-to-end - Fluxo de pedido', () => {
    const user = {}
    let meuPais = "Brasil"
    user.nome = faker.name.firstName()
    user.sobrenome = faker.name.lastName()
    user.pais = faker.address.country()
    user.endereco = faker.address.streetName()
    user.cidade = faker.address.city()
    user.estado = faker.address.stateAbbr()
    user.cep = faker.address.zipCode()
    user.telefone = faker.phone.phoneNumber()
    user.email = faker.internet.email()


    /*  Como cliente 
            Quero acessar a Loja EBAC 
            Para fazer um pedido de 4 produtos 
            Fazendo a escolha dos produtos
            Adicionando ao carrinho
            Preenchendo todas opções no checkout
            E validando minha compra ao final */

    beforeEach(() => {
        cy.visit('minha-conta')



        cy.fixture('perfil').then(perfil => {
            cy.login(perfil.usuario, perfil.senha)
        })

    })

    it('Deve fazer um pedido na loja Ebac Shop de ponta a ponta', () => {
        //TODO
        Produto.ecolherProduto(
            dadosProdutos[0].produto,
            dadosProdutos[0].tamanho,
            dadosProdutos[0].cor,
            dadosProdutos[0].quantidade
        )
        // cy.get('#primary-menu > .active > a').click()
        Produto.ecolherProduto(
            dadosProdutos[1].produto,
            dadosProdutos[1].tamanho,
            dadosProdutos[1].cor,
            dadosProdutos[1].quantidade
        )
        cy.carrinho()


        cy.checkoutt(
            user.nome, user.sobrenome, 'Brasil', user.endereco, user.cidade, user.estado,
            user.cep, user.telefone, user.email
        )
    })
})
