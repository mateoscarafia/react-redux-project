import configureMockStore from 'redux-mock-store';
import thunk from 'redux-thunk';
import nock from 'nock';

import {
  HOME_BAD_REQUEST_BEGIN,
  HOME_BAD_REQUEST_SUCCESS,
  HOME_BAD_REQUEST_FAILURE,
  HOME_BAD_REQUEST_DISMISS_ERROR,
} from '../../../../src/features/home/redux/constants';

import {
  badRequest,
  dismissBadRequestError,
  reducer,
} from '../../../../src/features/home/redux/badRequest';

const middlewares = [thunk];
const mockStore = configureMockStore(middlewares);

describe('home/redux/badRequest', () => {
  afterEach(() => {
    nock.cleanAll();
  });

  it('dispatches success action when badRequest succeeds', () => {
    const store = mockStore({});

    return store.dispatch(badRequest())
      .then(() => {
        const actions = store.getActions();
        expect(actions[0]).toHaveProperty('type', HOME_BAD_REQUEST_BEGIN);
        expect(actions[1]).toHaveProperty('type', HOME_BAD_REQUEST_SUCCESS);
      });
  });

  it('dispatches failure action when badRequest fails', () => {
    const store = mockStore({});

    return store.dispatch(badRequest({ error: true }))
      .catch(() => {
        const actions = store.getActions();
        expect(actions[0]).toHaveProperty('type', HOME_BAD_REQUEST_BEGIN);
        expect(actions[1]).toHaveProperty('type', HOME_BAD_REQUEST_FAILURE);
        expect(actions[1]).toHaveProperty('data.error', expect.anything());
      });
  });

  it('returns correct action by dismissBadRequestError', () => {
    const expectedAction = {
      type: HOME_BAD_REQUEST_DISMISS_ERROR,
    };
    expect(dismissBadRequestError()).toEqual(expectedAction);
  });

  it('handles action type HOME_BAD_REQUEST_BEGIN correctly', () => {
    const prevState = { badRequestPending: false };
    const state = reducer(
      prevState,
      { type: HOME_BAD_REQUEST_BEGIN }
    );
    expect(state).not.toBe(prevState); // should be immutable
    expect(state.badRequestPending).toBe(true);
  });

  it('handles action type HOME_BAD_REQUEST_SUCCESS correctly', () => {
    const prevState = { badRequestPending: true };
    const state = reducer(
      prevState,
      { type: HOME_BAD_REQUEST_SUCCESS, data: {} }
    );
    expect(state).not.toBe(prevState); // should be immutable
    expect(state.badRequestPending).toBe(false);
  });

  it('handles action type HOME_BAD_REQUEST_FAILURE correctly', () => {
    const prevState = { badRequestPending: true };
    const state = reducer(
      prevState,
      { type: HOME_BAD_REQUEST_FAILURE, data: { error: new Error('some error') } }
    );
    expect(state).not.toBe(prevState); // should be immutable
    expect(state.badRequestPending).toBe(false);
    expect(state.badRequestError).toEqual(expect.anything());
  });

  it('handles action type HOME_BAD_REQUEST_DISMISS_ERROR correctly', () => {
    const prevState = { badRequestError: new Error('some error') };
    const state = reducer(
      prevState,
      { type: HOME_BAD_REQUEST_DISMISS_ERROR }
    );
    expect(state).not.toBe(prevState); // should be immutable
    expect(state.badRequestError).toBe(null);
  });
});

