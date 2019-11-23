import configureMockStore from 'redux-mock-store';
import thunk from 'redux-thunk';
import nock from 'nock';

import {
  HOME_POST_VISIT_BEGIN,
  HOME_POST_VISIT_SUCCESS,
  HOME_POST_VISIT_FAILURE,
  HOME_POST_VISIT_DISMISS_ERROR,
} from '../../../../src/features/home/redux/constants';

import {
  postVisit,
  dismissPostVisitError,
  reducer,
} from '../../../../src/features/home/redux/postVisit';

const middlewares = [thunk];
const mockStore = configureMockStore(middlewares);

describe('home/redux/postVisit', () => {
  afterEach(() => {
    nock.cleanAll();
  });

  it('dispatches success action when postVisit succeeds', () => {
    const store = mockStore({});

    return store.dispatch(postVisit())
      .then(() => {
        const actions = store.getActions();
        expect(actions[0]).toHaveProperty('type', HOME_POST_VISIT_BEGIN);
        expect(actions[1]).toHaveProperty('type', HOME_POST_VISIT_SUCCESS);
      });
  });

  it('dispatches failure action when postVisit fails', () => {
    const store = mockStore({});

    return store.dispatch(postVisit({ error: true }))
      .catch(() => {
        const actions = store.getActions();
        expect(actions[0]).toHaveProperty('type', HOME_POST_VISIT_BEGIN);
        expect(actions[1]).toHaveProperty('type', HOME_POST_VISIT_FAILURE);
        expect(actions[1]).toHaveProperty('data.error', expect.anything());
      });
  });

  it('returns correct action by dismissPostVisitError', () => {
    const expectedAction = {
      type: HOME_POST_VISIT_DISMISS_ERROR,
    };
    expect(dismissPostVisitError()).toEqual(expectedAction);
  });

  it('handles action type HOME_POST_VISIT_BEGIN correctly', () => {
    const prevState = { postVisitPending: false };
    const state = reducer(
      prevState,
      { type: HOME_POST_VISIT_BEGIN }
    );
    expect(state).not.toBe(prevState); // should be immutable
    expect(state.postVisitPending).toBe(true);
  });

  it('handles action type HOME_POST_VISIT_SUCCESS correctly', () => {
    const prevState = { postVisitPending: true };
    const state = reducer(
      prevState,
      { type: HOME_POST_VISIT_SUCCESS, data: {} }
    );
    expect(state).not.toBe(prevState); // should be immutable
    expect(state.postVisitPending).toBe(false);
  });

  it('handles action type HOME_POST_VISIT_FAILURE correctly', () => {
    const prevState = { postVisitPending: true };
    const state = reducer(
      prevState,
      { type: HOME_POST_VISIT_FAILURE, data: { error: new Error('some error') } }
    );
    expect(state).not.toBe(prevState); // should be immutable
    expect(state.postVisitPending).toBe(false);
    expect(state.postVisitError).toEqual(expect.anything());
  });

  it('handles action type HOME_POST_VISIT_DISMISS_ERROR correctly', () => {
    const prevState = { postVisitError: new Error('some error') };
    const state = reducer(
      prevState,
      { type: HOME_POST_VISIT_DISMISS_ERROR }
    );
    expect(state).not.toBe(prevState); // should be immutable
    expect(state.postVisitError).toBe(null);
  });
});

