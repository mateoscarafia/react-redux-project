import configureMockStore from 'redux-mock-store';
import thunk from 'redux-thunk';
import nock from 'nock';

import {
  HOME_STOP_FOLLOW_BEGIN,
  HOME_STOP_FOLLOW_SUCCESS,
  HOME_STOP_FOLLOW_FAILURE,
  HOME_STOP_FOLLOW_DISMISS_ERROR,
} from '../../../../src/features/home/redux/constants';

import {
  stopFollow,
  dismissStopFollowError,
  reducer,
} from '../../../../src/features/home/redux/stopFollow';

const middlewares = [thunk];
const mockStore = configureMockStore(middlewares);

describe('home/redux/stopFollow', () => {
  afterEach(() => {
    nock.cleanAll();
  });

  it('dispatches success action when stopFollow succeeds', () => {
    const store = mockStore({});

    return store.dispatch(stopFollow())
      .then(() => {
        const actions = store.getActions();
        expect(actions[0]).toHaveProperty('type', HOME_STOP_FOLLOW_BEGIN);
        expect(actions[1]).toHaveProperty('type', HOME_STOP_FOLLOW_SUCCESS);
      });
  });

  it('dispatches failure action when stopFollow fails', () => {
    const store = mockStore({});

    return store.dispatch(stopFollow({ error: true }))
      .catch(() => {
        const actions = store.getActions();
        expect(actions[0]).toHaveProperty('type', HOME_STOP_FOLLOW_BEGIN);
        expect(actions[1]).toHaveProperty('type', HOME_STOP_FOLLOW_FAILURE);
        expect(actions[1]).toHaveProperty('data.error', expect.anything());
      });
  });

  it('returns correct action by dismissStopFollowError', () => {
    const expectedAction = {
      type: HOME_STOP_FOLLOW_DISMISS_ERROR,
    };
    expect(dismissStopFollowError()).toEqual(expectedAction);
  });

  it('handles action type HOME_STOP_FOLLOW_BEGIN correctly', () => {
    const prevState = { stopFollowPending: false };
    const state = reducer(
      prevState,
      { type: HOME_STOP_FOLLOW_BEGIN }
    );
    expect(state).not.toBe(prevState); // should be immutable
    expect(state.stopFollowPending).toBe(true);
  });

  it('handles action type HOME_STOP_FOLLOW_SUCCESS correctly', () => {
    const prevState = { stopFollowPending: true };
    const state = reducer(
      prevState,
      { type: HOME_STOP_FOLLOW_SUCCESS, data: {} }
    );
    expect(state).not.toBe(prevState); // should be immutable
    expect(state.stopFollowPending).toBe(false);
  });

  it('handles action type HOME_STOP_FOLLOW_FAILURE correctly', () => {
    const prevState = { stopFollowPending: true };
    const state = reducer(
      prevState,
      { type: HOME_STOP_FOLLOW_FAILURE, data: { error: new Error('some error') } }
    );
    expect(state).not.toBe(prevState); // should be immutable
    expect(state.stopFollowPending).toBe(false);
    expect(state.stopFollowError).toEqual(expect.anything());
  });

  it('handles action type HOME_STOP_FOLLOW_DISMISS_ERROR correctly', () => {
    const prevState = { stopFollowError: new Error('some error') };
    const state = reducer(
      prevState,
      { type: HOME_STOP_FOLLOW_DISMISS_ERROR }
    );
    expect(state).not.toBe(prevState); // should be immutable
    expect(state.stopFollowError).toBe(null);
  });
});

