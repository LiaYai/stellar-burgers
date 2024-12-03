import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import { TOrder } from '@utils-types';
import { getOrdersApi } from '../../utils/burger-api';

type TOrdersState = {
  orders: TOrder[];
  isLoading: boolean;
};

const initialState: TOrdersState = {
  orders: [],
  isLoading: false
};

export const getOrders = createAsyncThunk('orders/getAll', getOrdersApi);

export const ordersSlice = createSlice({
  name: 'orders',
  initialState,
  reducers: {},
  selectors: {
    getUserOrders: (state) => state.orders,
    getOrdersIsLoading: (state) => state.isLoading
  },
  extraReducers: (builder) => {
    builder
      .addCase(getOrders.pending, (state) => {
        state.isLoading = true;
      })
      .addCase(getOrders.rejected, (state) => {
        state.isLoading = false;
      })
      .addCase(getOrders.fulfilled, (state, action) => {
        state.isLoading = false;
        state.orders = action.payload;
      });
  }
});

export const { getUserOrders, getOrdersIsLoading } = ordersSlice.selectors;
export default ordersSlice.reducer;
