import configureMockStore from 'redux-mock-store';
import thunk from 'redux-thunk';
import nock from 'nock';

import {
  HOME_POST_MESSAGE_BEGIN,
  HOME_POST_MESSAGE_SUCCESS,
  HOME_POST_MESSAGE_FAILURE,
  HOME_POST_MESSAGE_DISMISS_ERROR,
} from '../../../../src/features/home/redux/constants';

import {
  postMessage,
  dismissPostMessageError,
  reducer,
} from '../../../../src/features/home/redux/postMessage';

const middlewares = [thunk];
const mockStore = configureMockStore(middlewares);

describe('home/redux/postMessage', () => {
  afterEach(() => {
    nock.cleanAll();
  });

  it('dispatches success action when postMessage succeeds', () => {
    const store = mockStore({});

    return store.dispatch(postMessage())
      .then(() => {
        const actions = store.getActions();
        expect(actions[0]).toHaveProperty('type', HOME_POST_MESSAGE_BEGIN);
        expect(actions[1]).toHaveProperty('type', HOME_POST_MESSAGE_SUCCESS);
      });
  });

  it('dispatches failure action when postMessage fails', () => {
    const store = mockStore({});

    return store.dispatch(postMessage({ error: true }))
      .catch(() => {
        const actions = store.getActions();
        expect(actions[0]).toHaveProperty('type', HOME_POST_MESSAGE_BEGIN);
        expect(actions[1]).toHaveProperty('type', HOME_POST_MESSAGE_FAILURE);
        expect(actions[1]).toHaveProperty('data.error', expect.anything());
      });
  });

  it('returns correct action by dismissPostMessageError', () => {
    const expectedAction = {
      type: HOME_POST_MESSAGE_DISMISS_ERROR,
    };
    expect(dismissPostMessageError()).toEqual(expectedAction);
  });

  it('handles action type HOME_POST_MESSAGE_BEGIN correctly', () => {
    const prevState = { postMessagePending: false };
    const state = reducer(
      prevState,
      { type: HOME_POST_MESSAGE_BEGIN }
    );
    expect(state).not.toBe(prevState); // should be immutable
    expect(state.postMessagePending).toBe(true);
  });

  it('handles action type HOME_POST_MESSAGE_SUCCESS correctly', () => {
    const prevState = { postMessagePending: true };
    const state = reducer(
      prevState,
      { type: HOME_POST_MESSAGE_SUCCESS, data: {} }
    );
    expect(state).not.toBe(prevState); // should be immutable
    expect(state.postMessagePending).toBe(false);
  });

  it('handles action type HOME_POST_MESSAGE_FAILURE correctly', () => {
    const prevState = { postMessagePending: true };
    const state = reducer(
      prevState,
      { type: HOME_POST_MESSAGE_FAILURE, data: { error: new Error('some error') } }
    );
    expect(state).not.toBe(prevState); // should be immutable
    expect(state.postMessagePending).toBe(false);
    expect(state.postMessageError).toEqual(expect.anything());
  });

  it('handles action type HOME_POST_MESSAGE_DISMISS_ERROR correctly', () => {
    const prevState = { postMessageError: new Error('some error') };
    const state = reducer(
      prevState,
      { type: HOME_POST_MESSAGE_DISMISS_ERROR }
    );
    expect(state).not.toBe(prevState); // should be immutable
    expect(state.postMessageError).toBe(null);
  });
});

