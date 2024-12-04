describe('constructor page', function () {
  beforeEach(() => {
    cy.intercept('GET', 'https://norma.nomoreparties.space/api/ingredients', {
      fixture: '../fixtures/ingredients.json'
    });
    cy.visit('http://localhost:4000');
    cy.viewport(1920, 1080);
  });

  describe('constructor burger', () => {
    it('should add the bun, staffing and sause by click', () => {
      //Выбрали одну булку
      cy.contains('li', 'Краторная булка').find('button').click();

      //Переключились на начинки, выбрали
      cy.contains('div', 'Начинки').click();
      cy.contains('li', 'Говяжий метеорит').find('button').click();
      cy.contains('li', 'Биокотлета из марсианской Магнолии')
        .find('button')
        .click();

      // Переключились на соусы, выбрали
      cy.contains('div', 'Соусы').click();
      cy.contains('li', 'Соус фирменный').find('button').click();

      // Переключились снова на булки, перевыбрали булку
      cy.contains('div', 'Булки').click();
      cy.contains('li', 'Флюоресцентная булка').find('button').click();

      // Первой булки нет в бургере
      cy.contains('span', 'Краторная булка').should('not.exist');

      // Вторая булка, начинка и соус есть в бургере
      cy.contains('span', 'Флюоресцентная булка').should('exist');
      cy.contains('span', 'Говяжий метеорит').should('exist');
      cy.contains('span', 'Соус фирменный').should('exist');
      cy.contains('span', 'Биокотлета из марсианской Магнолии').should('exist');
    });
  });
});
