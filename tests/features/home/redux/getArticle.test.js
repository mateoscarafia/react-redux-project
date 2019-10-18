import configureMockStore from 'redux-mock-store';
import thunk from 'redux-thunk';
import nock from 'nock';

import {
  HOME_GET_ARTICLE_BEGIN,
  HOME_GET_ARTICLE_SUCCESS,
  HOME_GET_ARTICLE_FAILURE,
  HOME_GET_ARTICLE_DISMISS_ERROR,
} from '../../../../src/features/home/redux/constants';

import {
  getArticle,
  dismissGetArticleError,
  reducer,
} from '../../../../src/features/home/redux/getArticle';

const middlewares = [thunk];
const mockStore = configureMockStore(middlewares);

describe('home/redux/getArticle', () => {
  afterEach(() => {
    nock.cleanAll();
  });

  it('dispatches success action when getArticle succeeds', () => {
    const store = mockStore({});

    return store.dispatch(getArticle())
      .then(() => {
        const actions = store.getActions();
        expect(actions[0]).toHaveProperty('type', HOME_GET_ARTICLE_BEGIN);
        expect(actions[1]).toHaveProperty('type', HOME_GET_ARTICLE_SUCCESS);
      });
  });

  it('dispatches failure action when getArticle fails', () => {
    const store = mockStore({});

    return store.dispatch(getArticle({ error: true }))
      .catch(() => {
        const actions = store.getActions();
        expect(actions[0]).toHaveProperty('type', HOME_GET_ARTICLE_BEGIN);
        expect(actions[1]).toHaveProperty('type', HOME_GET_ARTICLE_FAILURE);
        expect(actions[1]).toHaveProperty('data.error', expect.anything());
      });
  });

  it('returns correct action by dismissGetArticleError', () => {
    const expectedAction = {
      type: HOME_GET_ARTICLE_DISMISS_ERROR,
    };
    expect(dismissGetArticleError()).toEqual(expectedAction);
  });

  it('handles action type HOME_GET_ARTICLE_BEGIN correctly', () => {
    const prevState = { getArticlePending: false };
    const state = reducer(
      prevState,
      { type: HOME_GET_ARTICLE_BEGIN }
    );
    expect(state).not.toBe(prevState); // should be immutable
    expect(state.getArticlePending).toBe(true);
  });

  it('handles action type HOME_GET_ARTICLE_SUCCESS correctly', () => {
    const prevState = { getArticlePending: true };
    const state = reducer(
      prevState,
      { type: HOME_GET_ARTICLE_SUCCESS, data: {} }
    );
    expect(state).not.toBe(prevState); // should be immutable
    expect(state.getArticlePending).toBe(false);
  });

  it('handles action type HOME_GET_ARTICLE_FAILURE correctly', () => {
    const prevState = { getArticlePending: true };
    const state = reducer(
      prevState,
      { type: HOME_GET_ARTICLE_FAILURE, data: { error: new Error('some error') } }
    );
    expect(state).not.toBe(prevState); // should be immutable
    expect(state.getArticlePending).toBe(false);
    expect(state.getArticleError).toEqual(expect.anything());
  });

  it('handles action type HOME_GET_ARTICLE_DISMISS_ERROR correctly', () => {
    const prevState = { getArticleError: new Error('some error') };
    const state = reducer(
      prevState,
      { type: HOME_GET_ARTICLE_DISMISS_ERROR }
    );
    expect(state).not.toBe(prevState); // should be immutable
    expect(state.getArticleError).toBe(null);
  });
});

