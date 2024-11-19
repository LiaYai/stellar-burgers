import { createAsyncThunk, createSlice, PayloadAction } from '@reduxjs/toolkit';
import {
  loginUserApi,
  getUserApi,
  registerUserApi,
  logoutApi,
  forgotPasswordApi,
  resetPasswordApi,
  updateUserApi,
  TLoginData,
  TRegisterData
} from '@api';
import { TUser } from '@utils-types';
import { deleteCookie, setCookie } from '../utils/cookie';

type TUserState = {
  user: TUser | null;
  isLoading: boolean;
};

const initialState: TUserState = {
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

export const updateUser = createAsyncThunk(
  'profile/updateUser',
  async (dataUser: Partial<TRegisterData>) => {
    const data = await updateUserApi(dataUser);
    return data.user;
  }
);

export const userSlice = createSlice({
  name: 'user',
  initialState,
  reducers: {
    setUser: (state, action: PayloadAction<TUser>) => {
      state.user = action.payload;
    }
  },
  selectors: {
    getUserData: (state) => state.user,
    getUserIsLoading: (state) => state.isLoading
  },
  extraReducers: (builder) => {
    builder
      .addCase(loginUser.pending, (state) => {
        state.isLoading = true;
      })
      .addCase(loginUser.rejected, (state) => {
        state.isLoading = false;
      })
      .addCase(loginUser.fulfilled, (state, action: PayloadAction<TUser>) => {
        state.isLoading = false;
        state.user = action.payload;
      })
      .addCase(registerUser.pending, (state) => {
        state.isLoading = true;
      })
      .addCase(registerUser.rejected, (state) => {
        state.isLoading = false;
      })
      .addCase(
        registerUser.fulfilled,
        (state, action: PayloadAction<TUser>) => {
          state.user = action.payload;
          state.isLoading = false;
        }
      )
      .addCase(getUserAuth.pending, (state) => {
        state.isLoading = true;
      })
      .addCase(getUserAuth.rejected, (state) => {
        state.isLoading = false;
      })
      .addCase(getUserAuth.fulfilled, (state, action: PayloadAction<TUser>) => {
        state.user = action.payload;
        state.isLoading = false;
      })
      .addCase(logoutUser.pending, (state) => {
        state.isLoading = true;
      })
      .addCase(logoutUser.rejected, (state) => {
        state.isLoading = false;
      })
      .addCase(logoutUser.fulfilled, (state) => {
        state.isLoading = false;
        state.user = null;
      })
      .addCase(updateUser.fulfilled, (state, action) => {
        state.user = action.payload;
      });
  }
});

export default userSlice.reducer;
export const { getUserData, getUserIsLoading } = userSlice.selectors;
