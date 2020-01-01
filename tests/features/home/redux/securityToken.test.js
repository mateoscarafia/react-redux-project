import configureMockStore from 'redux-mock-store';
import thunk from 'redux-thunk';
import nock from 'nock';

import {
  HOME_SECURITY_TOKEN_BEGIN,
  HOME_SECURITY_TOKEN_SUCCESS,
  HOME_SECURITY_TOKEN_FAILURE,
  HOME_SECURITY_TOKEN_DISMISS_ERROR,
} from '../../../../src/features/home/redux/constants';

import {
  securityToken,
  dismissSecurityTokenError,
  reducer,
} from '../../../../src/features/home/redux/securityToken';

const middlewares = [thunk];
const mockStore = configureMockStore(middlewares);

describe('home/redux/securityToken', () => {
  afterEach(() => {
    nock.cleanAll();
  });

  it('dispatches success action when securityToken succeeds', () => {
    const store = mockStore({});

    return store.dispatch(securityToken())
      .then(() => {
        const actions = store.getActions();
        expect(actions[0]).toHaveProperty('type', HOME_SECURITY_TOKEN_BEGIN);
        expect(actions[1]).toHaveProperty('type', HOME_SECURITY_TOKEN_SUCCESS);
      });
  });

  it('dispatches failure action when securityToken fails', () => {
    const store = mockStore({});

    return store.dispatch(securityToken({ error: true }))
      .catch(() => {
        const actions = store.getActions();
        expect(actions[0]).toHaveProperty('type', HOME_SECURITY_TOKEN_BEGIN);
        expect(actions[1]).toHaveProperty('type', HOME_SECURITY_TOKEN_FAILURE);
        expect(actions[1]).toHaveProperty('data.error', expect.anything());
      });
  });

  it('returns correct action by dismissSecurityTokenError', () => {
    const expectedAction = {
      type: HOME_SECURITY_TOKEN_DISMISS_ERROR,
    };
    expect(dismissSecurityTokenError()).toEqual(expectedAction);
  });

  it('handles action type HOME_SECURITY_TOKEN_BEGIN correctly', () => {
    const prevState = { securityTokenPending: false };
    const state = reducer(
      prevState,
      { type: HOME_SECURITY_TOKEN_BEGIN }
    );
    expect(state).not.toBe(prevState); // should be immutable
    expect(state.securityTokenPending).toBe(true);
  });

  it('handles action type HOME_SECURITY_TOKEN_SUCCESS correctly', () => {
    const prevState = { securityTokenPending: true };
    const state = reducer(
      prevState,
      { type: HOME_SECURITY_TOKEN_SUCCESS, data: {} }
    );
    expect(state).not.toBe(prevState); // should be immutable
    expect(state.securityTokenPending).toBe(false);
  });

  it('handles action type HOME_SECURITY_TOKEN_FAILURE correctly', () => {
    const prevState = { securityTokenPending: true };
    const state = reducer(
      prevState,
      { type: HOME_SECURITY_TOKEN_FAILURE, data: { error: new Error('some error') } }
    );
    expect(state).not.toBe(prevState); // should be immutable
    expect(state.securityTokenPending).toBe(false);
    expect(state.securityTokenError).toEqual(expect.anything());
  });

  it('handles action type HOME_SECURITY_TOKEN_DISMISS_ERROR correctly', () => {
    const prevState = { securityTokenError: new Error('some error') };
    const state = reducer(
      prevState,
      { type: HOME_SECURITY_TOKEN_DISMISS_ERROR }
    );
    expect(state).not.toBe(prevState); // should be immutable
    expect(state.securityTokenError).toBe(null);
  });
});

