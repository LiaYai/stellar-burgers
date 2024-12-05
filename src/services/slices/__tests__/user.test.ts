import { configureStore } from '@reduxjs/toolkit';
import userSlice, { getUserAuth, logoutUser, setUser } from '../user';
import { log } from 'console';

describe('userSlice', () => {
  const initialState = {
    user: null,
    isLoading: false
  };

  describe('selectors', () => {
    const state = {
      user: {
        name: 'Alisa',
        email: 'alison@ya.ru'
      },
      isLoading: false
    };
    const store = configureStore({
      reducer: {
        user: userSlice
      },
      preloadedState: {
        user: state
      }
    });

    it('should handle selector getUserData', () => {
      const result = store.getState().user.user;
      expect(result).toEqual(state.user);
    });

    it('should handle selector getUserIsLoading', () => {
      const result = store.getState().user.isLoading;
      expect(result).toEqual(state.isLoading);
    });
  });

  describe('action setUser', () => {
    it('should handle "setUser"', () => {
      const state = userSlice(initialState, {
        type: setUser.type,
        payload: {
          name: 'Alisa',
          email: 'alison@ya.ru'
        }
      });
      expect(state.user).toEqual({
        name: 'Alisa',
        email: 'alison@ya.ru'
      });
    });
  });

  describe('extra reducer getUserAuth', () => {
    it('should handle action getUserAuth fulfilled', () => {
      const state = userSlice(initialState, {
        type: getUserAuth.fulfilled.type,
        payload: {
          name: 'Alisa',
          email: 'alison@ya.ru'
        }
      });
      const { user, isLoading } = state;
      expect(user).toEqual({
        name: 'Alisa',
        email: 'alison@ya.ru'
      });
      expect(isLoading).toEqual(false);
    });

    it('should handle action getUserAuth pending', () => {
      const state = userSlice(initialState, {
        type: getUserAuth.pending.type
      });
      const { user, isLoading } = state;
      expect(user).toEqual(null);
      expect(isLoading).toEqual(true);
    });

    it('should handle action getUserAuth rejected', () => {
      const state = userSlice(initialState, {
        type: getUserAuth.rejected.type
      });
      const { user, isLoading } = state;
      expect(user).toEqual(null);
      expect(isLoading).toEqual(false);
    });
  });

  describe('extra reducer logoutUser', () => {
    it('should handle action logoutUser fulfilled', () => {
      const state = userSlice(initialState, {
        type: logoutUser.fulfilled.type
      });
      const { user, isLoading } = state;
      expect(user).toEqual(null);
      expect(isLoading).toEqual(false);
    });

    it('should handle action logoutUser pending', () => {
      const state = userSlice(initialState, {
        type: logoutUser.pending.type
      });
      const { user, isLoading } = state;
      expect(user).toEqual(null);
      expect(isLoading).toEqual(true);
    });

    it('should handle action logoutUser rejected', () => {
      const state = userSlice(initialState, {
        type: logoutUser.rejected.type
      });
      const { user, isLoading } = state;
      expect(user).toEqual(null);
      expect(isLoading).toEqual(false);
    });
  });
});
