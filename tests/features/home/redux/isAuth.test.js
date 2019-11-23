import configureMockStore from 'redux-mock-store';
import thunk from 'redux-thunk';
import nock from 'nock';

import {
  HOME_IS_AUTH_BEGIN,
  HOME_IS_AUTH_SUCCESS,
  HOME_IS_AUTH_FAILURE,
  HOME_IS_AUTH_DISMISS_ERROR,
} from '../../../../src/features/home/redux/constants';

import {
  isAuth,
  dismissIsAuthError,
  reducer,
} from '../../../../src/features/home/redux/isAuth';

const middlewares = [thunk];
const mockStore = configureMockStore(middlewares);

describe('home/redux/isAuth', () => {
  afterEach(() => {
    nock.cleanAll();
  });

  it('dispatches success action when isAuth succeeds', () => {
    const store = mockStore({});

    return store.dispatch(isAuth())
      .then(() => {
        const actions = store.getActions();
        expect(actions[0]).toHaveProperty('type', HOME_IS_AUTH_BEGIN);
        expect(actions[1]).toHaveProperty('type', HOME_IS_AUTH_SUCCESS);
      });
  });

  it('dispatches failure action when isAuth fails', () => {
    const store = mockStore({});

    return store.dispatch(isAuth({ error: true }))
      .catch(() => {
        const actions = store.getActions();
        expect(actions[0]).toHaveProperty('type', HOME_IS_AUTH_BEGIN);
        expect(actions[1]).toHaveProperty('type', HOME_IS_AUTH_FAILURE);
        expect(actions[1]).toHaveProperty('data.error', expect.anything());
      });
  });

  it('returns correct action by dismissIsAuthError', () => {
    const expectedAction = {
      type: HOME_IS_AUTH_DISMISS_ERROR,
    };
    expect(dismissIsAuthError()).toEqual(expectedAction);
  });

  it('handles action type HOME_IS_AUTH_BEGIN correctly', () => {
    const prevState = { isAuthPending: false };
    const state = reducer(
      prevState,
      { type: HOME_IS_AUTH_BEGIN }
    );
    expect(state).not.toBe(prevState); // should be immutable
    expect(state.isAuthPending).toBe(true);
  });

  it('handles action type HOME_IS_AUTH_SUCCESS correctly', () => {
    const prevState = { isAuthPending: true };
    const state = reducer(
      prevState,
      { type: HOME_IS_AUTH_SUCCESS, data: {} }
    );
    expect(state).not.toBe(prevState); // should be immutable
    expect(state.isAuthPending).toBe(false);
  });

  it('handles action type HOME_IS_AUTH_FAILURE correctly', () => {
    const prevState = { isAuthPending: true };
    const state = reducer(
      prevState,
      { type: HOME_IS_AUTH_FAILURE, data: { error: new Error('some error') } }
    );
    expect(state).not.toBe(prevState); // should be immutable
    expect(state.isAuthPending).toBe(false);
    expect(state.isAuthError).toEqual(expect.anything());
  });

  it('handles action type HOME_IS_AUTH_DISMISS_ERROR correctly', () => {
    const prevState = { isAuthError: new Error('some error') };
    const state = reducer(
      prevState,
      { type: HOME_IS_AUTH_DISMISS_ERROR }
    );
    expect(state).not.toBe(prevState); // should be immutable
    expect(state.isAuthError).toBe(null);
  });
});

