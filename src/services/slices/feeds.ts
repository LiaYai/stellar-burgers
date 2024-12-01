import { createSlice, createAsyncThunk, PayloadAction } from '@reduxjs/toolkit';
import {
  getFeedsApi,
  getOrderByNumberApi,
  TFeedsResponse,
  TOrderResponse
} from '@api';
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

export const getFeeds = createAsyncThunk('getFeed', getFeedsApi);

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
    getAllOrders: (state) => state.orders,
    getTotal: (state) => state.total,
    getTotalToday: (state) => state.totalToday,
    getSelectedOrder: (state) => state.selectedOrder
  },
  extraReducers: (builder) => {
    builder
      .addCase(
        getFeeds.fulfilled,
        (state, action: PayloadAction<TFeedsResponse>) => {
          state.orders = action.payload.orders;
          state.total = action.payload.total;
          state.totalToday = action.payload.totalToday;
        }
      )
      .addCase(
        getOrderByNumber.fulfilled,
        (state, action: PayloadAction<TOrderResponse>) => {
          state.selectedOrder = action.payload.orders[0];
        }
      );
  }
});

export const { getAllOrders, getTotal, getTotalToday, getSelectedOrder } =
  feedsSlice.selectors;
export const { clearSelectedOrder } = feedsSlice.actions;
export default feedsSlice.reducer;
