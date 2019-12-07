import configureMockStore from 'redux-mock-store';
import thunk from 'redux-thunk';
import nock from 'nock';

import {
  HOME_GET_MESSAGES_BEGIN,
  HOME_GET_MESSAGES_SUCCESS,
  HOME_GET_MESSAGES_FAILURE,
  HOME_GET_MESSAGES_DISMISS_ERROR,
} from '../../../../src/features/home/redux/constants';

import {
  getMessages,
  dismissGetMessagesError,
  reducer,
} from '../../../../src/features/home/redux/getMessages';

const middlewares = [thunk];
const mockStore = configureMockStore(middlewares);

describe('home/redux/getMessages', () => {
  afterEach(() => {
    nock.cleanAll();
  });

  it('dispatches success action when getMessages succeeds', () => {
    const store = mockStore({});

    return store.dispatch(getMessages())
      .then(() => {
        const actions = store.getActions();
        expect(actions[0]).toHaveProperty('type', HOME_GET_MESSAGES_BEGIN);
        expect(actions[1]).toHaveProperty('type', HOME_GET_MESSAGES_SUCCESS);
      });
  });

  it('dispatches failure action when getMessages fails', () => {
    const store = mockStore({});

    return store.dispatch(getMessages({ error: true }))
      .catch(() => {
        const actions = store.getActions();
        expect(actions[0]).toHaveProperty('type', HOME_GET_MESSAGES_BEGIN);
        expect(actions[1]).toHaveProperty('type', HOME_GET_MESSAGES_FAILURE);
        expect(actions[1]).toHaveProperty('data.error', expect.anything());
      });
  });

  it('returns correct action by dismissGetMessagesError', () => {
    const expectedAction = {
      type: HOME_GET_MESSAGES_DISMISS_ERROR,
    };
    expect(dismissGetMessagesError()).toEqual(expectedAction);
  });

  it('handles action type HOME_GET_MESSAGES_BEGIN correctly', () => {
    const prevState = { getMessagesPending: false };
    const state = reducer(
      prevState,
      { type: HOME_GET_MESSAGES_BEGIN }
    );
    expect(state).not.toBe(prevState); // should be immutable
    expect(state.getMessagesPending).toBe(true);
  });

  it('handles action type HOME_GET_MESSAGES_SUCCESS correctly', () => {
    const prevState = { getMessagesPending: true };
    const state = reducer(
      prevState,
      { type: HOME_GET_MESSAGES_SUCCESS, data: {} }
    );
    expect(state).not.toBe(prevState); // should be immutable
    expect(state.getMessagesPending).toBe(false);
  });

  it('handles action type HOME_GET_MESSAGES_FAILURE correctly', () => {
    const prevState = { getMessagesPending: true };
    const state = reducer(
      prevState,
      { type: HOME_GET_MESSAGES_FAILURE, data: { error: new Error('some error') } }
    );
    expect(state).not.toBe(prevState); // should be immutable
    expect(state.getMessagesPending).toBe(false);
    expect(state.getMessagesError).toEqual(expect.anything());
  });

  it('handles action type HOME_GET_MESSAGES_DISMISS_ERROR correctly', () => {
    const prevState = { getMessagesError: new Error('some error') };
    const state = reducer(
      prevState,
      { type: HOME_GET_MESSAGES_DISMISS_ERROR }
    );
    expect(state).not.toBe(prevState); // should be immutable
    expect(state.getMessagesError).toBe(null);
  });
});

