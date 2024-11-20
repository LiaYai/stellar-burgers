import {
  TConstructorIngredient,
  TIngredient,
  TOrder,
  TBurger
} from '@utils-types';
import { orderBurgerApi } from '@api';
import {
  createAsyncThunk,
  createSlice,
  nanoid,
  PayloadAction
} from '@reduxjs/toolkit';

export type TOrderState = {
  burgerIngredients: TBurger;
  orderRequest: boolean;
  orderModalData: TOrder | null;
};

const initialState: TOrderState = {
  burgerIngredients: {
    bun: null,
    ingredients: []
  },
  orderRequest: false,
  orderModalData: null
};

export const postOrder = createAsyncThunk(
  'newOrder',
  async (data: string[]) => await orderBurgerApi(data)
);

export const newOrderSlice = createSlice({
  name: 'newOrder',
  initialState,
  reducers: {
    addIngredient: {
      reducer: (state, action: PayloadAction<TConstructorIngredient>) => {
        action.payload.type === 'bun'
          ? (state.burgerIngredients.bun = action.payload)
          : state.burgerIngredients.ingredients.push(action.payload);
      },
      prepare: (data: TIngredient) => {
        const id = nanoid();
        return { payload: { ...data, id } };
      }
    },
    moveIngredient: (
      state,
      action: PayloadAction<{ from: number; to: number }>
    ) => {
      const { from, to } = action.payload;
      state.burgerIngredients.ingredients.splice(
        to,
        0,
        state.burgerIngredients.ingredients.splice(from, 1)[0]
      );
    },
    removeIngredient: (state, action: PayloadAction<string>) => {
      state.burgerIngredients.ingredients =
        state.burgerIngredients.ingredients.filter(
          (item) => item.id !== action.payload
        );
    },
    resetOrder: () => initialState
  },
  selectors: {
    getOrderIngredients: (state) => state.burgerIngredients,
    getOrderRequest: (state) => state.orderRequest,
    getOrderModalData: (state) => state.orderModalData
  },
  extraReducers: (builder) => {
    builder
      .addCase(postOrder.pending, (state) => {
        state.orderRequest = true;
      })
      .addCase(postOrder.fulfilled, (state, action) => {
        state.orderRequest = false;
        state.orderModalData = action.payload.order;
      })
      .addCase(postOrder.rejected, (state) => {
        state.orderRequest = false;
      });
  }
});

export const { addIngredient, resetOrder, removeIngredient, moveIngredient } =
  newOrderSlice.actions;
export const { getOrderIngredients, getOrderRequest, getOrderModalData } =
  newOrderSlice.selectors;
export default newOrderSlice.reducer;
