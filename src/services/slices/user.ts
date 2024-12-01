import { createAsyncThunk, createSlice, PayloadAction } from '@reduxjs/toolkit';
import { getUserApi } from '@api';
import { TUser } from '@utils-types';

type TUserState = {
  user: TUser | null;
  isLoading: boolean;
};

const initialState: TUserState = {
  user: null,
  isLoading: false
};

export const getUserAuth = createAsyncThunk('user/getUser', async () => {
  const data = await getUserApi();
  if (!data.success) return Promise.reject(data);
  return data.user;
});

export const userSlice = createSlice({
  name: 'user',
  initialState,
  reducers: {
    setUser: (state, action: PayloadAction<TUser | null>) => {
      state.user = action.payload;
    }
  },
  selectors: {
    getUserData: (state) => state.user,
    getUserIsLoading: (state) => state.isLoading
  },
  extraReducers: (builder) => {
    builder

      .addCase(getUserAuth.pending, (state) => {
        state.isLoading = true;
      })
      .addCase(getUserAuth.rejected, (state) => {
        state.isLoading = false;
      })
      .addCase(getUserAuth.fulfilled, (state, action: PayloadAction<TUser>) => {
        state.user = action.payload;
        state.isLoading = false;
      });
  }
});

export default userSlice.reducer;
export const { getUserData, getUserIsLoading } = userSlice.selectors;
export const { setUser } = userSlice.actions;
