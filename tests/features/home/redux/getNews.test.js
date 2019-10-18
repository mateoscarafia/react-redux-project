import configureMockStore from 'redux-mock-store';
import thunk from 'redux-thunk';
import nock from 'nock';

import {
  HOME_GET_NEWS_BEGIN,
  HOME_GET_NEWS_SUCCESS,
  HOME_GET_NEWS_FAILURE,
  HOME_GET_NEWS_DISMISS_ERROR,
} from '../../../../src/features/home/redux/constants';

import {
  getNews,
  dismissGetNewsError,
  reducer,
} from '../../../../src/features/home/redux/getNews';

const middlewares = [thunk];
const mockStore = configureMockStore(middlewares);

describe('home/redux/getNews', () => {
  afterEach(() => {
    nock.cleanAll();
  });

  it('dispatches success action when getNews succeeds', () => {
    const store = mockStore({});

    return store.dispatch(getNews())
      .then(() => {
        const actions = store.getActions();
        expect(actions[0]).toHaveProperty('type', HOME_GET_NEWS_BEGIN);
        expect(actions[1]).toHaveProperty('type', HOME_GET_NEWS_SUCCESS);
      });
  });

  it('dispatches failure action when getNews fails', () => {
    const store = mockStore({});

    return store.dispatch(getNews({ error: true }))
      .catch(() => {
        const actions = store.getActions();
        expect(actions[0]).toHaveProperty('type', HOME_GET_NEWS_BEGIN);
        expect(actions[1]).toHaveProperty('type', HOME_GET_NEWS_FAILURE);
        expect(actions[1]).toHaveProperty('data.error', expect.anything());
      });
  });

  it('returns correct action by dismissGetNewsError', () => {
    const expectedAction = {
      type: HOME_GET_NEWS_DISMISS_ERROR,
    };
    expect(dismissGetNewsError()).toEqual(expectedAction);
  });

  it('handles action type HOME_GET_NEWS_BEGIN correctly', () => {
    const prevState = { getNewsPending: false };
    const state = reducer(
      prevState,
      { type: HOME_GET_NEWS_BEGIN }
    );
    expect(state).not.toBe(prevState); // should be immutable
    expect(state.getNewsPending).toBe(true);
  });

  it('handles action type HOME_GET_NEWS_SUCCESS correctly', () => {
    const prevState = { getNewsPending: true };
    const state = reducer(
      prevState,
      { type: HOME_GET_NEWS_SUCCESS, data: {} }
    );
    expect(state).not.toBe(prevState); // should be immutable
    expect(state.getNewsPending).toBe(false);
  });

  it('handles action type HOME_GET_NEWS_FAILURE correctly', () => {
    const prevState = { getNewsPending: true };
    const state = reducer(
      prevState,
      { type: HOME_GET_NEWS_FAILURE, data: { error: new Error('some error') } }
    );
    expect(state).not.toBe(prevState); // should be immutable
    expect(state.getNewsPending).toBe(false);
    expect(state.getNewsError).toEqual(expect.anything());
  });

  it('handles action type HOME_GET_NEWS_DISMISS_ERROR correctly', () => {
    const prevState = { getNewsError: new Error('some error') };
    const state = reducer(
      prevState,
      { type: HOME_GET_NEWS_DISMISS_ERROR }
    );
    expect(state).not.toBe(prevState); // should be immutable
    expect(state.getNewsError).toBe(null);
  });
});

