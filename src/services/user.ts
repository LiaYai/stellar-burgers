import { createAsyncThunk, createSlice } from '@reduxjs/toolkit';
import { loginUserApi, registerUserApi, TLoginData, TRegisterData } from '@api';
import { TUser } from '@utils-types';
import { setCookie } from '../utils/cookie';

type TUserState = {
  isInit: boolean;
  user: TUser | null;
  isLoading: boolean;
};

const initialState: TUserState = {
  isInit: false,
  user: null,
  isLoading: false
};

export const loginUser = createAsyncThunk(
  'user/login',
  async (dataUser: TLoginData) => await loginUserApi(dataUser)
);

export const registerUser = createAsyncThunk(
  'user/register',
  async (dataUser: TRegisterData) => {
    const data = await registerUserApi(dataUser);
    setCookie('accessToken', data.accessToken);
    localStorage.setItem('refreshToken', data.refreshToken);
    return data;
  }
);

export const userSlice = createSlice({
  name: 'user',
  initialState,
  reducers: {},
  selectors: {
    selectUser: (state) => state.user as TUser,
    selectIsLoading: (state) => state.isLoading
  },
  extraReducers: (builder) => {
    builder
      .addCase(loginUser.pending, (state) => {
        state.isLoading = true;
        state.isInit = false;
      })
      .addCase(loginUser.rejected, (state) => {
        state.isLoading = false;
      })
      .addCase(loginUser.fulfilled, (state, action) => {
        state.isLoading = false;
        state.user = action.payload.user;
        state.isInit = true;
      })
      .addCase(registerUser.fulfilled, (state, action) => {
        state.user = action.payload.user;
      });
  }
});

export default userSlice.reducer;
export const { selectUser, selectIsLoading } = userSlice.selectors;
