import configureMockStore from 'redux-mock-store';
import thunk from 'redux-thunk';
import nock from 'nock';

import {
  HOME_POST_VIEWS_BEGIN,
  HOME_POST_VIEWS_SUCCESS,
  HOME_POST_VIEWS_FAILURE,
  HOME_POST_VIEWS_DISMISS_ERROR,
} from '../../../../src/features/home/redux/constants';

import {
  postViews,
  dismissPostViewsError,
  reducer,
} from '../../../../src/features/home/redux/postViews';

const middlewares = [thunk];
const mockStore = configureMockStore(middlewares);

describe('home/redux/postViews', () => {
  afterEach(() => {
    nock.cleanAll();
  });

  it('dispatches success action when postViews succeeds', () => {
    const store = mockStore({});

    return store.dispatch(postViews())
      .then(() => {
        const actions = store.getActions();
        expect(actions[0]).toHaveProperty('type', HOME_POST_VIEWS_BEGIN);
        expect(actions[1]).toHaveProperty('type', HOME_POST_VIEWS_SUCCESS);
      });
  });

  it('dispatches failure action when postViews fails', () => {
    const store = mockStore({});

    return store.dispatch(postViews({ error: true }))
      .catch(() => {
        const actions = store.getActions();
        expect(actions[0]).toHaveProperty('type', HOME_POST_VIEWS_BEGIN);
        expect(actions[1]).toHaveProperty('type', HOME_POST_VIEWS_FAILURE);
        expect(actions[1]).toHaveProperty('data.error', expect.anything());
      });
  });

  it('returns correct action by dismissPostViewsError', () => {
    const expectedAction = {
      type: HOME_POST_VIEWS_DISMISS_ERROR,
    };
    expect(dismissPostViewsError()).toEqual(expectedAction);
  });

  it('handles action type HOME_POST_VIEWS_BEGIN correctly', () => {
    const prevState = { postViewsPending: false };
    const state = reducer(
      prevState,
      { type: HOME_POST_VIEWS_BEGIN }
    );
    expect(state).not.toBe(prevState); // should be immutable
    expect(state.postViewsPending).toBe(true);
  });

  it('handles action type HOME_POST_VIEWS_SUCCESS correctly', () => {
    const prevState = { postViewsPending: true };
    const state = reducer(
      prevState,
      { type: HOME_POST_VIEWS_SUCCESS, data: {} }
    );
    expect(state).not.toBe(prevState); // should be immutable
    expect(state.postViewsPending).toBe(false);
  });

  it('handles action type HOME_POST_VIEWS_FAILURE correctly', () => {
    const prevState = { postViewsPending: true };
    const state = reducer(
      prevState,
      { type: HOME_POST_VIEWS_FAILURE, data: { error: new Error('some error') } }
    );
    expect(state).not.toBe(prevState); // should be immutable
    expect(state.postViewsPending).toBe(false);
    expect(state.postViewsError).toEqual(expect.anything());
  });

  it('handles action type HOME_POST_VIEWS_DISMISS_ERROR correctly', () => {
    const prevState = { postViewsError: new Error('some error') };
    const state = reducer(
      prevState,
      { type: HOME_POST_VIEWS_DISMISS_ERROR }
    );
    expect(state).not.toBe(prevState); // should be immutable
    expect(state.postViewsError).toBe(null);
  });
});

