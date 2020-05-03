import configureMockStore from 'redux-mock-store';
import thunk from 'redux-thunk';
import nock from 'nock';

import {
  HOME_CHECK_NOTIFICATION_BEGIN,
  HOME_CHECK_NOTIFICATION_SUCCESS,
  HOME_CHECK_NOTIFICATION_FAILURE,
  HOME_CHECK_NOTIFICATION_DISMISS_ERROR,
} from '../../../../src/features/home/redux/constants';

import {
  checkNotification,
  dismissCheckNotificationError,
  reducer,
} from '../../../../src/features/home/redux/checkNotification';

const middlewares = [thunk];
const mockStore = configureMockStore(middlewares);

describe('home/redux/checkNotification', () => {
  afterEach(() => {
    nock.cleanAll();
  });

  it('dispatches success action when checkNotification succeeds', () => {
    const store = mockStore({});

    return store.dispatch(checkNotification())
      .then(() => {
        const actions = store.getActions();
        expect(actions[0]).toHaveProperty('type', HOME_CHECK_NOTIFICATION_BEGIN);
        expect(actions[1]).toHaveProperty('type', HOME_CHECK_NOTIFICATION_SUCCESS);
      });
  });

  it('dispatches failure action when checkNotification fails', () => {
    const store = mockStore({});

    return store.dispatch(checkNotification({ error: true }))
      .catch(() => {
        const actions = store.getActions();
        expect(actions[0]).toHaveProperty('type', HOME_CHECK_NOTIFICATION_BEGIN);
        expect(actions[1]).toHaveProperty('type', HOME_CHECK_NOTIFICATION_FAILURE);
        expect(actions[1]).toHaveProperty('data.error', expect.anything());
      });
  });

  it('returns correct action by dismissCheckNotificationError', () => {
    const expectedAction = {
      type: HOME_CHECK_NOTIFICATION_DISMISS_ERROR,
    };
    expect(dismissCheckNotificationError()).toEqual(expectedAction);
  });

  it('handles action type HOME_CHECK_NOTIFICATION_BEGIN correctly', () => {
    const prevState = { checkNotificationPending: false };
    const state = reducer(
      prevState,
      { type: HOME_CHECK_NOTIFICATION_BEGIN }
    );
    expect(state).not.toBe(prevState); // should be immutable
    expect(state.checkNotificationPending).toBe(true);
  });

  it('handles action type HOME_CHECK_NOTIFICATION_SUCCESS correctly', () => {
    const prevState = { checkNotificationPending: true };
    const state = reducer(
      prevState,
      { type: HOME_CHECK_NOTIFICATION_SUCCESS, data: {} }
    );
    expect(state).not.toBe(prevState); // should be immutable
    expect(state.checkNotificationPending).toBe(false);
  });

  it('handles action type HOME_CHECK_NOTIFICATION_FAILURE correctly', () => {
    const prevState = { checkNotificationPending: true };
    const state = reducer(
      prevState,
      { type: HOME_CHECK_NOTIFICATION_FAILURE, data: { error: new Error('some error') } }
    );
    expect(state).not.toBe(prevState); // should be immutable
    expect(state.checkNotificationPending).toBe(false);
    expect(state.checkNotificationError).toEqual(expect.anything());
  });

  it('handles action type HOME_CHECK_NOTIFICATION_DISMISS_ERROR correctly', () => {
    const prevState = { checkNotificationError: new Error('some error') };
    const state = reducer(
      prevState,
      { type: HOME_CHECK_NOTIFICATION_DISMISS_ERROR }
    );
    expect(state).not.toBe(prevState); // should be immutable
    expect(state.checkNotificationError).toBe(null);
  });
});

