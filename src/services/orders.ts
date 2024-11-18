import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import { TOrder } from '@utils-types';
import { getOrdersApi } from '@api';

type TOrdersState = {
  orders: TOrder[];
  isLoading: boolean;
};

const initialState: TOrdersState = {
  orders: [],
  isLoading: false
};

export const getOrders = createAsyncThunk(
  'orders/getAll',
  async () => await getOrdersApi()
);

export const ordersSlice = createSlice({
  name: 'orders',
  initialState,
  reducers: {},
  selectors: {
    selectUserOrders: (state) => state.orders,
    selectIsOrdersLoading: (state) => state.isLoading
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

export const { selectUserOrders, selectIsOrdersLoading } =
  ordersSlice.selectors;
export default ordersSlice.reducer;
