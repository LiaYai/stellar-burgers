import { combineReducers, configureStore } from '@reduxjs/toolkit';

import {
  TypedUseSelectorHook,
  useDispatch as dispatchHook,
  useSelector as selectorHook
} from 'react-redux';

import ingredientsSlice from '../services/slices/ingredients';
import feedsSlice from '../services/slices/feeds';
import newOrderSlice from '../services/slices/burger';
import ordersSlice from '../services/slices/orders';
import userSlice from '../services/slices/user';

export const rootReducer = combineReducers({
  ingredients: ingredientsSlice,
  feeds: feedsSlice,
  orders: ordersSlice,
  newOrder: newOrderSlice,
  user: userSlice
});

const store = configureStore({
  reducer: rootReducer,
  devTools: process.env.NODE_ENV !== 'production'
});

export type RootState = ReturnType<typeof rootReducer>;

export type AppDispatch = typeof store.dispatch;

export const useDispatch: () => AppDispatch = () => dispatchHook();
export const useSelector: TypedUseSelectorHook<RootState> =
  selectorHook<RootState>;

export default store;
