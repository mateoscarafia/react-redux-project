import configureMockStore from 'redux-mock-store';
import thunk from 'redux-thunk';
import nock from 'nock';

import {
  HOME_FOLLOW_USER_BEGIN,
  HOME_FOLLOW_USER_SUCCESS,
  HOME_FOLLOW_USER_FAILURE,
  HOME_FOLLOW_USER_DISMISS_ERROR,
} from '../../../../src/features/home/redux/constants';

import {
  followUser,
  dismissFollowUserError,
  reducer,
} from '../../../../src/features/home/redux/followUser';

const middlewares = [thunk];
const mockStore = configureMockStore(middlewares);

describe('home/redux/followUser', () => {
  afterEach(() => {
    nock.cleanAll();
  });

  it('dispatches success action when followUser succeeds', () => {
    const store = mockStore({});

    return store.dispatch(followUser())
      .then(() => {
        const actions = store.getActions();
        expect(actions[0]).toHaveProperty('type', HOME_FOLLOW_USER_BEGIN);
        expect(actions[1]).toHaveProperty('type', HOME_FOLLOW_USER_SUCCESS);
      });
  });

  it('dispatches failure action when followUser fails', () => {
    const store = mockStore({});

    return store.dispatch(followUser({ error: true }))
      .catch(() => {
        const actions = store.getActions();
        expect(actions[0]).toHaveProperty('type', HOME_FOLLOW_USER_BEGIN);
        expect(actions[1]).toHaveProperty('type', HOME_FOLLOW_USER_FAILURE);
        expect(actions[1]).toHaveProperty('data.error', expect.anything());
      });
  });

  it('returns correct action by dismissFollowUserError', () => {
    const expectedAction = {
      type: HOME_FOLLOW_USER_DISMISS_ERROR,
    };
    expect(dismissFollowUserError()).toEqual(expectedAction);
  });

  it('handles action type HOME_FOLLOW_USER_BEGIN correctly', () => {
    const prevState = { followUserPending: false };
    const state = reducer(
      prevState,
      { type: HOME_FOLLOW_USER_BEGIN }
    );
    expect(state).not.toBe(prevState); // should be immutable
    expect(state.followUserPending).toBe(true);
  });

  it('handles action type HOME_FOLLOW_USER_SUCCESS correctly', () => {
    const prevState = { followUserPending: true };
    const state = reducer(
      prevState,
      { type: HOME_FOLLOW_USER_SUCCESS, data: {} }
    );
    expect(state).not.toBe(prevState); // should be immutable
    expect(state.followUserPending).toBe(false);
  });

  it('handles action type HOME_FOLLOW_USER_FAILURE correctly', () => {
    const prevState = { followUserPending: true };
    const state = reducer(
      prevState,
      { type: HOME_FOLLOW_USER_FAILURE, data: { error: new Error('some error') } }
    );
    expect(state).not.toBe(prevState); // should be immutable
    expect(state.followUserPending).toBe(false);
    expect(state.followUserError).toEqual(expect.anything());
  });

  it('handles action type HOME_FOLLOW_USER_DISMISS_ERROR correctly', () => {
    const prevState = { followUserError: new Error('some error') };
    const state = reducer(
      prevState,
      { type: HOME_FOLLOW_USER_DISMISS_ERROR }
    );
    expect(state).not.toBe(prevState); // should be immutable
    expect(state.followUserError).toBe(null);
  });
});

