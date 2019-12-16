import configureMockStore from 'redux-mock-store';
import thunk from 'redux-thunk';
import nock from 'nock';

import {
  HOME_GET_LATEST_NEWS_BEGIN,
  HOME_GET_LATEST_NEWS_SUCCESS,
  HOME_GET_LATEST_NEWS_FAILURE,
  HOME_GET_LATEST_NEWS_DISMISS_ERROR,
} from '../../../../src/features/home/redux/constants';

import {
  getLatestNews,
  dismissGetLatestNewsError,
  reducer,
} from '../../../../src/features/home/redux/getLatestNews';

const middlewares = [thunk];
const mockStore = configureMockStore(middlewares);

describe('home/redux/getLatestNews', () => {
  afterEach(() => {
    nock.cleanAll();
  });

  it('dispatches success action when getLatestNews succeeds', () => {
    const store = mockStore({});

    return store.dispatch(getLatestNews())
      .then(() => {
        const actions = store.getActions();
        expect(actions[0]).toHaveProperty('type', HOME_GET_LATEST_NEWS_BEGIN);
        expect(actions[1]).toHaveProperty('type', HOME_GET_LATEST_NEWS_SUCCESS);
      });
  });

  it('dispatches failure action when getLatestNews fails', () => {
    const store = mockStore({});

    return store.dispatch(getLatestNews({ error: true }))
      .catch(() => {
        const actions = store.getActions();
        expect(actions[0]).toHaveProperty('type', HOME_GET_LATEST_NEWS_BEGIN);
        expect(actions[1]).toHaveProperty('type', HOME_GET_LATEST_NEWS_FAILURE);
        expect(actions[1]).toHaveProperty('data.error', expect.anything());
      });
  });

  it('returns correct action by dismissGetLatestNewsError', () => {
    const expectedAction = {
      type: HOME_GET_LATEST_NEWS_DISMISS_ERROR,
    };
    expect(dismissGetLatestNewsError()).toEqual(expectedAction);
  });

  it('handles action type HOME_GET_LATEST_NEWS_BEGIN correctly', () => {
    const prevState = { getLatestNewsPending: false };
    const state = reducer(
      prevState,
      { type: HOME_GET_LATEST_NEWS_BEGIN }
    );
    expect(state).not.toBe(prevState); // should be immutable
    expect(state.getLatestNewsPending).toBe(true);
  });

  it('handles action type HOME_GET_LATEST_NEWS_SUCCESS correctly', () => {
    const prevState = { getLatestNewsPending: true };
    const state = reducer(
      prevState,
      { type: HOME_GET_LATEST_NEWS_SUCCESS, data: {} }
    );
    expect(state).not.toBe(prevState); // should be immutable
    expect(state.getLatestNewsPending).toBe(false);
  });

  it('handles action type HOME_GET_LATEST_NEWS_FAILURE correctly', () => {
    const prevState = { getLatestNewsPending: true };
    const state = reducer(
      prevState,
      { type: HOME_GET_LATEST_NEWS_FAILURE, data: { error: new Error('some error') } }
    );
    expect(state).not.toBe(prevState); // should be immutable
    expect(state.getLatestNewsPending).toBe(false);
    expect(state.getLatestNewsError).toEqual(expect.anything());
  });

  it('handles action type HOME_GET_LATEST_NEWS_DISMISS_ERROR correctly', () => {
    const prevState = { getLatestNewsError: new Error('some error') };
    const state = reducer(
      prevState,
      { type: HOME_GET_LATEST_NEWS_DISMISS_ERROR }
    );
    expect(state).not.toBe(prevState); // should be immutable
    expect(state.getLatestNewsError).toBe(null);
  });
});

