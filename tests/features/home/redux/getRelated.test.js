import configureMockStore from 'redux-mock-store';
import thunk from 'redux-thunk';
import nock from 'nock';

import {
  HOME_GET_RELATED_BEGIN,
  HOME_GET_RELATED_SUCCESS,
  HOME_GET_RELATED_FAILURE,
  HOME_GET_RELATED_DISMISS_ERROR,
} from '../../../../src/features/home/redux/constants';

import {
  getRelated,
  dismissGetRelatedError,
  reducer,
} from '../../../../src/features/home/redux/getRelated';

const middlewares = [thunk];
const mockStore = configureMockStore(middlewares);

describe('home/redux/getRelated', () => {
  afterEach(() => {
    nock.cleanAll();
  });

  it('dispatches success action when getRelated succeeds', () => {
    const store = mockStore({});

    return store.dispatch(getRelated())
      .then(() => {
        const actions = store.getActions();
        expect(actions[0]).toHaveProperty('type', HOME_GET_RELATED_BEGIN);
        expect(actions[1]).toHaveProperty('type', HOME_GET_RELATED_SUCCESS);
      });
  });

  it('dispatches failure action when getRelated fails', () => {
    const store = mockStore({});

    return store.dispatch(getRelated({ error: true }))
      .catch(() => {
        const actions = store.getActions();
        expect(actions[0]).toHaveProperty('type', HOME_GET_RELATED_BEGIN);
        expect(actions[1]).toHaveProperty('type', HOME_GET_RELATED_FAILURE);
        expect(actions[1]).toHaveProperty('data.error', expect.anything());
      });
  });

  it('returns correct action by dismissGetRelatedError', () => {
    const expectedAction = {
      type: HOME_GET_RELATED_DISMISS_ERROR,
    };
    expect(dismissGetRelatedError()).toEqual(expectedAction);
  });

  it('handles action type HOME_GET_RELATED_BEGIN correctly', () => {
    const prevState = { getRelatedPending: false };
    const state = reducer(
      prevState,
      { type: HOME_GET_RELATED_BEGIN }
    );
    expect(state).not.toBe(prevState); // should be immutable
    expect(state.getRelatedPending).toBe(true);
  });

  it('handles action type HOME_GET_RELATED_SUCCESS correctly', () => {
    const prevState = { getRelatedPending: true };
    const state = reducer(
      prevState,
      { type: HOME_GET_RELATED_SUCCESS, data: {} }
    );
    expect(state).not.toBe(prevState); // should be immutable
    expect(state.getRelatedPending).toBe(false);
  });

  it('handles action type HOME_GET_RELATED_FAILURE correctly', () => {
    const prevState = { getRelatedPending: true };
    const state = reducer(
      prevState,
      { type: HOME_GET_RELATED_FAILURE, data: { error: new Error('some error') } }
    );
    expect(state).not.toBe(prevState); // should be immutable
    expect(state.getRelatedPending).toBe(false);
    expect(state.getRelatedError).toEqual(expect.anything());
  });

  it('handles action type HOME_GET_RELATED_DISMISS_ERROR correctly', () => {
    const prevState = { getRelatedError: new Error('some error') };
    const state = reducer(
      prevState,
      { type: HOME_GET_RELATED_DISMISS_ERROR }
    );
    expect(state).not.toBe(prevState); // should be immutable
    expect(state.getRelatedError).toBe(null);
  });
});

