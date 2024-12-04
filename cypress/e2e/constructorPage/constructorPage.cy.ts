import { ceil, head } from 'cypress/types/lodash';

describe('constructor page', function () {
  beforeEach(() => {
    // Подменяем запрос на ингридиенты
    cy.intercept('GET', 'https://norma.nomoreparties.space/api/ingredients', {
      fixture: '../fixtures/ingredients.json'
    });
    cy.visit('/');
    cy.viewport(1920, 1080);
  });

  // Проверка выбора ингридиентов
  describe('constructor burger', () => {
    it('should add the bun, staffing and sause by click', () => {
      // Выбрали одну булку.
      // Почему-то data-cy для section для конструктора и для ингридиентов не всегда срабатывала, поэтому так:
      cy.contains('li', 'Краторная булка').find('button').click();

      // Переключились на начинки, выбрали
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

  // Проверяем попап ингридиента
  describe('ingredients popup', () => {
    it('should open ingredients popup', () => {
      cy.contains('li', 'Филе Люминесцентного тетраодонтимформа').click();

      // Должен быть заголовок, данные этого ингридиента и кнопка закрытия
      cy.contains('h3', 'Детали ингредиента').should('exist');
      cy.get("[data-cy='close-modal'").should('exist');
      cy.contains('div', 'Филе Люминесцентного тетраодонтимформа').should(
        'exist'
      );
    });

    it('should close ingredients popup by click', () => {
      cy.contains('li', 'Филе Люминесцентного тетраодонтимформа').click();
      cy.get('[data-cy="close-modal"]').click();
      cy.contains('h3', 'Детали ингредиента').should('not.exist');
    });

    it('should close ingredients popup by escape', () => {
      cy.contains('li', 'Филе Люминесцентного тетраодонтимформа').click();
      cy.get('body').type('{esc}');
      cy.contains('h3', 'Детали ингредиента').should('not.exist');
    });

    it('should close ingredients popup by click outside', () => {
      cy.contains('li', 'Филе Люминесцентного тетраодонтимформа').click();
      cy.get('body').click(0, 0);
      cy.contains('h3', 'Детали ингредиента').should('not.exist');
    });
  });

  // Проверяем создание заказа
  describe('constructor order', () => {
    this.beforeEach(() => {
      // Подменяем запрос пользователя
      cy.intercept('GET', 'https://norma.nomoreparties.space/api/auth/user', {
        fixture: '../fixtures/user.json'
      }).as('userAuth');

      // Подменяем отправку заказа
      cy.intercept('POST', 'https://norma.nomoreparties.space/api/orders', {
        fixture: '../fixtures/order.json'
      });

      // Подставляем фейковые токены
      cy.setCookie('accessToken', 'someAccessToken');
      window.localStorage.setItem('refreshToken', 'someRefreshToken');
    });
    it('should create a new order', () => {
      // Создаем заказ
      cy.contains('li', 'Краторная булка').find('button').click();
      cy.contains('li', 'Соус фирменный').find('button').click();
      cy.contains('li', 'Биокотлета из марсианской Магнолии')
        .find('button')
        .click();
      cy.contains('button', 'Оформить заказ').click();
      cy.contains('button', 'Оформить заказ').click();

      // Проверяем, что заказ создан - появляется номер заказа
      cy.contains('p', 'Ваш заказ начали готовить').should('exist');
      cy.contains('h2', '61466').should('exist');

      // Закрывваем модалку
      cy.get('[data-cy="close-modal"]').click();
      cy.contains('h2', '61466').should('not.exist');

      // Проверяем, что констуктор очистился
      cy.contains('span', 'Краторная булка').should('not.exist');
      cy.contains('span', 'Соус фирменный').should('not.exist');
      cy.contains('span', 'Биокотлета из марсианской Магнолии').should(
        'not.exist'
      );
    });

    this.afterEach(() => {
      // Удаляем фейковые токены
      cy.clearCookie('accessToken');
      window.localStorage.removeItem('refreshToken');
    });
  });
});
