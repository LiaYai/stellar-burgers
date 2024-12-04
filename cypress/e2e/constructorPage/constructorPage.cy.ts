/// <reference types="cypress" />
import { ingredients } from 'cypress/fixtures/ingredients';
describe('проверяем доступность приложения', function () {
  beforeEach(() => {});

  it('сервис должен быть доступен по адресу localhost:4000', () => {
    cy.intercept('GET', 'https://norma.nomoreparties.space/api/ingredients', {
      fixture: ingredients
    });
    //cy.wait('@getIngredients');
    cy.visit('http://localhost:4000');

    //cy.log(@getIngredients.response.body);
  });

  // it('после клика должен срабатывать alert', () => {
  //   const button = cy.get(`[data-cy='order-button']`);
  //   button.contains('Оформить заказ');
  //   button.click();
  //   window.alert('Выберите ингредиенты');
  // });

  // it('клик на ингредиент должен добавлять его в конструктор', () => {
  //   cy.get('Добавить').click();
  // });
});
