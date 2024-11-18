import { TConstructorIngredient, TIngredient, TOrder } from '@utils-types';
import { TNewOrderResponse, orderBurgerApi } from '@api';
import {
  createAsyncThunk,
  createSlice,
  nanoid,
  PayloadAction
} from '@reduxjs/toolkit';

export const sendNewOrder = createAsyncThunk(
  'newOrder',
  async (data: string[]) => await orderBurgerApi(data)
);

type TOrderState = {
  constructorItems: {
    bun: TConstructorIngredient | null;
    ingredients: TConstructorIngredient[];
  };
  orderRequest: boolean;
  orderModalData: TOrder | null;
};

const initialState: TOrderState = {
  constructorItems: {
    bun: null,
    ingredients: []
  },
  orderRequest: false,
  orderModalData: null
};

export const newOrderSlice = createSlice({
  name: 'newOrder',
  initialState,
  reducers: {
    addIngredient: {
      reducer: (state, action: PayloadAction<TConstructorIngredient>) => {
        action.payload.type === 'bun'
          ? (state.constructorItems.bun = action.payload)
          : state.constructorItems.ingredients.push(action.payload);
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
      state.constructorItems.ingredients.splice(
        to,
        0,
        state.constructorItems.ingredients.splice(from, 1)[0]
      );
    },
    removeIngredient: (state, action: PayloadAction<string>) => {
      state.constructorItems.ingredients =
        state.constructorItems.ingredients.filter(
          (item) => item.id !== action.payload
        );
    },
    resetOrder: () => initialState
  },
  selectors: {
    selectOrderIngredients: (state: TOrderState) => state.constructorItems,
    selectOrderRequest: (state: TOrderState) => state.orderRequest,
    selectOrderModalData: (state: TOrderState) => state.orderModalData
  },
  extraReducers: (builder) => {
    builder
      .addCase(sendNewOrder.pending, (state) => {
        state.orderRequest = true;
      })
      .addCase(sendNewOrder.fulfilled, (state, action) => {
        state.orderRequest = false;
        state.orderModalData = action.payload.order;
      })
      .addCase(sendNewOrder.rejected, (state) => {
        state.orderRequest = false;
      });
  }
});

export const { addIngredient, resetOrder, removeIngredient, moveIngredient } =
  newOrderSlice.actions;
export const {
  selectOrderIngredients,
  selectOrderRequest,
  selectOrderModalData
} = newOrderSlice.selectors;
export default newOrderSlice.reducer;