import { configureStore } from '@reduxjs/toolkit';
import newOrderSlice, {
  addIngredient,
  moveIngredient,
  removeIngredient,
  resetOrder,
  postOrder,
  getOrderIngredients,
  getOrderRequest,
  getOrderModalData
} from '../burger';
import { burgerIngredients, burgerMovedIngredients } from '../testsData';
import { TOrder } from '@utils-types';

describe('sliceBurger', () => {
  const initialState = {
    burgerIngredients: {
      bun: null,
      ingredients: []
    },
    orderRequest: false,
    orderModalData: null
  };

  const ingredientBun = {
    id: '111',
    _id: '643d69a5c3f7b9001cfa093c',
    name: 'Краторная булка N-200i',
    type: 'bun',
    proteins: 80,
    fat: 24,
    carbohydrates: 53,
    calories: 420,
    price: 1255,
    image: 'https://code.s3.yandex.net/react/code/bun-02.png',
    image_mobile: 'https://code.s3.yandex.net/react/code/bun-02-mobile.png',
    image_large: 'https://code.s3.yandex.net/react/code/bun-02-large.png'
  };

  const ingredientMain = {
    id: '222',
    _id: '643d69a5c3f7b9001cfa0941',
    name: 'Биокотлета из марсианской Магнолии',
    type: 'main',
    proteins: 420,
    fat: 142,
    carbohydrates: 242,
    calories: 4242,
    price: 424,
    image: 'https://code.s3.yandex.net/react/code/meat-01.png',
    image_mobile: 'https://code.s3.yandex.net/react/code/meat-01-mobile.png',
    image_large: 'https://code.s3.yandex.net/react/code/meat-01-large.png'
  };

  const orderData: TOrder = {
    _id: '12345',
    status: 'done',
    name: 'Флюоресцентный био-марсианский бургер',
    createdAt: '2024-12-02T22:47:00.263Z',
    updatedAt: '2024-12-02T22:47:01.031Z',
    number: 61352,
    ingredients: ['643d69a5c3f7b9001cfa0941', '643d69a5c3f7b9001cfa093c']
  };

  const burgerState = {
    burgerIngredients: {
      bun: ingredientBun,
      ingredients: [ingredientMain]
    },
    orderRequest: false,
    orderModalData: null
  };

  it('should return the initial state', () => {
    const state = newOrderSlice(undefined, { type: '' });
    expect(state).toEqual(initialState);
  });

  describe('actions', () => {
    it('should handle "addIngredient", add ingredient "bun"', () => {
      const state = newOrderSlice(initialState, {
        type: addIngredient.type,
        payload: ingredientBun
      });
      expect(state.burgerIngredients.bun).toEqual(ingredientBun);
      expect(state.burgerIngredients.ingredients).toEqual([]);
    });

    it('should handle "addIngredient", add ingredient "main"', () => {
      const state = newOrderSlice(initialState, {
        type: addIngredient.type,
        payload: ingredientMain
      });
      expect(state.burgerIngredients.bun).toEqual(null);
      expect(state.burgerIngredients.ingredients).toEqual([ingredientMain]);
    });

    it('should handle "moveIngredient"', () => {
      const movedBurgerState = {
        burgerIngredients: {
          bun: ingredientBun,
          ingredients: burgerIngredients
        },
        orderRequest: false,
        orderModalData: null
      };

      const state = newOrderSlice(movedBurgerState, {
        type: moveIngredient.type,
        payload: { from: 2, to: 3 }
      });

      expect(state.burgerIngredients.ingredients).toEqual(
        burgerMovedIngredients
      );
    });

    it('should handle "removeIngredient"', () => {
      const state = newOrderSlice(burgerState, {
        type: removeIngredient.type,
        payload: '222'
      });

      expect(state.burgerIngredients.ingredients).toEqual([]);
    });

    it('should handle "resetOrder"', () => {
      const state = newOrderSlice(burgerState, {
        type: resetOrder.type
      });
      expect(state).toEqual(initialState);
    });
  });

  describe('extraReducer "postOrder"', () => {
    it('should handle "postOrder" pending', () => {
      const state = newOrderSlice(burgerState, {
        type: postOrder.pending.type
      });
      expect(state.orderRequest).toBe(true);
    });

    it('should handle "postOrder" rejected', () => {
      const state = newOrderSlice(burgerState, {
        type: postOrder.rejected.type
      });
      expect(state.orderRequest).toBe(false);
    });

    it('should handle "postOrder" fulfilled', () => {
      const state = newOrderSlice(burgerState, {
        type: postOrder.fulfilled.type,
        payload: { order: orderData }
      });

      expect(state.orderRequest).toBe(false);
      expect(state.orderModalData).toEqual(orderData);
    });
  });

  describe('selectors', () => {
    const store = configureStore({
      reducer: {
        newOrder: newOrderSlice
      },
      preloadedState: {
        newOrder: burgerState
      }
    });

    it('should handle selector getBurgerIngredients', () => {
      const state = store.getState();
      const result = getOrderIngredients(state);
      expect(result).toEqual(burgerState.burgerIngredients);
    });

    it('should handle selector getOrderRequest', () => {
      const state = store.getState();
      const result = getOrderRequest(state);
      expect(result).toEqual(burgerState.orderRequest);
    });

    it('should handle selector getOrderModalData', () => {
      const state = store.getState();
      const result = getOrderModalData(state);
      expect(result).toEqual(burgerState.orderModalData);
    });
  });
});
