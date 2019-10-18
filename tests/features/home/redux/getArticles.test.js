import configureMockStore from 'redux-mock-store';
import thunk from 'redux-thunk';
import nock from 'nock';

import {
  HOME_GET_ARTICLES_BEGIN,
  HOME_GET_ARTICLES_SUCCESS,
  HOME_GET_ARTICLES_FAILURE,
  HOME_GET_ARTICLES_DISMISS_ERROR,
} from '../../../../src/features/home/redux/constants';

import {
  getArticles,
  dismissGetArticlesError,
  reducer,
} from '../../../../src/features/home/redux/getArticles';

const middlewares = [thunk];
const mockStore = configureMockStore(middlewares);

describe('home/redux/getArticles', () => {
  afterEach(() => {
    nock.cleanAll();
  });

  it('dispatches success action when getArticles succeeds', () => {
    const store = mockStore({});

    return store.dispatch(getArticles())
      .then(() => {
        const actions = store.getActions();
        expect(actions[0]).toHaveProperty('type', HOME_GET_ARTICLES_BEGIN);
        expect(actions[1]).toHaveProperty('type', HOME_GET_ARTICLES_SUCCESS);
      });
  });

  it('dispatches failure action when getArticles fails', () => {
    const store = mockStore({});

    return store.dispatch(getArticles({ error: true }))
      .catch(() => {
        const actions = store.getActions();
        expect(actions[0]).toHaveProperty('type', HOME_GET_ARTICLES_BEGIN);
        expect(actions[1]).toHaveProperty('type', HOME_GET_ARTICLES_FAILURE);
        expect(actions[1]).toHaveProperty('data.error', expect.anything());
      });
  });

  it('returns correct action by dismissGetArticlesError', () => {
    const expectedAction = {
      type: HOME_GET_ARTICLES_DISMISS_ERROR,
    };
    expect(dismissGetArticlesError()).toEqual(expectedAction);
  });

  it('handles action type HOME_GET_ARTICLES_BEGIN correctly', () => {
    const prevState = { getArticlesPending: false };
    const state = reducer(
      prevState,
      { type: HOME_GET_ARTICLES_BEGIN }
    );
    expect(state).not.toBe(prevState); // should be immutable
    expect(state.getArticlesPending).toBe(true);
  });

  it('handles action type HOME_GET_ARTICLES_SUCCESS correctly', () => {
    const prevState = { getArticlesPending: true };
    const state = reducer(
      prevState,
      { type: HOME_GET_ARTICLES_SUCCESS, data: {} }
    );
    expect(state).not.toBe(prevState); // should be immutable
    expect(state.getArticlesPending).toBe(false);
  });

  it('handles action type HOME_GET_ARTICLES_FAILURE correctly', () => {
    const prevState = { getArticlesPending: true };
    const state = reducer(
      prevState,
      { type: HOME_GET_ARTICLES_FAILURE, data: { error: new Error('some error') } }
    );
    expect(state).not.toBe(prevState); // should be immutable
    expect(state.getArticlesPending).toBe(false);
    expect(state.getArticlesError).toEqual(expect.anything());
  });

  it('handles action type HOME_GET_ARTICLES_DISMISS_ERROR correctly', () => {
    const prevState = { getArticlesError: new Error('some error') };
    const state = reducer(
      prevState,
      { type: HOME_GET_ARTICLES_DISMISS_ERROR }
    );
    expect(state).not.toBe(prevState); // should be immutable
    expect(state.getArticlesError).toBe(null);
  });
});

