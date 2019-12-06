import configureMockStore from 'redux-mock-store';
import thunk from 'redux-thunk';
import nock from 'nock';

import {
  HOME_GET_FOLLOWING_BEGIN,
  HOME_GET_FOLLOWING_SUCCESS,
  HOME_GET_FOLLOWING_FAILURE,
  HOME_GET_FOLLOWING_DISMISS_ERROR,
} from '../../../../src/features/home/redux/constants';

import {
  getFollowing,
  dismissGetFollowingError,
  reducer,
} from '../../../../src/features/home/redux/getFollowing';

const middlewares = [thunk];
const mockStore = configureMockStore(middlewares);

describe('home/redux/getFollowing', () => {
  afterEach(() => {
    nock.cleanAll();
  });

  it('dispatches success action when getFollowing succeeds', () => {
    const store = mockStore({});

    return store.dispatch(getFollowing())
      .then(() => {
        const actions = store.getActions();
        expect(actions[0]).toHaveProperty('type', HOME_GET_FOLLOWING_BEGIN);
        expect(actions[1]).toHaveProperty('type', HOME_GET_FOLLOWING_SUCCESS);
      });
  });

  it('dispatches failure action when getFollowing fails', () => {
    const store = mockStore({});

    return store.dispatch(getFollowing({ error: true }))
      .catch(() => {
        const actions = store.getActions();
        expect(actions[0]).toHaveProperty('type', HOME_GET_FOLLOWING_BEGIN);
        expect(actions[1]).toHaveProperty('type', HOME_GET_FOLLOWING_FAILURE);
        expect(actions[1]).toHaveProperty('data.error', expect.anything());
      });
  });

  it('returns correct action by dismissGetFollowingError', () => {
    const expectedAction = {
      type: HOME_GET_FOLLOWING_DISMISS_ERROR,
    };
    expect(dismissGetFollowingError()).toEqual(expectedAction);
  });

  it('handles action type HOME_GET_FOLLOWING_BEGIN correctly', () => {
    const prevState = { getFollowingPending: false };
    const state = reducer(
      prevState,
      { type: HOME_GET_FOLLOWING_BEGIN }
    );
    expect(state).not.toBe(prevState); // should be immutable
    expect(state.getFollowingPending).toBe(true);
  });

  it('handles action type HOME_GET_FOLLOWING_SUCCESS correctly', () => {
    const prevState = { getFollowingPending: true };
    const state = reducer(
      prevState,
      { type: HOME_GET_FOLLOWING_SUCCESS, data: {} }
    );
    expect(state).not.toBe(prevState); // should be immutable
    expect(state.getFollowingPending).toBe(false);
  });

  it('handles action type HOME_GET_FOLLOWING_FAILURE correctly', () => {
    const prevState = { getFollowingPending: true };
    const state = reducer(
      prevState,
      { type: HOME_GET_FOLLOWING_FAILURE, data: { error: new Error('some error') } }
    );
    expect(state).not.toBe(prevState); // should be immutable
    expect(state.getFollowingPending).toBe(false);
    expect(state.getFollowingError).toEqual(expect.anything());
  });

  it('handles action type HOME_GET_FOLLOWING_DISMISS_ERROR correctly', () => {
    const prevState = { getFollowingError: new Error('some error') };
    const state = reducer(
      prevState,
      { type: HOME_GET_FOLLOWING_DISMISS_ERROR }
    );
    expect(state).not.toBe(prevState); // should be immutable
    expect(state.getFollowingError).toBe(null);
  });
});

