import configureMockStore from 'redux-mock-store';
import thunk from 'redux-thunk';
import nock from 'nock';

import {
  HOME_GET_USER_PROFILE_BEGIN,
  HOME_GET_USER_PROFILE_SUCCESS,
  HOME_GET_USER_PROFILE_FAILURE,
  HOME_GET_USER_PROFILE_DISMISS_ERROR,
} from '../../../../src/features/home/redux/constants';

import {
  getUserProfile,
  dismissGetUserProfileError,
  reducer,
} from '../../../../src/features/home/redux/getUserProfile';

const middlewares = [thunk];
const mockStore = configureMockStore(middlewares);

describe('home/redux/getUserProfile', () => {
  afterEach(() => {
    nock.cleanAll();
  });

  it('dispatches success action when getUserProfile succeeds', () => {
    const store = mockStore({});

    return store.dispatch(getUserProfile())
      .then(() => {
        const actions = store.getActions();
        expect(actions[0]).toHaveProperty('type', HOME_GET_USER_PROFILE_BEGIN);
        expect(actions[1]).toHaveProperty('type', HOME_GET_USER_PROFILE_SUCCESS);
      });
  });

  it('dispatches failure action when getUserProfile fails', () => {
    const store = mockStore({});

    return store.dispatch(getUserProfile({ error: true }))
      .catch(() => {
        const actions = store.getActions();
        expect(actions[0]).toHaveProperty('type', HOME_GET_USER_PROFILE_BEGIN);
        expect(actions[1]).toHaveProperty('type', HOME_GET_USER_PROFILE_FAILURE);
        expect(actions[1]).toHaveProperty('data.error', expect.anything());
      });
  });

  it('returns correct action by dismissGetUserProfileError', () => {
    const expectedAction = {
      type: HOME_GET_USER_PROFILE_DISMISS_ERROR,
    };
    expect(dismissGetUserProfileError()).toEqual(expectedAction);
  });

  it('handles action type HOME_GET_USER_PROFILE_BEGIN correctly', () => {
    const prevState = { getUserProfilePending: false };
    const state = reducer(
      prevState,
      { type: HOME_GET_USER_PROFILE_BEGIN }
    );
    expect(state).not.toBe(prevState); // should be immutable
    expect(state.getUserProfilePending).toBe(true);
  });

  it('handles action type HOME_GET_USER_PROFILE_SUCCESS correctly', () => {
    const prevState = { getUserProfilePending: true };
    const state = reducer(
      prevState,
      { type: HOME_GET_USER_PROFILE_SUCCESS, data: {} }
    );
    expect(state).not.toBe(prevState); // should be immutable
    expect(state.getUserProfilePending).toBe(false);
  });

  it('handles action type HOME_GET_USER_PROFILE_FAILURE correctly', () => {
    const prevState = { getUserProfilePending: true };
    const state = reducer(
      prevState,
      { type: HOME_GET_USER_PROFILE_FAILURE, data: { error: new Error('some error') } }
    );
    expect(state).not.toBe(prevState); // should be immutable
    expect(state.getUserProfilePending).toBe(false);
    expect(state.getUserProfileError).toEqual(expect.anything());
  });

  it('handles action type HOME_GET_USER_PROFILE_DISMISS_ERROR correctly', () => {
    const prevState = { getUserProfileError: new Error('some error') };
    const state = reducer(
      prevState,
      { type: HOME_GET_USER_PROFILE_DISMISS_ERROR }
    );
    expect(state).not.toBe(prevState); // should be immutable
    expect(state.getUserProfileError).toBe(null);
  });
});

