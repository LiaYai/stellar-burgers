import { configureStore } from '@reduxjs/toolkit';
import feedsSlice, {
  clearSelectedOrder,
  getAllOrders,
  getFeeds,
  getOrderByNumber,
  getSelectedOrder,
  getTotal,
  getTotalToday
} from '../feeds';
import { feedsState } from '../testsData';

describe('sliceFeeds', () => {
  const initialState = {
    orders: [],
    total: 0,
    totalToday: 0,
    selectedOrder: null
  };

  describe('selectors', () => {
    const state = feedsState;
    const store = configureStore({
      reducer: {
        feeds: feedsSlice
      },
      preloadedState: {
        feeds: state
      }
    });

    it('should handle selector getAllOrders', () => {
      const result = getAllOrders(store.getState());
      expect(result).toEqual(state.orders);
    });

    it('should handle selector getTotal', () => {
      const result = getTotal(store.getState());
      expect(result).toEqual(state.total);
    });

    it('should handle selector getTotalToday', () => {
      const result = getTotalToday(store.getState());
      expect(result).toEqual(state.totalToday);
    });

    it('should handle selector getSelectedOrder', () => {
      const result = getSelectedOrder(store.getState());
      expect(result).toEqual(state.selectedOrder);
    });
  });

  describe('actions', () => {
    it('should handle action clearSelectedOrder', () => {
      const state = feedsSlice(feedsState, {
        type: clearSelectedOrder.type
      });
      expect(state.selectedOrder).toEqual(null);
    });
  });

  describe('extra reducers', () => {
    it('should handle action getFeeds', () => {
      const state = feedsSlice(initialState, {
        type: getFeeds.fulfilled.type,
        payload: {
          orders: feedsState.orders,
          total: feedsState.total,
          totalToday: feedsState.totalToday
        }
      });
      expect(state).toEqual({
        selectedOrder: null,
        orders: state.orders,
        total: state.total,
        totalToday: state.totalToday
      });
    });

    it('should handle action getOrderByNumber', () => {
      const state = feedsSlice(initialState, {
        type: getOrderByNumber.fulfilled.type,
        payload: { orders: [feedsState.orders[1]] }
      });

      expect(state.selectedOrder).toEqual(feedsState.orders[1]);
    });
  });
});
