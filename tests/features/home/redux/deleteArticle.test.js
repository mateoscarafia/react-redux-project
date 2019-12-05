import configureMockStore from 'redux-mock-store';
import thunk from 'redux-thunk';
import nock from 'nock';

import {
  HOME_DELETE_ARTICLE_BEGIN,
  HOME_DELETE_ARTICLE_SUCCESS,
  HOME_DELETE_ARTICLE_FAILURE,
  HOME_DELETE_ARTICLE_DISMISS_ERROR,
} from '../../../../src/features/home/redux/constants';

import {
  deleteArticle,
  dismissDeleteArticleError,
  reducer,
} from '../../../../src/features/home/redux/deleteArticle';

const middlewares = [thunk];
const mockStore = configureMockStore(middlewares);

describe('home/redux/deleteArticle', () => {
  afterEach(() => {
    nock.cleanAll();
  });

  it('dispatches success action when deleteArticle succeeds', () => {
    const store = mockStore({});

    return store.dispatch(deleteArticle())
      .then(() => {
        const actions = store.getActions();
        expect(actions[0]).toHaveProperty('type', HOME_DELETE_ARTICLE_BEGIN);
        expect(actions[1]).toHaveProperty('type', HOME_DELETE_ARTICLE_SUCCESS);
      });
  });

  it('dispatches failure action when deleteArticle fails', () => {
    const store = mockStore({});

    return store.dispatch(deleteArticle({ error: true }))
      .catch(() => {
        const actions = store.getActions();
        expect(actions[0]).toHaveProperty('type', HOME_DELETE_ARTICLE_BEGIN);
        expect(actions[1]).toHaveProperty('type', HOME_DELETE_ARTICLE_FAILURE);
        expect(actions[1]).toHaveProperty('data.error', expect.anything());
      });
  });

  it('returns correct action by dismissDeleteArticleError', () => {
    const expectedAction = {
      type: HOME_DELETE_ARTICLE_DISMISS_ERROR,
    };
    expect(dismissDeleteArticleError()).toEqual(expectedAction);
  });

  it('handles action type HOME_DELETE_ARTICLE_BEGIN correctly', () => {
    const prevState = { deleteArticlePending: false };
    const state = reducer(
      prevState,
      { type: HOME_DELETE_ARTICLE_BEGIN }
    );
    expect(state).not.toBe(prevState); // should be immutable
    expect(state.deleteArticlePending).toBe(true);
  });

  it('handles action type HOME_DELETE_ARTICLE_SUCCESS correctly', () => {
    const prevState = { deleteArticlePending: true };
    const state = reducer(
      prevState,
      { type: HOME_DELETE_ARTICLE_SUCCESS, data: {} }
    );
    expect(state).not.toBe(prevState); // should be immutable
    expect(state.deleteArticlePending).toBe(false);
  });

  it('handles action type HOME_DELETE_ARTICLE_FAILURE correctly', () => {
    const prevState = { deleteArticlePending: true };
    const state = reducer(
      prevState,
      { type: HOME_DELETE_ARTICLE_FAILURE, data: { error: new Error('some error') } }
    );
    expect(state).not.toBe(prevState); // should be immutable
    expect(state.deleteArticlePending).toBe(false);
    expect(state.deleteArticleError).toEqual(expect.anything());
  });

  it('handles action type HOME_DELETE_ARTICLE_DISMISS_ERROR correctly', () => {
    const prevState = { deleteArticleError: new Error('some error') };
    const state = reducer(
      prevState,
      { type: HOME_DELETE_ARTICLE_DISMISS_ERROR }
    );
    expect(state).not.toBe(prevState); // should be immutable
    expect(state.deleteArticleError).toBe(null);
  });
});

