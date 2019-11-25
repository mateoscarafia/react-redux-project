import configureMockStore from 'redux-mock-store';
import thunk from 'redux-thunk';
import nock from 'nock';

import {
  HOME_DELETE_COMMENT_BEGIN,
  HOME_DELETE_COMMENT_SUCCESS,
  HOME_DELETE_COMMENT_FAILURE,
  HOME_DELETE_COMMENT_DISMISS_ERROR,
} from '../../../../src/features/home/redux/constants';

import {
  deleteComment,
  dismissDeleteCommentError,
  reducer,
} from '../../../../src/features/home/redux/deleteComment';

const middlewares = [thunk];
const mockStore = configureMockStore(middlewares);

describe('home/redux/deleteComment', () => {
  afterEach(() => {
    nock.cleanAll();
  });

  it('dispatches success action when deleteComment succeeds', () => {
    const store = mockStore({});

    return store.dispatch(deleteComment())
      .then(() => {
        const actions = store.getActions();
        expect(actions[0]).toHaveProperty('type', HOME_DELETE_COMMENT_BEGIN);
        expect(actions[1]).toHaveProperty('type', HOME_DELETE_COMMENT_SUCCESS);
      });
  });

  it('dispatches failure action when deleteComment fails', () => {
    const store = mockStore({});

    return store.dispatch(deleteComment({ error: true }))
      .catch(() => {
        const actions = store.getActions();
        expect(actions[0]).toHaveProperty('type', HOME_DELETE_COMMENT_BEGIN);
        expect(actions[1]).toHaveProperty('type', HOME_DELETE_COMMENT_FAILURE);
        expect(actions[1]).toHaveProperty('data.error', expect.anything());
      });
  });

  it('returns correct action by dismissDeleteCommentError', () => {
    const expectedAction = {
      type: HOME_DELETE_COMMENT_DISMISS_ERROR,
    };
    expect(dismissDeleteCommentError()).toEqual(expectedAction);
  });

  it('handles action type HOME_DELETE_COMMENT_BEGIN correctly', () => {
    const prevState = { deleteCommentPending: false };
    const state = reducer(
      prevState,
      { type: HOME_DELETE_COMMENT_BEGIN }
    );
    expect(state).not.toBe(prevState); // should be immutable
    expect(state.deleteCommentPending).toBe(true);
  });

  it('handles action type HOME_DELETE_COMMENT_SUCCESS correctly', () => {
    const prevState = { deleteCommentPending: true };
    const state = reducer(
      prevState,
      { type: HOME_DELETE_COMMENT_SUCCESS, data: {} }
    );
    expect(state).not.toBe(prevState); // should be immutable
    expect(state.deleteCommentPending).toBe(false);
  });

  it('handles action type HOME_DELETE_COMMENT_FAILURE correctly', () => {
    const prevState = { deleteCommentPending: true };
    const state = reducer(
      prevState,
      { type: HOME_DELETE_COMMENT_FAILURE, data: { error: new Error('some error') } }
    );
    expect(state).not.toBe(prevState); // should be immutable
    expect(state.deleteCommentPending).toBe(false);
    expect(state.deleteCommentError).toEqual(expect.anything());
  });

  it('handles action type HOME_DELETE_COMMENT_DISMISS_ERROR correctly', () => {
    const prevState = { deleteCommentError: new Error('some error') };
    const state = reducer(
      prevState,
      { type: HOME_DELETE_COMMENT_DISMISS_ERROR }
    );
    expect(state).not.toBe(prevState); // should be immutable
    expect(state.deleteCommentError).toBe(null);
  });
});

