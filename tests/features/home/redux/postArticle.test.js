import configureMockStore from 'redux-mock-store';
import thunk from 'redux-thunk';
import nock from 'nock';

import {
  HOME_POST_ARTICLE_BEGIN,
  HOME_POST_ARTICLE_SUCCESS,
  HOME_POST_ARTICLE_FAILURE,
  HOME_POST_ARTICLE_DISMISS_ERROR,
} from '../../../../src/features/home/redux/constants';

import {
  postArticle,
  dismissPostArticleError,
  reducer,
} from '../../../../src/features/home/redux/postArticle';

const middlewares = [thunk];
const mockStore = configureMockStore(middlewares);

describe('home/redux/postArticle', () => {
  afterEach(() => {
    nock.cleanAll();
  });

  it('dispatches success action when postArticle succeeds', () => {
    const store = mockStore({});

    return store.dispatch(postArticle())
      .then(() => {
        const actions = store.getActions();
        expect(actions[0]).toHaveProperty('type', HOME_POST_ARTICLE_BEGIN);
        expect(actions[1]).toHaveProperty('type', HOME_POST_ARTICLE_SUCCESS);
      });
  });

  it('dispatches failure action when postArticle fails', () => {
    const store = mockStore({});

    return store.dispatch(postArticle({ error: true }))
      .catch(() => {
        const actions = store.getActions();
        expect(actions[0]).toHaveProperty('type', HOME_POST_ARTICLE_BEGIN);
        expect(actions[1]).toHaveProperty('type', HOME_POST_ARTICLE_FAILURE);
        expect(actions[1]).toHaveProperty('data.error', expect.anything());
      });
  });

  it('returns correct action by dismissPostArticleError', () => {
    const expectedAction = {
      type: HOME_POST_ARTICLE_DISMISS_ERROR,
    };
    expect(dismissPostArticleError()).toEqual(expectedAction);
  });

  it('handles action type HOME_POST_ARTICLE_BEGIN correctly', () => {
    const prevState = { postArticlePending: false };
    const state = reducer(
      prevState,
      { type: HOME_POST_ARTICLE_BEGIN }
    );
    expect(state).not.toBe(prevState); // should be immutable
    expect(state.postArticlePending).toBe(true);
  });

  it('handles action type HOME_POST_ARTICLE_SUCCESS correctly', () => {
    const prevState = { postArticlePending: true };
    const state = reducer(
      prevState,
      { type: HOME_POST_ARTICLE_SUCCESS, data: {} }
    );
    expect(state).not.toBe(prevState); // should be immutable
    expect(state.postArticlePending).toBe(false);
  });

  it('handles action type HOME_POST_ARTICLE_FAILURE correctly', () => {
    const prevState = { postArticlePending: true };
    const state = reducer(
      prevState,
      { type: HOME_POST_ARTICLE_FAILURE, data: { error: new Error('some error') } }
    );
    expect(state).not.toBe(prevState); // should be immutable
    expect(state.postArticlePending).toBe(false);
    expect(state.postArticleError).toEqual(expect.anything());
  });

  it('handles action type HOME_POST_ARTICLE_DISMISS_ERROR correctly', () => {
    const prevState = { postArticleError: new Error('some error') };
    const state = reducer(
      prevState,
      { type: HOME_POST_ARTICLE_DISMISS_ERROR }
    );
    expect(state).not.toBe(prevState); // should be immutable
    expect(state.postArticleError).toBe(null);
  });
});

