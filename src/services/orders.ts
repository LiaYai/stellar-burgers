import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import { TOrder } from '@utils-types';
import { getOrdersApi } from '@api';

type TOrdersState = {
  orders: TOrder[];
};

const initialState: TOrdersState = {
  orders: []
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
    selectUserOrders: (state) => state.orders
  },
  extraReducers: (builder) => {
    builder.addCase(getOrders.fulfilled, (state, action) => {
      state.orders = action.payload;
    });
  }
});

export const { selectUserOrders } = ordersSlice.selectors;
export default ordersSlice.reducer;
