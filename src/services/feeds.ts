import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import { getFeedsApi, getOrderByNumberApi } from '../utils/burger-api';
import { TOrder } from '@utils-types';

type TFeedsState = {
  orders: TOrder[];
  total: number;
  totalToday: number;
  selectedOrder: TOrder | null;
};

const initialState: TFeedsState = {
  orders: [],
  total: 0,
  totalToday: 0,
  selectedOrder: null
};

export const getFeeds = createAsyncThunk(
  'getFeed',
  async () => await getFeedsApi()
);

export const getOrderByNumber = createAsyncThunk(
  'getOrderByNumber',
  async (number: number) => await getOrderByNumberApi(number)
);

export const feedsSlice = createSlice({
  name: 'feeds',
  initialState,
  reducers: {
    clearSelectedOrder: (state) => {
      state.selectedOrder = null;
    }
  },
  selectors: {
    selectAllOrders: (state) => state.orders,
    selectTotal: (state) => state.total,
    selectTotalToday: (state) => state.totalToday,
    selectOrder: (state) => state.selectedOrder
  },
  extraReducers: (builder) => {
    builder
      .addCase(getFeeds.fulfilled, (state, action) => {
        state.orders = action.payload.orders;
        state.total = action.payload.total;
        state.totalToday = action.payload.totalToday;
      })
      .addCase(getOrderByNumber.fulfilled, (state, action) => {
        state.selectedOrder = action.payload.orders[0];
      });
  }
});

export const { selectAllOrders, selectTotal, selectTotalToday, selectOrder } =
  feedsSlice.selectors;
export const { clearSelectedOrder } = feedsSlice.actions;
export default feedsSlice.reducer;
