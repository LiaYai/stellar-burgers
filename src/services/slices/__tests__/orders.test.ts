import { configureStore } from '@reduxjs/toolkit';
import ordersSlice, { getOrders } from '../orders';
import { orders } from '../testsData';

const allOrdersData = orders;

describe('sliceOrders', () => {
  const initialState = {
    orders: [],
    isLoading: false
  };

  it('should return the initial state', () => {
    const state = ordersSlice(undefined, { type: '' });
    expect(state).toEqual(initialState);
  });

  describe('selectors', () => {
    const state = {
      orders: allOrdersData,
      isLoading: false
    };
    const store = configureStore({
      reducer: {
        orders: ordersSlice
      },
      preloadedState: {
        orders: state
      }
    });

    it('should handle selector getUserOrders', () => {
      const result = store.getState().orders.orders;
      expect(result).toEqual(allOrdersData);
    });

    it('should handle selector getOrdersIsLoading', () => {
      const result = store.getState().orders.isLoading;
      expect(result).toEqual(false);
    });
  });

  describe('extra reducer getOrders', () => {
    it('should handle action getOrders fulfilled', () => {
      const state = ordersSlice(initialState, {
        type: getOrders.fulfilled.type,
        payload: allOrdersData
      });
      const { orders, isLoading } = state;
      expect(orders).toEqual(allOrdersData);
      expect(isLoading).toEqual(false);
    });

    it('should handle action getOrders pending', () => {
      const state = ordersSlice(initialState, {
        type: getOrders.pending.type
      });
      const { orders, isLoading } = state;
      expect(orders).toEqual([]);
      expect(isLoading).toEqual(true);
    });

    it('should handle action getOrders rejected', () => {
      const state = ordersSlice(initialState, {
        type: getOrders.rejected.type
      });
      const { orders, isLoading } = state;
      expect(orders).toEqual([]);
      expect(isLoading).toEqual(false);
    });
  });
});
