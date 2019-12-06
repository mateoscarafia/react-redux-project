import configureMockStore from 'redux-mock-store';
import thunk from 'redux-thunk';
import nock from 'nock';

import {
  HOME_SEARCH_USERS_BEGIN,
  HOME_SEARCH_USERS_SUCCESS,
  HOME_SEARCH_USERS_FAILURE,
  HOME_SEARCH_USERS_DISMISS_ERROR,
} from '../../../../src/features/home/redux/constants';

import {
  searchUsers,
  dismissSearchUsersError,
  reducer,
} from '../../../../src/features/home/redux/searchUsers';

const middlewares = [thunk];
const mockStore = configureMockStore(middlewares);

describe('home/redux/searchUsers', () => {
  afterEach(() => {
    nock.cleanAll();
  });

  it('dispatches success action when searchUsers succeeds', () => {
    const store = mockStore({});

    return store.dispatch(searchUsers())
      .then(() => {
        const actions = store.getActions();
        expect(actions[0]).toHaveProperty('type', HOME_SEARCH_USERS_BEGIN);
        expect(actions[1]).toHaveProperty('type', HOME_SEARCH_USERS_SUCCESS);
      });
  });

  it('dispatches failure action when searchUsers fails', () => {
    const store = mockStore({});

    return store.dispatch(searchUsers({ error: true }))
      .catch(() => {
        const actions = store.getActions();
        expect(actions[0]).toHaveProperty('type', HOME_SEARCH_USERS_BEGIN);
        expect(actions[1]).toHaveProperty('type', HOME_SEARCH_USERS_FAILURE);
        expect(actions[1]).toHaveProperty('data.error', expect.anything());
      });
  });

  it('returns correct action by dismissSearchUsersError', () => {
    const expectedAction = {
      type: HOME_SEARCH_USERS_DISMISS_ERROR,
    };
    expect(dismissSearchUsersError()).toEqual(expectedAction);
  });

  it('handles action type HOME_SEARCH_USERS_BEGIN correctly', () => {
    const prevState = { searchUsersPending: false };
    const state = reducer(
      prevState,
      { type: HOME_SEARCH_USERS_BEGIN }
    );
    expect(state).not.toBe(prevState); // should be immutable
    expect(state.searchUsersPending).toBe(true);
  });

  it('handles action type HOME_SEARCH_USERS_SUCCESS correctly', () => {
    const prevState = { searchUsersPending: true };
    const state = reducer(
      prevState,
      { type: HOME_SEARCH_USERS_SUCCESS, data: {} }
    );
    expect(state).not.toBe(prevState); // should be immutable
    expect(state.searchUsersPending).toBe(false);
  });

  it('handles action type HOME_SEARCH_USERS_FAILURE correctly', () => {
    const prevState = { searchUsersPending: true };
    const state = reducer(
      prevState,
      { type: HOME_SEARCH_USERS_FAILURE, data: { error: new Error('some error') } }
    );
    expect(state).not.toBe(prevState); // should be immutable
    expect(state.searchUsersPending).toBe(false);
    expect(state.searchUsersError).toEqual(expect.anything());
  });

  it('handles action type HOME_SEARCH_USERS_DISMISS_ERROR correctly', () => {
    const prevState = { searchUsersError: new Error('some error') };
    const state = reducer(
      prevState,
      { type: HOME_SEARCH_USERS_DISMISS_ERROR }
    );
    expect(state).not.toBe(prevState); // should be immutable
    expect(state.searchUsersError).toBe(null);
  });
});

