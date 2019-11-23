import configureMockStore from 'redux-mock-store';
import thunk from 'redux-thunk';
import nock from 'nock';

import {
  HOME_SEND_COMMENT_BEGIN,
  HOME_SEND_COMMENT_SUCCESS,
  HOME_SEND_COMMENT_FAILURE,
  HOME_SEND_COMMENT_DISMISS_ERROR,
} from '../../../../src/features/home/redux/constants';

import {
  sendComment,
  dismissSendCommentError,
  reducer,
} from '../../../../src/features/home/redux/sendComment';

const middlewares = [thunk];
const mockStore = configureMockStore(middlewares);

describe('home/redux/sendComment', () => {
  afterEach(() => {
    nock.cleanAll();
  });

  it('dispatches success action when sendComment succeeds', () => {
    const store = mockStore({});

    return store.dispatch(sendComment())
      .then(() => {
        const actions = store.getActions();
        expect(actions[0]).toHaveProperty('type', HOME_SEND_COMMENT_BEGIN);
        expect(actions[1]).toHaveProperty('type', HOME_SEND_COMMENT_SUCCESS);
      });
  });

  it('dispatches failure action when sendComment fails', () => {
    const store = mockStore({});

    return store.dispatch(sendComment({ error: true }))
      .catch(() => {
        const actions = store.getActions();
        expect(actions[0]).toHaveProperty('type', HOME_SEND_COMMENT_BEGIN);
        expect(actions[1]).toHaveProperty('type', HOME_SEND_COMMENT_FAILURE);
        expect(actions[1]).toHaveProperty('data.error', expect.anything());
      });
  });

  it('returns correct action by dismissSendCommentError', () => {
    const expectedAction = {
      type: HOME_SEND_COMMENT_DISMISS_ERROR,
    };
    expect(dismissSendCommentError()).toEqual(expectedAction);
  });

  it('handles action type HOME_SEND_COMMENT_BEGIN correctly', () => {
    const prevState = { sendCommentPending: false };
    const state = reducer(
      prevState,
      { type: HOME_SEND_COMMENT_BEGIN }
    );
    expect(state).not.toBe(prevState); // should be immutable
    expect(state.sendCommentPending).toBe(true);
  });

  it('handles action type HOME_SEND_COMMENT_SUCCESS correctly', () => {
    const prevState = { sendCommentPending: true };
    const state = reducer(
      prevState,
      { type: HOME_SEND_COMMENT_SUCCESS, data: {} }
    );
    expect(state).not.toBe(prevState); // should be immutable
    expect(state.sendCommentPending).toBe(false);
  });

  it('handles action type HOME_SEND_COMMENT_FAILURE correctly', () => {
    const prevState = { sendCommentPending: true };
    const state = reducer(
      prevState,
      { type: HOME_SEND_COMMENT_FAILURE, data: { error: new Error('some error') } }
    );
    expect(state).not.toBe(prevState); // should be immutable
    expect(state.sendCommentPending).toBe(false);
    expect(state.sendCommentError).toEqual(expect.anything());
  });

  it('handles action type HOME_SEND_COMMENT_DISMISS_ERROR correctly', () => {
    const prevState = { sendCommentError: new Error('some error') };
    const state = reducer(
      prevState,
      { type: HOME_SEND_COMMENT_DISMISS_ERROR }
    );
    expect(state).not.toBe(prevState); // should be immutable
    expect(state.sendCommentError).toBe(null);
  });
});

