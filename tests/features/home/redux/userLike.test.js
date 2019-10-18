import configureMockStore from 'redux-mock-store';
import thunk from 'redux-thunk';
import nock from 'nock';

import {
  HOME_USER_LIKE_BEGIN,
  HOME_USER_LIKE_SUCCESS,
  HOME_USER_LIKE_FAILURE,
  HOME_USER_LIKE_DISMISS_ERROR,
} from '../../../../src/features/home/redux/constants';

import {
  userLike,
  dismissUserLikeError,
  reducer,
} from '../../../../src/features/home/redux/userLike';

const middlewares = [thunk];
const mockStore = configureMockStore(middlewares);

describe('home/redux/userLike', () => {
  afterEach(() => {
    nock.cleanAll();
  });

  it('dispatches success action when userLike succeeds', () => {
    const store = mockStore({});

    return store.dispatch(userLike())
      .then(() => {
        const actions = store.getActions();
        expect(actions[0]).toHaveProperty('type', HOME_USER_LIKE_BEGIN);
        expect(actions[1]).toHaveProperty('type', HOME_USER_LIKE_SUCCESS);
      });
  });

  it('dispatches failure action when userLike fails', () => {
    const store = mockStore({});

    return store.dispatch(userLike({ error: true }))
      .catch(() => {
        const actions = store.getActions();
        expect(actions[0]).toHaveProperty('type', HOME_USER_LIKE_BEGIN);
        expect(actions[1]).toHaveProperty('type', HOME_USER_LIKE_FAILURE);
        expect(actions[1]).toHaveProperty('data.error', expect.anything());
      });
  });

  it('returns correct action by dismissUserLikeError', () => {
    const expectedAction = {
      type: HOME_USER_LIKE_DISMISS_ERROR,
    };
    expect(dismissUserLikeError()).toEqual(expectedAction);
  });

  it('handles action type HOME_USER_LIKE_BEGIN correctly', () => {
    const prevState = { userLikePending: false };
    const state = reducer(
      prevState,
      { type: HOME_USER_LIKE_BEGIN }
    );
    expect(state).not.toBe(prevState); // should be immutable
    expect(state.userLikePending).toBe(true);
  });

  it('handles action type HOME_USER_LIKE_SUCCESS correctly', () => {
    const prevState = { userLikePending: true };
    const state = reducer(
      prevState,
      { type: HOME_USER_LIKE_SUCCESS, data: {} }
    );
    expect(state).not.toBe(prevState); // should be immutable
    expect(state.userLikePending).toBe(false);
  });

  it('handles action type HOME_USER_LIKE_FAILURE correctly', () => {
    const prevState = { userLikePending: true };
    const state = reducer(
      prevState,
      { type: HOME_USER_LIKE_FAILURE, data: { error: new Error('some error') } }
    );
    expect(state).not.toBe(prevState); // should be immutable
    expect(state.userLikePending).toBe(false);
    expect(state.userLikeError).toEqual(expect.anything());
  });

  it('handles action type HOME_USER_LIKE_DISMISS_ERROR correctly', () => {
    const prevState = { userLikeError: new Error('some error') };
    const state = reducer(
      prevState,
      { type: HOME_USER_LIKE_DISMISS_ERROR }
    );
    expect(state).not.toBe(prevState); // should be immutable
    expect(state.userLikeError).toBe(null);
  });
});

