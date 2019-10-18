import configureMockStore from 'redux-mock-store';
import thunk from 'redux-thunk';
import nock from 'nock';

import {
  HOME_GET_USER_BEGIN,
  HOME_GET_USER_SUCCESS,
  HOME_GET_USER_FAILURE,
  HOME_GET_USER_DISMISS_ERROR,
} from '../../../../src/features/home/redux/constants';

import {
  getUser,
  dismissGetUserError,
  reducer,
} from '../../../../src/features/home/redux/getUser';

const middlewares = [thunk];
const mockStore = configureMockStore(middlewares);

describe('home/redux/getUser', () => {
  afterEach(() => {
    nock.cleanAll();
  });

  it('dispatches success action when getUser succeeds', () => {
    const store = mockStore({});

    return store.dispatch(getUser())
      .then(() => {
        const actions = store.getActions();
        expect(actions[0]).toHaveProperty('type', HOME_GET_USER_BEGIN);
        expect(actions[1]).toHaveProperty('type', HOME_GET_USER_SUCCESS);
      });
  });

  it('dispatches failure action when getUser fails', () => {
    const store = mockStore({});

    return store.dispatch(getUser({ error: true }))
      .catch(() => {
        const actions = store.getActions();
        expect(actions[0]).toHaveProperty('type', HOME_GET_USER_BEGIN);
        expect(actions[1]).toHaveProperty('type', HOME_GET_USER_FAILURE);
        expect(actions[1]).toHaveProperty('data.error', expect.anything());
      });
  });

  it('returns correct action by dismissGetUserError', () => {
    const expectedAction = {
      type: HOME_GET_USER_DISMISS_ERROR,
    };
    expect(dismissGetUserError()).toEqual(expectedAction);
  });

  it('handles action type HOME_GET_USER_BEGIN correctly', () => {
    const prevState = { getUserPending: false };
    const state = reducer(
      prevState,
      { type: HOME_GET_USER_BEGIN }
    );
    expect(state).not.toBe(prevState); // should be immutable
    expect(state.getUserPending).toBe(true);
  });

  it('handles action type HOME_GET_USER_SUCCESS correctly', () => {
    const prevState = { getUserPending: true };
    const state = reducer(
      prevState,
      { type: HOME_GET_USER_SUCCESS, data: {} }
    );
    expect(state).not.toBe(prevState); // should be immutable
    expect(state.getUserPending).toBe(false);
  });

  it('handles action type HOME_GET_USER_FAILURE correctly', () => {
    const prevState = { getUserPending: true };
    const state = reducer(
      prevState,
      { type: HOME_GET_USER_FAILURE, data: { error: new Error('some error') } }
    );
    expect(state).not.toBe(prevState); // should be immutable
    expect(state.getUserPending).toBe(false);
    expect(state.getUserError).toEqual(expect.anything());
  });

  it('handles action type HOME_GET_USER_DISMISS_ERROR correctly', () => {
    const prevState = { getUserError: new Error('some error') };
    const state = reducer(
      prevState,
      { type: HOME_GET_USER_DISMISS_ERROR }
    );
    expect(state).not.toBe(prevState); // should be immutable
    expect(state.getUserError).toBe(null);
  });
});

