import configureMockStore from 'redux-mock-store';
import thunk from 'redux-thunk';
import nock from 'nock';

import {
  HOME_GET_PROMOTED_BEGIN,
  HOME_GET_PROMOTED_SUCCESS,
  HOME_GET_PROMOTED_FAILURE,
  HOME_GET_PROMOTED_DISMISS_ERROR,
} from '../../../../src/features/home/redux/constants';

import {
  getPromoted,
  dismissGetPromotedError,
  reducer,
} from '../../../../src/features/home/redux/getPromoted';

const middlewares = [thunk];
const mockStore = configureMockStore(middlewares);

describe('home/redux/getPromoted', () => {
  afterEach(() => {
    nock.cleanAll();
  });

  it('dispatches success action when getPromoted succeeds', () => {
    const store = mockStore({});

    return store.dispatch(getPromoted())
      .then(() => {
        const actions = store.getActions();
        expect(actions[0]).toHaveProperty('type', HOME_GET_PROMOTED_BEGIN);
        expect(actions[1]).toHaveProperty('type', HOME_GET_PROMOTED_SUCCESS);
      });
  });

  it('dispatches failure action when getPromoted fails', () => {
    const store = mockStore({});

    return store.dispatch(getPromoted({ error: true }))
      .catch(() => {
        const actions = store.getActions();
        expect(actions[0]).toHaveProperty('type', HOME_GET_PROMOTED_BEGIN);
        expect(actions[1]).toHaveProperty('type', HOME_GET_PROMOTED_FAILURE);
        expect(actions[1]).toHaveProperty('data.error', expect.anything());
      });
  });

  it('returns correct action by dismissGetPromotedError', () => {
    const expectedAction = {
      type: HOME_GET_PROMOTED_DISMISS_ERROR,
    };
    expect(dismissGetPromotedError()).toEqual(expectedAction);
  });

  it('handles action type HOME_GET_PROMOTED_BEGIN correctly', () => {
    const prevState = { getPromotedPending: false };
    const state = reducer(
      prevState,
      { type: HOME_GET_PROMOTED_BEGIN }
    );
    expect(state).not.toBe(prevState); // should be immutable
    expect(state.getPromotedPending).toBe(true);
  });

  it('handles action type HOME_GET_PROMOTED_SUCCESS correctly', () => {
    const prevState = { getPromotedPending: true };
    const state = reducer(
      prevState,
      { type: HOME_GET_PROMOTED_SUCCESS, data: {} }
    );
    expect(state).not.toBe(prevState); // should be immutable
    expect(state.getPromotedPending).toBe(false);
  });

  it('handles action type HOME_GET_PROMOTED_FAILURE correctly', () => {
    const prevState = { getPromotedPending: true };
    const state = reducer(
      prevState,
      { type: HOME_GET_PROMOTED_FAILURE, data: { error: new Error('some error') } }
    );
    expect(state).not.toBe(prevState); // should be immutable
    expect(state.getPromotedPending).toBe(false);
    expect(state.getPromotedError).toEqual(expect.anything());
  });

  it('handles action type HOME_GET_PROMOTED_DISMISS_ERROR correctly', () => {
    const prevState = { getPromotedError: new Error('some error') };
    const state = reducer(
      prevState,
      { type: HOME_GET_PROMOTED_DISMISS_ERROR }
    );
    expect(state).not.toBe(prevState); // should be immutable
    expect(state.getPromotedError).toBe(null);
  });
});

