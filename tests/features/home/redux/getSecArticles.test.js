import configureMockStore from 'redux-mock-store';
import thunk from 'redux-thunk';
import nock from 'nock';

import {
  HOME_GET_SEC_ARTICLES_BEGIN,
  HOME_GET_SEC_ARTICLES_SUCCESS,
  HOME_GET_SEC_ARTICLES_FAILURE,
  HOME_GET_SEC_ARTICLES_DISMISS_ERROR,
} from '../../../../src/features/home/redux/constants';

import {
  getSecArticles,
  dismissGetSecArticlesError,
  reducer,
} from '../../../../src/features/home/redux/getSecArticles';

const middlewares = [thunk];
const mockStore = configureMockStore(middlewares);

describe('home/redux/getSecArticles', () => {
  afterEach(() => {
    nock.cleanAll();
  });

  it('dispatches success action when getSecArticles succeeds', () => {
    const store = mockStore({});

    return store.dispatch(getSecArticles())
      .then(() => {
        const actions = store.getActions();
        expect(actions[0]).toHaveProperty('type', HOME_GET_SEC_ARTICLES_BEGIN);
        expect(actions[1]).toHaveProperty('type', HOME_GET_SEC_ARTICLES_SUCCESS);
      });
  });

  it('dispatches failure action when getSecArticles fails', () => {
    const store = mockStore({});

    return store.dispatch(getSecArticles({ error: true }))
      .catch(() => {
        const actions = store.getActions();
        expect(actions[0]).toHaveProperty('type', HOME_GET_SEC_ARTICLES_BEGIN);
        expect(actions[1]).toHaveProperty('type', HOME_GET_SEC_ARTICLES_FAILURE);
        expect(actions[1]).toHaveProperty('data.error', expect.anything());
      });
  });

  it('returns correct action by dismissGetSecArticlesError', () => {
    const expectedAction = {
      type: HOME_GET_SEC_ARTICLES_DISMISS_ERROR,
    };
    expect(dismissGetSecArticlesError()).toEqual(expectedAction);
  });

  it('handles action type HOME_GET_SEC_ARTICLES_BEGIN correctly', () => {
    const prevState = { getSecArticlesPending: false };
    const state = reducer(
      prevState,
      { type: HOME_GET_SEC_ARTICLES_BEGIN }
    );
    expect(state).not.toBe(prevState); // should be immutable
    expect(state.getSecArticlesPending).toBe(true);
  });

  it('handles action type HOME_GET_SEC_ARTICLES_SUCCESS correctly', () => {
    const prevState = { getSecArticlesPending: true };
    const state = reducer(
      prevState,
      { type: HOME_GET_SEC_ARTICLES_SUCCESS, data: {} }
    );
    expect(state).not.toBe(prevState); // should be immutable
    expect(state.getSecArticlesPending).toBe(false);
  });

  it('handles action type HOME_GET_SEC_ARTICLES_FAILURE correctly', () => {
    const prevState = { getSecArticlesPending: true };
    const state = reducer(
      prevState,
      { type: HOME_GET_SEC_ARTICLES_FAILURE, data: { error: new Error('some error') } }
    );
    expect(state).not.toBe(prevState); // should be immutable
    expect(state.getSecArticlesPending).toBe(false);
    expect(state.getSecArticlesError).toEqual(expect.anything());
  });

  it('handles action type HOME_GET_SEC_ARTICLES_DISMISS_ERROR correctly', () => {
    const prevState = { getSecArticlesError: new Error('some error') };
    const state = reducer(
      prevState,
      { type: HOME_GET_SEC_ARTICLES_DISMISS_ERROR }
    );
    expect(state).not.toBe(prevState); // should be immutable
    expect(state.getSecArticlesError).toBe(null);
  });
});

