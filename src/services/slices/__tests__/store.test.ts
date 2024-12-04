import { rootReducer } from '../../store';

describe('rootReducer', () => {
  const rootReducerInitialState = {
    ingredients: {
      ingredients: [],
      isLoading: false
    },
    feeds: {
      orders: [],
      total: 0,
      totalToday: 0,
      selectedOrder: null
    },
    orders: {
      orders: [],
      isLoading: false
    },
    newOrder: {
      burgerIngredients: {
        bun: null,
        ingredients: []
      },
      orderRequest: false,
      orderModalData: null
    },
    user: {
      user: null,
      isLoading: false
    }
  };

  it('should return the initial state', () => {
    const state = rootReducer(undefined, { type: '' });
    expect(state).toEqual(rootReducerInitialState);
  });
});
