import { createAsyncThunk, createSlice, PayloadAction } from '@reduxjs/toolkit';
import {
  loginUserApi,
  getUserApi,
  registerUserApi,
  logoutApi,
  TLoginData,
  TRegisterData
} from '@api';
import { TUser } from '@utils-types';
import { deleteCookie, setCookie } from '../utils/cookie';

type TUserState = {
  isAuth: boolean;
  user: TUser | null;
  isLoading: boolean;
};

const initialState: TUserState = {
  isAuth: false,
  user: null,
  isLoading: false
};

export const loginUser = createAsyncThunk(
  'user/login',
  async (dataUser: TLoginData) => {
    const data = await loginUserApi(dataUser);
    if (!data.success) return Promise.reject(data);
    setCookie('accessToken', data.accessToken);
    localStorage.setItem('refreshToken', data.refreshToken);
    return data.user;
  }
);

export const registerUser = createAsyncThunk(
  'user/register',
  async (dataUser: TRegisterData) => {
    const data = await registerUserApi(dataUser);
    if (!data.success) return Promise.reject(data);
    setCookie('accessToken', data.accessToken);
    localStorage.setItem('refreshToken', data.refreshToken);
    return data.user;
  }
);

export const getUserAuth = createAsyncThunk('user/getUser', async () => {
  const data = await getUserApi();
  if (!data.success) return Promise.reject(data);
  return data.user;
});

export const logoutUser = createAsyncThunk('user/logout', async () => {
  await logoutApi();
  localStorage.removeItem('refreshToken');
  deleteCookie('accessToken');
});

export const userSlice = createSlice({
  name: 'user',
  initialState,
  reducers: {
    init: (state) => {
      state.isAuth = true;
    }
  },
  selectors: {
    getUserData: (state) => state.user,
    getUserIsLoading: (state) => state.isLoading,
    getUserIsAuth: (state) => state.isAuth
  },
  extraReducers: (builder) => {
    builder
      .addCase(loginUser.pending, (state) => {
        state.isLoading = true;
        state.isAuth = false;
      })
      .addCase(loginUser.rejected, (state) => {
        state.isLoading = false;
      })
      .addCase(loginUser.fulfilled, (state, action: PayloadAction<TUser>) => {
        state.isLoading = false;
        state.user = action.payload;
        state.isAuth = true;
      })
      .addCase(registerUser.pending, (state) => {
        state.isLoading = true;
        state.isAuth = false;
      })
      .addCase(registerUser.rejected, (state) => {
        state.isLoading = false;
      })
      .addCase(
        registerUser.fulfilled,
        (state, action: PayloadAction<TUser>) => {
          state.user = action.payload;
          state.isAuth = true;
          state.isLoading = false;
        }
      )
      .addCase(getUserAuth.pending, (state) => {
        state.isLoading = true;
        state.isAuth = false;
      })
      .addCase(getUserAuth.rejected, (state) => {
        state.isLoading = false;
      })
      .addCase(getUserAuth.fulfilled, (state, action: PayloadAction<TUser>) => {
        state.user = action.payload;
        state.isAuth = true;
        state.isLoading = false;
      })
      .addCase(logoutUser.pending, (state) => {
        state.isLoading = true;
        state.isAuth = false;
      })
      .addCase(logoutUser.rejected, (state) => {
        state.isLoading = false;
      })
      .addCase(logoutUser.fulfilled, (state) => {
        state.isLoading = false;
        state.user = null;
      });
  }
});

export default userSlice.reducer;
export const { getUserData, getUserIsLoading, getUserIsAuth } =
  userSlice.selectors;
