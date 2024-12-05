import { configureStore } from '@reduxjs/toolkit';
import ingredientsSlice, {
  getIngredients,
  getAllIngredients,
  getIngredientsIsLoading
} from '../ingredients';
import { allIngredientsData } from '../testsData';

describe('sliceIngredients', () => {
  const initialState = {
    ingredients: [],
    isLoading: false
  };

  describe('selectors', () => {
    const state = {
      ingredients: allIngredientsData,
      isLoading: false
    };
    const store = configureStore({
      reducer: {
        ingredients: ingredientsSlice
      },
      preloadedState: {
        ingredients: state
      }
    });

    it('should handle selector getAllIngredients', () => {
      const result = getAllIngredients(store.getState());
      expect(result).toEqual(allIngredientsData);
    });

    it('should handle selector getIngredientsIsLoading', () => {
      const result = getIngredientsIsLoading(store.getState());
      expect(result).toBe(false);
    });
  });

  describe('extra reducer getIngredients', () => {
    it('should "getIngredients" with resolved', () => {
      const data = allIngredientsData;
      const state = ingredientsSlice(initialState, {
        type: getIngredients.fulfilled.type,
        payload: data
      });
      expect(state.isLoading).toBe(false);
      expect(state.ingredients).toEqual(data);
    });

    it('should handle "getIngredients" pending', () => {
      const state = ingredientsSlice(initialState, {
        type: getIngredients.pending.type
      });
      expect(state.isLoading).toBe(true);
      expect(state.ingredients).toEqual([]);
    });

    it('should handle "getIngredients" rejected', () => {
      const state = ingredientsSlice(initialState, {
        type: getIngredients.rejected.type
      });
      expect(state.isLoading).toBe(false);
      expect(state.ingredients).toEqual([]);
    });

    it('should handle "getIngredients" fulfilled', () => {
      const state = ingredientsSlice(initialState, {
        type: getIngredients.fulfilled.type,
        payload: allIngredientsData
      });
      expect(state.isLoading).toBe(false);
      expect(state.ingredients).toEqual(allIngredientsData);
    });
  });
});
