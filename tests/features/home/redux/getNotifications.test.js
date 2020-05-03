import configureMockStore from 'redux-mock-store';
import thunk from 'redux-thunk';
import nock from 'nock';

import {
  HOME_GET_NOTIFICATIONS_BEGIN,
  HOME_GET_NOTIFICATIONS_SUCCESS,
  HOME_GET_NOTIFICATIONS_FAILURE,
  HOME_GET_NOTIFICATIONS_DISMISS_ERROR,
} from '../../../../src/features/home/redux/constants';

import {
  getNotifications,
  dismissGetNotificationsError,
  reducer,
} from '../../../../src/features/home/redux/getNotifications';

const middlewares = [thunk];
const mockStore = configureMockStore(middlewares);

describe('home/redux/getNotifications', () => {
  afterEach(() => {
    nock.cleanAll();
  });

  it('dispatches success action when getNotifications succeeds', () => {
    const store = mockStore({});

    return store.dispatch(getNotifications())
      .then(() => {
        const actions = store.getActions();
        expect(actions[0]).toHaveProperty('type', HOME_GET_NOTIFICATIONS_BEGIN);
        expect(actions[1]).toHaveProperty('type', HOME_GET_NOTIFICATIONS_SUCCESS);
      });
  });

  it('dispatches failure action when getNotifications fails', () => {
    const store = mockStore({});

    return store.dispatch(getNotifications({ error: true }))
      .catch(() => {
        const actions = store.getActions();
        expect(actions[0]).toHaveProperty('type', HOME_GET_NOTIFICATIONS_BEGIN);
        expect(actions[1]).toHaveProperty('type', HOME_GET_NOTIFICATIONS_FAILURE);
        expect(actions[1]).toHaveProperty('data.error', expect.anything());
      });
  });

  it('returns correct action by dismissGetNotificationsError', () => {
    const expectedAction = {
      type: HOME_GET_NOTIFICATIONS_DISMISS_ERROR,
    };
    expect(dismissGetNotificationsError()).toEqual(expectedAction);
  });

  it('handles action type HOME_GET_NOTIFICATIONS_BEGIN correctly', () => {
    const prevState = { getNotificationsPending: false };
    const state = reducer(
      prevState,
      { type: HOME_GET_NOTIFICATIONS_BEGIN }
    );
    expect(state).not.toBe(prevState); // should be immutable
    expect(state.getNotificationsPending).toBe(true);
  });

  it('handles action type HOME_GET_NOTIFICATIONS_SUCCESS correctly', () => {
    const prevState = { getNotificationsPending: true };
    const state = reducer(
      prevState,
      { type: HOME_GET_NOTIFICATIONS_SUCCESS, data: {} }
    );
    expect(state).not.toBe(prevState); // should be immutable
    expect(state.getNotificationsPending).toBe(false);
  });

  it('handles action type HOME_GET_NOTIFICATIONS_FAILURE correctly', () => {
    const prevState = { getNotificationsPending: true };
    const state = reducer(
      prevState,
      { type: HOME_GET_NOTIFICATIONS_FAILURE, data: { error: new Error('some error') } }
    );
    expect(state).not.toBe(prevState); // should be immutable
    expect(state.getNotificationsPending).toBe(false);
    expect(state.getNotificationsError).toEqual(expect.anything());
  });

  it('handles action type HOME_GET_NOTIFICATIONS_DISMISS_ERROR correctly', () => {
    const prevState = { getNotificationsError: new Error('some error') };
    const state = reducer(
      prevState,
      { type: HOME_GET_NOTIFICATIONS_DISMISS_ERROR }
    );
    expect(state).not.toBe(prevState); // should be immutable
    expect(state.getNotificationsError).toBe(null);
  });
});

