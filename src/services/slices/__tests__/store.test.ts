import { rootReducer, store } from '../../store';

describe('rootReducer', () => {
  it('should return the initial state', () => {
    const state = rootReducer(undefined, { type: '' });
    expect(state).toEqual(store.getState());
  });
});
