import configureMockStore from 'redux-mock-store';
import thunk from 'redux-thunk';
import nock from 'nock';

import {
  HOME_EDIT_ARTICLE_BEGIN,
  HOME_EDIT_ARTICLE_SUCCESS,
  HOME_EDIT_ARTICLE_FAILURE,
  HOME_EDIT_ARTICLE_DISMISS_ERROR,
} from '../../../../src/features/home/redux/constants';

import {
  editArticle,
  dismissEditArticleError,
  reducer,
} from '../../../../src/features/home/redux/editArticle';

const middlewares = [thunk];
const mockStore = configureMockStore(middlewares);

describe('home/redux/editArticle', () => {
  afterEach(() => {
    nock.cleanAll();
  });

  it('dispatches success action when editArticle succeeds', () => {
    const store = mockStore({});

    return store.dispatch(editArticle())
      .then(() => {
        const actions = store.getActions();
        expect(actions[0]).toHaveProperty('type', HOME_EDIT_ARTICLE_BEGIN);
        expect(actions[1]).toHaveProperty('type', HOME_EDIT_ARTICLE_SUCCESS);
      });
  });

  it('dispatches failure action when editArticle fails', () => {
    const store = mockStore({});

    return store.dispatch(editArticle({ error: true }))
      .catch(() => {
        const actions = store.getActions();
        expect(actions[0]).toHaveProperty('type', HOME_EDIT_ARTICLE_BEGIN);
        expect(actions[1]).toHaveProperty('type', HOME_EDIT_ARTICLE_FAILURE);
        expect(actions[1]).toHaveProperty('data.error', expect.anything());
      });
  });

  it('returns correct action by dismissEditArticleError', () => {
    const expectedAction = {
      type: HOME_EDIT_ARTICLE_DISMISS_ERROR,
    };
    expect(dismissEditArticleError()).toEqual(expectedAction);
  });

  it('handles action type HOME_EDIT_ARTICLE_BEGIN correctly', () => {
    const prevState = { editArticlePending: false };
    const state = reducer(
      prevState,
      { type: HOME_EDIT_ARTICLE_BEGIN }
    );
    expect(state).not.toBe(prevState); // should be immutable
    expect(state.editArticlePending).toBe(true);
  });

  it('handles action type HOME_EDIT_ARTICLE_SUCCESS correctly', () => {
    const prevState = { editArticlePending: true };
    const state = reducer(
      prevState,
      { type: HOME_EDIT_ARTICLE_SUCCESS, data: {} }
    );
    expect(state).not.toBe(prevState); // should be immutable
    expect(state.editArticlePending).toBe(false);
  });

  it('handles action type HOME_EDIT_ARTICLE_FAILURE correctly', () => {
    const prevState = { editArticlePending: true };
    const state = reducer(
      prevState,
      { type: HOME_EDIT_ARTICLE_FAILURE, data: { error: new Error('some error') } }
    );
    expect(state).not.toBe(prevState); // should be immutable
    expect(state.editArticlePending).toBe(false);
    expect(state.editArticleError).toEqual(expect.anything());
  });

  it('handles action type HOME_EDIT_ARTICLE_DISMISS_ERROR correctly', () => {
    const prevState = { editArticleError: new Error('some error') };
    const state = reducer(
      prevState,
      { type: HOME_EDIT_ARTICLE_DISMISS_ERROR }
    );
    expect(state).not.toBe(prevState); // should be immutable
    expect(state.editArticleError).toBe(null);
  });
});

