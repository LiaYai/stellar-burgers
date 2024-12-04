/// <reference types="cypress" />
describe('constructor page', function () {
  it('should intercept getIngredients request', () => {
    cy.intercept('GET', 'https://norma.nomoreparties.space/api/ingredients', {
      fixture: '../fixtures/ingredients.json'
    });
    cy.visit('http://localhost:4000');
  });

  describe('constructor burger', () => {
    beforeEach(() => {
      cy.visit('http://localhost:4000');
      cy.viewport(1920, 1080);
    });

    it('should add the bun, staffing and sause by click', () => {
      cy.contains('li', 'Краторная булка').find('button').click();
      //burger.get('span:contains("Краторная булка")').should('not.exist');
      // burger
      //   .get('span:contains("Флюоресцентная булка")')
      //   .its('length')
      //   .should('eq', 2);
      cy.contains('div', 'Начинки').click();
      cy.contains('li', 'Говяжий метеорит').find('button').click();
      cy.contains('li', 'Биокотлета из марсианской Магнолии')
        .find('button')
        .click();
      cy.contains('div', 'Булки').click();
      cy.contains('li', 'Флюоресцентная булка').find('button').click();
      // cy.contains('div', 'Соусы').click();
      // cy.contains('li', 'Соус фирменный').find('button').click();
    });
  });
});
