import configureMockStore from 'redux-mock-store';
import thunk from 'redux-thunk';
import nock from 'nock';

import {
  HOME_GET_FOLLOWERS_BEGIN,
  HOME_GET_FOLLOWERS_SUCCESS,
  HOME_GET_FOLLOWERS_FAILURE,
  HOME_GET_FOLLOWERS_DISMISS_ERROR,
} from '../../../../src/features/home/redux/constants';

import {
  getFollowers,
  dismissGetFollowersError,
  reducer,
} from '../../../../src/features/home/redux/getFollowers';

const middlewares = [thunk];
const mockStore = configureMockStore(middlewares);

describe('home/redux/getFollowers', () => {
  afterEach(() => {
    nock.cleanAll();
  });

  it('dispatches success action when getFollowers succeeds', () => {
    const store = mockStore({});

    return store.dispatch(getFollowers())
      .then(() => {
        const actions = store.getActions();
        expect(actions[0]).toHaveProperty('type', HOME_GET_FOLLOWERS_BEGIN);
        expect(actions[1]).toHaveProperty('type', HOME_GET_FOLLOWERS_SUCCESS);
      });
  });

  it('dispatches failure action when getFollowers fails', () => {
    const store = mockStore({});

    return store.dispatch(getFollowers({ error: true }))
      .catch(() => {
        const actions = store.getActions();
        expect(actions[0]).toHaveProperty('type', HOME_GET_FOLLOWERS_BEGIN);
        expect(actions[1]).toHaveProperty('type', HOME_GET_FOLLOWERS_FAILURE);
        expect(actions[1]).toHaveProperty('data.error', expect.anything());
      });
  });

  it('returns correct action by dismissGetFollowersError', () => {
    const expectedAction = {
      type: HOME_GET_FOLLOWERS_DISMISS_ERROR,
    };
    expect(dismissGetFollowersError()).toEqual(expectedAction);
  });

  it('handles action type HOME_GET_FOLLOWERS_BEGIN correctly', () => {
    const prevState = { getFollowersPending: false };
    const state = reducer(
      prevState,
      { type: HOME_GET_FOLLOWERS_BEGIN }
    );
    expect(state).not.toBe(prevState); // should be immutable
    expect(state.getFollowersPending).toBe(true);
  });

  it('handles action type HOME_GET_FOLLOWERS_SUCCESS correctly', () => {
    const prevState = { getFollowersPending: true };
    const state = reducer(
      prevState,
      { type: HOME_GET_FOLLOWERS_SUCCESS, data: {} }
    );
    expect(state).not.toBe(prevState); // should be immutable
    expect(state.getFollowersPending).toBe(false);
  });

  it('handles action type HOME_GET_FOLLOWERS_FAILURE correctly', () => {
    const prevState = { getFollowersPending: true };
    const state = reducer(
      prevState,
      { type: HOME_GET_FOLLOWERS_FAILURE, data: { error: new Error('some error') } }
    );
    expect(state).not.toBe(prevState); // should be immutable
    expect(state.getFollowersPending).toBe(false);
    expect(state.getFollowersError).toEqual(expect.anything());
  });

  it('handles action type HOME_GET_FOLLOWERS_DISMISS_ERROR correctly', () => {
    const prevState = { getFollowersError: new Error('some error') };
    const state = reducer(
      prevState,
      { type: HOME_GET_FOLLOWERS_DISMISS_ERROR }
    );
    expect(state).not.toBe(prevState); // should be immutable
    expect(state.getFollowersError).toBe(null);
  });
});

