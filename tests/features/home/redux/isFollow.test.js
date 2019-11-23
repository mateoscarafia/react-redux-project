import configureMockStore from 'redux-mock-store';
import thunk from 'redux-thunk';
import nock from 'nock';

import {
  HOME_IS_FOLLOW_BEGIN,
  HOME_IS_FOLLOW_SUCCESS,
  HOME_IS_FOLLOW_FAILURE,
  HOME_IS_FOLLOW_DISMISS_ERROR,
} from '../../../../src/features/home/redux/constants';

import {
  isFollow,
  dismissIsFollowError,
  reducer,
} from '../../../../src/features/home/redux/isFollow';

const middlewares = [thunk];
const mockStore = configureMockStore(middlewares);

describe('home/redux/isFollow', () => {
  afterEach(() => {
    nock.cleanAll();
  });

  it('dispatches success action when isFollow succeeds', () => {
    const store = mockStore({});

    return store.dispatch(isFollow())
      .then(() => {
        const actions = store.getActions();
        expect(actions[0]).toHaveProperty('type', HOME_IS_FOLLOW_BEGIN);
        expect(actions[1]).toHaveProperty('type', HOME_IS_FOLLOW_SUCCESS);
      });
  });

  it('dispatches failure action when isFollow fails', () => {
    const store = mockStore({});

    return store.dispatch(isFollow({ error: true }))
      .catch(() => {
        const actions = store.getActions();
        expect(actions[0]).toHaveProperty('type', HOME_IS_FOLLOW_BEGIN);
        expect(actions[1]).toHaveProperty('type', HOME_IS_FOLLOW_FAILURE);
        expect(actions[1]).toHaveProperty('data.error', expect.anything());
      });
  });

  it('returns correct action by dismissIsFollowError', () => {
    const expectedAction = {
      type: HOME_IS_FOLLOW_DISMISS_ERROR,
    };
    expect(dismissIsFollowError()).toEqual(expectedAction);
  });

  it('handles action type HOME_IS_FOLLOW_BEGIN correctly', () => {
    const prevState = { isFollowPending: false };
    const state = reducer(
      prevState,
      { type: HOME_IS_FOLLOW_BEGIN }
    );
    expect(state).not.toBe(prevState); // should be immutable
    expect(state.isFollowPending).toBe(true);
  });

  it('handles action type HOME_IS_FOLLOW_SUCCESS correctly', () => {
    const prevState = { isFollowPending: true };
    const state = reducer(
      prevState,
      { type: HOME_IS_FOLLOW_SUCCESS, data: {} }
    );
    expect(state).not.toBe(prevState); // should be immutable
    expect(state.isFollowPending).toBe(false);
  });

  it('handles action type HOME_IS_FOLLOW_FAILURE correctly', () => {
    const prevState = { isFollowPending: true };
    const state = reducer(
      prevState,
      { type: HOME_IS_FOLLOW_FAILURE, data: { error: new Error('some error') } }
    );
    expect(state).not.toBe(prevState); // should be immutable
    expect(state.isFollowPending).toBe(false);
    expect(state.isFollowError).toEqual(expect.anything());
  });

  it('handles action type HOME_IS_FOLLOW_DISMISS_ERROR correctly', () => {
    const prevState = { isFollowError: new Error('some error') };
    const state = reducer(
      prevState,
      { type: HOME_IS_FOLLOW_DISMISS_ERROR }
    );
    expect(state).not.toBe(prevState); // should be immutable
    expect(state.isFollowError).toBe(null);
  });
});

