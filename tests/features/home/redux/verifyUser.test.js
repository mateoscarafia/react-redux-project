import configureMockStore from 'redux-mock-store';
import thunk from 'redux-thunk';
import nock from 'nock';

import {
  HOME_VERIFY_USER_BEGIN,
  HOME_VERIFY_USER_SUCCESS,
  HOME_VERIFY_USER_FAILURE,
  HOME_VERIFY_USER_DISMISS_ERROR,
} from '../../../../src/features/home/redux/constants';

import {
  verifyUser,
  dismissVerifyUserError,
  reducer,
} from '../../../../src/features/home/redux/verifyUser';

const middlewares = [thunk];
const mockStore = configureMockStore(middlewares);

describe('home/redux/verifyUser', () => {
  afterEach(() => {
    nock.cleanAll();
  });

  it('dispatches success action when verifyUser succeeds', () => {
    const store = mockStore({});

    return store.dispatch(verifyUser())
      .then(() => {
        const actions = store.getActions();
        expect(actions[0]).toHaveProperty('type', HOME_VERIFY_USER_BEGIN);
        expect(actions[1]).toHaveProperty('type', HOME_VERIFY_USER_SUCCESS);
      });
  });

  it('dispatches failure action when verifyUser fails', () => {
    const store = mockStore({});

    return store.dispatch(verifyUser({ error: true }))
      .catch(() => {
        const actions = store.getActions();
        expect(actions[0]).toHaveProperty('type', HOME_VERIFY_USER_BEGIN);
        expect(actions[1]).toHaveProperty('type', HOME_VERIFY_USER_FAILURE);
        expect(actions[1]).toHaveProperty('data.error', expect.anything());
      });
  });

  it('returns correct action by dismissVerifyUserError', () => {
    const expectedAction = {
      type: HOME_VERIFY_USER_DISMISS_ERROR,
    };
    expect(dismissVerifyUserError()).toEqual(expectedAction);
  });

  it('handles action type HOME_VERIFY_USER_BEGIN correctly', () => {
    const prevState = { verifyUserPending: false };
    const state = reducer(
      prevState,
      { type: HOME_VERIFY_USER_BEGIN }
    );
    expect(state).not.toBe(prevState); // should be immutable
    expect(state.verifyUserPending).toBe(true);
  });

  it('handles action type HOME_VERIFY_USER_SUCCESS correctly', () => {
    const prevState = { verifyUserPending: true };
    const state = reducer(
      prevState,
      { type: HOME_VERIFY_USER_SUCCESS, data: {} }
    );
    expect(state).not.toBe(prevState); // should be immutable
    expect(state.verifyUserPending).toBe(false);
  });

  it('handles action type HOME_VERIFY_USER_FAILURE correctly', () => {
    const prevState = { verifyUserPending: true };
    const state = reducer(
      prevState,
      { type: HOME_VERIFY_USER_FAILURE, data: { error: new Error('some error') } }
    );
    expect(state).not.toBe(prevState); // should be immutable
    expect(state.verifyUserPending).toBe(false);
    expect(state.verifyUserError).toEqual(expect.anything());
  });

  it('handles action type HOME_VERIFY_USER_DISMISS_ERROR correctly', () => {
    const prevState = { verifyUserError: new Error('some error') };
    const state = reducer(
      prevState,
      { type: HOME_VERIFY_USER_DISMISS_ERROR }
    );
    expect(state).not.toBe(prevState); // should be immutable
    expect(state.verifyUserError).toBe(null);
  });
});

