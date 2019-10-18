import configureMockStore from 'redux-mock-store';
import thunk from 'redux-thunk';
import nock from 'nock';

import {
  HOME_FULL_USER_BEGIN,
  HOME_FULL_USER_SUCCESS,
  HOME_FULL_USER_FAILURE,
  HOME_FULL_USER_DISMISS_ERROR,
} from '../../../../src/features/home/redux/constants';

import {
  fullUser,
  dismissFullUserError,
  reducer,
} from '../../../../src/features/home/redux/fullUser';

const middlewares = [thunk];
const mockStore = configureMockStore(middlewares);

describe('home/redux/fullUser', () => {
  afterEach(() => {
    nock.cleanAll();
  });

  it('dispatches success action when fullUser succeeds', () => {
    const store = mockStore({});

    return store.dispatch(fullUser())
      .then(() => {
        const actions = store.getActions();
        expect(actions[0]).toHaveProperty('type', HOME_FULL_USER_BEGIN);
        expect(actions[1]).toHaveProperty('type', HOME_FULL_USER_SUCCESS);
      });
  });

  it('dispatches failure action when fullUser fails', () => {
    const store = mockStore({});

    return store.dispatch(fullUser({ error: true }))
      .catch(() => {
        const actions = store.getActions();
        expect(actions[0]).toHaveProperty('type', HOME_FULL_USER_BEGIN);
        expect(actions[1]).toHaveProperty('type', HOME_FULL_USER_FAILURE);
        expect(actions[1]).toHaveProperty('data.error', expect.anything());
      });
  });

  it('returns correct action by dismissFullUserError', () => {
    const expectedAction = {
      type: HOME_FULL_USER_DISMISS_ERROR,
    };
    expect(dismissFullUserError()).toEqual(expectedAction);
  });

  it('handles action type HOME_FULL_USER_BEGIN correctly', () => {
    const prevState = { fullUserPending: false };
    const state = reducer(
      prevState,
      { type: HOME_FULL_USER_BEGIN }
    );
    expect(state).not.toBe(prevState); // should be immutable
    expect(state.fullUserPending).toBe(true);
  });

  it('handles action type HOME_FULL_USER_SUCCESS correctly', () => {
    const prevState = { fullUserPending: true };
    const state = reducer(
      prevState,
      { type: HOME_FULL_USER_SUCCESS, data: {} }
    );
    expect(state).not.toBe(prevState); // should be immutable
    expect(state.fullUserPending).toBe(false);
  });

  it('handles action type HOME_FULL_USER_FAILURE correctly', () => {
    const prevState = { fullUserPending: true };
    const state = reducer(
      prevState,
      { type: HOME_FULL_USER_FAILURE, data: { error: new Error('some error') } }
    );
    expect(state).not.toBe(prevState); // should be immutable
    expect(state.fullUserPending).toBe(false);
    expect(state.fullUserError).toEqual(expect.anything());
  });

  it('handles action type HOME_FULL_USER_DISMISS_ERROR correctly', () => {
    const prevState = { fullUserError: new Error('some error') };
    const state = reducer(
      prevState,
      { type: HOME_FULL_USER_DISMISS_ERROR }
    );
    expect(state).not.toBe(prevState); // should be immutable
    expect(state.fullUserError).toBe(null);
  });
});

