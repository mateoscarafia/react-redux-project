import configureMockStore from 'redux-mock-store';
import thunk from 'redux-thunk';
import nock from 'nock';

import {
  HOME_GET_COMMENTS_BEGIN,
  HOME_GET_COMMENTS_SUCCESS,
  HOME_GET_COMMENTS_FAILURE,
  HOME_GET_COMMENTS_DISMISS_ERROR,
} from '../../../../src/features/home/redux/constants';

import {
  getComments,
  dismissGetCommentsError,
  reducer,
} from '../../../../src/features/home/redux/getComments';

const middlewares = [thunk];
const mockStore = configureMockStore(middlewares);

describe('home/redux/getComments', () => {
  afterEach(() => {
    nock.cleanAll();
  });

  it('dispatches success action when getComments succeeds', () => {
    const store = mockStore({});

    return store.dispatch(getComments())
      .then(() => {
        const actions = store.getActions();
        expect(actions[0]).toHaveProperty('type', HOME_GET_COMMENTS_BEGIN);
        expect(actions[1]).toHaveProperty('type', HOME_GET_COMMENTS_SUCCESS);
      });
  });

  it('dispatches failure action when getComments fails', () => {
    const store = mockStore({});

    return store.dispatch(getComments({ error: true }))
      .catch(() => {
        const actions = store.getActions();
        expect(actions[0]).toHaveProperty('type', HOME_GET_COMMENTS_BEGIN);
        expect(actions[1]).toHaveProperty('type', HOME_GET_COMMENTS_FAILURE);
        expect(actions[1]).toHaveProperty('data.error', expect.anything());
      });
  });

  it('returns correct action by dismissGetCommentsError', () => {
    const expectedAction = {
      type: HOME_GET_COMMENTS_DISMISS_ERROR,
    };
    expect(dismissGetCommentsError()).toEqual(expectedAction);
  });

  it('handles action type HOME_GET_COMMENTS_BEGIN correctly', () => {
    const prevState = { getCommentsPending: false };
    const state = reducer(
      prevState,
      { type: HOME_GET_COMMENTS_BEGIN }
    );
    expect(state).not.toBe(prevState); // should be immutable
    expect(state.getCommentsPending).toBe(true);
  });

  it('handles action type HOME_GET_COMMENTS_SUCCESS correctly', () => {
    const prevState = { getCommentsPending: true };
    const state = reducer(
      prevState,
      { type: HOME_GET_COMMENTS_SUCCESS, data: {} }
    );
    expect(state).not.toBe(prevState); // should be immutable
    expect(state.getCommentsPending).toBe(false);
  });

  it('handles action type HOME_GET_COMMENTS_FAILURE correctly', () => {
    const prevState = { getCommentsPending: true };
    const state = reducer(
      prevState,
      { type: HOME_GET_COMMENTS_FAILURE, data: { error: new Error('some error') } }
    );
    expect(state).not.toBe(prevState); // should be immutable
    expect(state.getCommentsPending).toBe(false);
    expect(state.getCommentsError).toEqual(expect.anything());
  });

  it('handles action type HOME_GET_COMMENTS_DISMISS_ERROR correctly', () => {
    const prevState = { getCommentsError: new Error('some error') };
    const state = reducer(
      prevState,
      { type: HOME_GET_COMMENTS_DISMISS_ERROR }
    );
    expect(state).not.toBe(prevState); // should be immutable
    expect(state.getCommentsError).toBe(null);
  });
});

