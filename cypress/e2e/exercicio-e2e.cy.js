/// <reference types="cypress"/>
import produtosPage from "../support/page_objects/produtos.page";

context('Exercicio - Testes End-to-end - Fluxo de pedido', () => {
  /*  Como cliente 
      Quero acessar a Loja EBAC 
      Para fazer um pedido de 4 produtos 
      Fazendo a escolha dos produtos
      Adicionando ao carrinho
      Preenchendo todas opções no checkout
      E validando minha compra ao final */

  beforeEach(() => {
      produtosPage.visitarUrl()
  });

  it('Deve fazer um pedido na loja Ebac Shop de ponta a ponta', () => {
     produtosPage.buscarProdutoLista('Ariel Roll Sleeve Sweatshirt')
     cy.get('#tab-title-description > a').should('contain', 'Descrição')


})

it('Deve buscar um produto com sucesso', () => {
    produtosPage.buscarProduto('Atlas Fitness Tank')
    cy.get('.product_title').should('contain' , 'Atlas Fitness Tank' )
    
});

it('deve visitar a pagina do produto', () => {
    produtosPage.visitarProduto('Argus All-Weather Tank')
    cy.get('.product_title').should('contain' ,  'Argus All-Weather Tank')
    
});

it.only('deve adicionar 4 produtos no carrinho e finalizar a compra', () => {
    //produto 1
    produtosPage.buscarProduto('Ariel Roll Sleeve Sweatshirt')
    produtosPage.addProdutoCarrinho('XS', 'Red', 1)
    cy.get('.woocommerce-message').should('contain', '“Ariel Roll Sleeve Sweatshirt” foi adicionado no seu carrinho.')
    

    //produto 2
    produtosPage.buscarProduto('Ajax Full-Zip Sweatshirt')
    produtosPage.addProdutoCarrinho('S', 'Blue', 1)
    cy.get('.woocommerce-message').should('contain', '“Ajax Full-Zip Sweatshirt” foi adicionado no seu carrinho.')

     

    //produto 3
    produtosPage.buscarProduto('Atlas Fitness Tank')
    produtosPage.addProdutoCarrinho('XL', 'Blue', 2)
    cy.get('.woocommerce-message').should('contain', '2 × “Atlas Fitness Tank” foram adicionados no seu carrinho.')
    


    //produto 4
    produtosPage.buscarProduto('Balboa Persistence Tee')
    produtosPage.addProdutoCarrinho('M', 'Green', 1)
    cy.get('.woocommerce-message').should('contain', '“Balboa Persistence Tee” foi adicionado no seu carrinho.')
    
    //ir para o carrinho e ir para checkout
    cy.get('.woocommerce-message > .button').click()
    cy.get('.checkout-button').click()
    cy.get('.woocommerce-billing-fields > h3').should('contain', 'Detalhes de faturamento')

    //prencher checkout
    cy.get('#billing_first_name').type('Vagner')
    cy.get('#billing_last_name').type('lima')
    cy.get('#billing_address_1').type('rua teste 2025')
    cy.get('#billing_city').type('Santo andré')
    cy.get('#billing_postcode').type('01001000')
    cy.get('#billing_phone').type('11999999999')
    cy.get('#billing_email').type('vagner@teste.com')

    //finalizar compra
    cy.get('#payment_method_cod').check()
    cy.get('#terms').check()
    cy.get('#place_order').click()

    //Validar confirmação da compra
    cy.contains('Obrigado. Seu pedido foi recebido.', { timeout: 10000 })
  .should('be.visible')






 


    
})

})