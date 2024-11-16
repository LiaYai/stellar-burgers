import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import { getFeedsApi } from '../utils/burger-api';
import { TOrder } from '@utils-types';

type TFeedsState = {
  orders: TOrder[];
  total: number;
  totalToday: number;
};

const initialState: TFeedsState = {
  orders: [],
  total: 0,
  totalToday: 0
};

export const getFeeds = createAsyncThunk(
  'getFeeds',
  async () => await getFeedsApi()
);

export const feedsSlice = createSlice({
  name: 'feeds',
  initialState,
  reducers: {},
  selectors: {
    selectAllOrders: (state) => state.orders,
    selectTotal: (state) => state.total,
    selectTotalToday: (state) => state.totalToday
  },
  extraReducers: (builder) => {
    builder.addCase(getFeeds.fulfilled, (state, action) => {
      state.orders = action.payload.orders;
      state.total = action.payload.total;
      state.totalToday = action.payload.totalToday;
    });
  }
});

export const { selectAllOrders, selectTotal, selectTotalToday } =
  feedsSlice.selectors;
export default feedsSlice.reducer;
